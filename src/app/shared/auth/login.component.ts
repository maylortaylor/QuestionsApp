import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../../core/user-service/user.service";
import { AuthService } from "../../shared/auth/auth.service";
import { LoggingService } from "../../shared/logging/logging.service";
import { LoginModel } from "./models/login.model";

@Component({
	selector: "login-component",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.less"],
	encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {
	model = new LoginModel();
	submitted: boolean = false;
	constructor(private router: Router, private userService: UserService, private authService: AuthService, private logger: LoggingService) {}

	ngOnInit() {
		if (!!this.authService.isAuthenticated()) {
			this.router.navigate(["/"]);
		}
	}
	signInWithEmailAndPassword() {
		this.submitted = true;
		this.logger.log("Login Model", this.model);
		this.authService.login(this.model.email, this.model.password);
		this.router.navigate(["/"]);
	}
	onSubmit(loginForm) {
		this.logger.log(loginForm);
	}
	signInGoogle() {
		this.authService.signInGoogle();
		this.router.navigate(["/"]);
	}
	signInFacebook() {
		this.authService.signInFacebook();
		this.router.navigate(["/"]);
	}
	signInTwitter() {
		this.authService.signInTwitter();
		this.router.navigate(["/"]);
	}
	signInAnonymously() {
		this.authService.signInAnonymously();
		this.router.navigate(["/"]);
	}
	signOut() {
		this.authService.logout();
		this.router.navigate(["/"]);
	}
	isAuthenticated(): boolean {
		return this.authService.isAuthenticated();
	}
}
