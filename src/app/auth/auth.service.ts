import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Observable, Subject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

export interface LoginResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered: boolean
}

enum errorResponseMessage {
  TOO_MANY_ATTEMPTS_TRY_LATER = 'We have blocked all requests from this device due to unusual activity. Try again later',
  EMAIL_EXISTS = 'The email address is already in use by another account',
  OPERATION_NOT_ALLOWED = 'Password sign-in is disabled for this project',
  INVALID_EMAIL = 'This email address does not look right',
  EMAIL_NOT_FOUND = 'There is no user record corresponding to this identifier. The user may have been deleted',
  INVALID_PASSWORD = 'The password is invalid or the user does not have a password',
  USER_DISABLED = 'The user account has been disabled by an administrator',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  logoutTimer: number;

  dbApiKey: string = 'AIzaSyB64ggiYKZyrCIMWaL_TF6ZgnVkUsBS1MA';
  signUpUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.dbApiKey;
  loginUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.dbApiKey;
  error: string = null;

  constructor(private http: HttpClient, private router: Router) {
  }

  sendCredentials(email: string, password: string, type: 'login' | 'signup'): Observable<AuthResponseData | LoginResponseData> {
    const url = type === 'login' ? this.loginUrl : this.signUpUrl;
    this.error = null;
    return this.http.post<AuthResponseData | LoginResponseData>(url, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        const errorMessage = errorResponse.error.error.message;
        this.error = this.getErrorMessage(errorMessage);
        return throwError(errorMessage);
      }),
      tap(response => {
        const expireDate: Date = new Date(new Date().getTime() + +response.expiresIn * 1000);
        const user: User = new User(response.email, response.localId, response.idToken, expireDate)
        this.user.next(user);
        this.autoLogout(+response.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
      })
    )
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      const loadedUser: User = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['auth']);
    localStorage.removeItem('userData');
    if(this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  getErrorMessage(error: string): string {
    switch (error) {
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return errorResponseMessage.TOO_MANY_ATTEMPTS_TRY_LATER;
      case 'EMAIL_EXISTS':
        return errorResponseMessage.EMAIL_EXISTS;
      case 'OPERATION_NOT_ALLOWED':
        return errorResponseMessage.OPERATION_NOT_ALLOWED;
      case 'INVALID_EMAIL':
        return errorResponseMessage.INVALID_EMAIL;
      case 'EMAIL_NOT_FOUND' :
        return errorResponseMessage.EMAIL_NOT_FOUND
      case 'INVALID_PASSWORD' :
        return errorResponseMessage.INVALID_PASSWORD
      case 'USER_DISABLED' :
        return errorResponseMessage.USER_DISABLED
      default:
        return 'An unknown error occurred';
    }
  }
}
