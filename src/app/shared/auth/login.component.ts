import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserService } from "../../core/user-service/user.service";
import { AuthService } from "../../shared/auth/auth.service";
import { LoginModel } from "./models/login.model";

@Component({
	selector: "login-component",
	templateUrl: "./login.component.html",
	// styleUrls: ["./login.component.less"],
	encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {
	model = new LoginModel();
	submitted: boolean = false;
	constructor(private userService: UserService, private authService: AuthService) {}

	ngOnInit() {}
	signInWithEmailAndPassword() {
		this.submitted = true;
		console.log("Login Model", this.model);
		this.authService.login(this.model.email, this.model.password);
	}
	onSubmit(loginForm) {
		console.log(loginForm);
	}
	signInGoogle() {
		this.authService.signInGoogle();
	}
	signInAnonymously() {
		this.authService.signInAnonymously();
	}
	signOut() {
		this.authService.logout();
	}
	isAuthenticated(): boolean {
		return this.authService.isAuthenticated();
	}
}
