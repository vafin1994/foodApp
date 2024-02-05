import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService, LoginResponseData} from "./auth.service";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {AlertPlaceholderDirective} from "../shared/alert-placeholder.directive";
import {hostReportError} from "rxjs/internal-compatibility";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  @ViewChild(AlertPlaceholderDirective, {static: false}) alertPlaceholder: AlertPlaceholderDirective;

  constructor(private AuthService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.AuthService.sendCredentials(form.value.email, form.value.password, this.isLoginMode ? 'login' : 'signup').subscribe(
      (response: AuthResponseData | LoginResponseData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      }, (error) => {
        this.isLoading = false;
        this.showErrorAlert(this.AuthService.getErrorMessage(error));
      })

  }

  showErrorAlert(error: string) {
    const hostViewContainerRef: ViewContainerRef = this.alertPlaceholder.viewContainerRef;
    hostViewContainerRef.clear();
    const compRef: ComponentRef<AlertComponent> = hostViewContainerRef.createComponent(AlertComponent);
    compRef.instance.message = error;
    compRef.instance.close.pipe(take(1)).subscribe(
      () => {
        hostViewContainerRef.clear();
      }
    )
  }

  onHandleError() {
    this.AuthService.error = null;
  }

  get error(): string {
    return this.AuthService.error;
  }

}
