import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {exhaustMap, take} from "rxjs/operators";
import {User} from "../auth/user.model";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            take(1),
            exhaustMap((response: User) => {
                if (!response) {
                    return next.handle(req)
                } else {
                    const modifiedReq = req.clone({params: new HttpParams().set('auth', response.token)})
                    return next.handle(modifiedReq);
                }
            })
        )
    }

}
