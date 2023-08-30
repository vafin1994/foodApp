import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService, LoginResponseData} from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    isLoginMode: boolean = true;
    isLoading: boolean = false;

    constructor(private AuthService: AuthService) {
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
                console.log(response);
            }, (error) => {
                this.isLoading = false;
            })

    }

    get error(): string {
        return this.AuthService.error;
    }

}
