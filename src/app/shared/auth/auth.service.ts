import { Injectable } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

import { UserModel } from "../../core/user-service/user.model";

import { UserService } from "../../core/user-service/user.service";
import { LoggingService } from "../logging/logging.service";
import { ToastService } from "../toasts/toast.service";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";

import * as firebase from "firebase/app";

@Injectable()
export class AuthService {
	isLoggedIn = false;
	constructor(
		private afAuth: AngularFireAuth,
		private afDb: AngularFireDatabase,
		private userService: UserService,
		private logger: LoggingService,
		private toast: ToastService
	) {}

	// store the URL so we can redirect after logging in
	redirectUrl: string;

	public isAuthenticated(): boolean {
		this.isLoggedIn = !!this.afAuth.auth.currentUser ? true : false;
		if (!!this.isLoggedIn) {
			// this.logger.log("is logged in", this.isLoggedIn);
			this.userService.getCurrentUser();
		}
		return this.isLoggedIn;
	}
	public getCurrentUser(): UserModel {
		return this.userService.getCurrentUser();
	}
	public signInGoogle(): void {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
		this.afAuth.auth
			.signInWithPopup(provider)
			.then((result: any) => {
				this.logger.log("WON Google signIn popup", result);
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				var additionalInfo = result.additionalUserInfo;
				this.userService.setUser(user, additionalInfo);
				this.userService.uploadUser(this.userService.user);
				this.toast.success("Logged in successfully with Google!");
			})
			.catch((error: any) => {
				this.logger.log("LOST Google signIn popup", error);
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				this.toast.fail("Whoops! Log in failed!");
			});
	}
	public signInFacebook(): void {
		this.afAuth.auth
			.signInWithPopup(new firebase.auth.FacebookAuthProvider())
			.then((result: any) => {
				this.logger.log("WON Facebook signIn popup", result);
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				this.userService.setUser(user);
				this.toast.success("Logged in successfully with Facebook!");
			})
			.catch((error: any) => {
				console.log("LOST Facebook signIn popup", error);
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				this.toast.fail("Whoops! Log in failed!");
			});
	}
	public signInTwitter(): void {
		this.afAuth.auth
			.signInWithPopup(new firebase.auth.TwitterAuthProvider())
			.then((result: any) => {
				this.logger.log("WON Twitter signIn popup", result);
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				this.userService.setUser(user);
				this.toast.success("Logged in successfully with Twitter!");
			})
			.catch((error: any) => {
				console.log("LOST Twitter signIn popup", error);
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				this.toast.fail("Whoops! Log in failed!");
			});
	}
	public signInAnonymously(): void {
		this.afAuth.auth
			.signInAnonymously()
			.then(value => {
				this.isLoggedIn = true;
				this.logger.log("WON Sign In Anonymously", value);
				this.toast.success("Logged in successfully with anonymous!");
			})
			.catch(err => {
				this.logger.log("LOST Sign In Anonymously:", err);
				this.toast.fail("Whoops! Log in failed!");
			});
	}
	public logout(): void {
		this.afAuth.auth
			.signOut()
			.then(value => {
				this.isLoggedIn = false;
				this.userService.clearUser();
				this.logger.log("WON LogOut", value);
				this.toast.success("You are now logged out!");
			})
			.catch(err => {
				this.logger.log("LOST LogOut:", err);
				this.toast.fail("Whoops! Log out failed!");
			});
	}
	public login(email: string, password: string): void {
		this.afAuth.auth
			.signInWithEmailAndPassword(email, password)
			.then(value => {
				this.isLoggedIn = true;
				this.logger.log("WON Login", value);
				this.toast.success("Log in successful!");
			})
			.catch(err => {
				this.logger.log("LOST Login:", err);
				this.toast.fail("Whoops! Log in failed with email/password!");
			});
	}
	public signup(email: string, password: string): void {
		this.afAuth.auth
			.createUserWithEmailAndPassword(email, password)
			.then(value => {
				this.isLoggedIn = true;
				this.logger.log("WON SignUp", value);
				this.toast.fail("Sign in succsessful!");
			})
			.catch(err => {
				this.logger.log("LOST SignUp:", err);
				this.toast.fail("Whoops! Sign in failed!");
			});
	}
}
