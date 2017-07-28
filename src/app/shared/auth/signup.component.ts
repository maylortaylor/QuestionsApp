import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SignupModel } from "./models/signup.model";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
	templateUrl: "./signup.component.html"
})
export class SignupComponent {
	model = new SignupModel();
	submitted: boolean = false;
	constructor(private af: AngularFireAuth, private router: Router) {}

	onSubmit(formData) {
		this.submitted = true;
		if (formData.valid) {
			console.log(formData.value);
			this.af.auth
				.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
				.then(success => {
					this.submitted = false;
					console.log(success);
					this.router.navigate(["/login"]);
				})
				.catch(err => {
					this.submitted = false;
					console.log(err);
					this.router.navigate(["/login"]);
				});
		}
	}
}
