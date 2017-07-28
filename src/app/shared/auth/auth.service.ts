import { Injectable } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { UserService } from "../../core/user-service/user.service";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";

import * as firebase from "firebase/app";

@Injectable()
export class AuthService {
	isLoggedIn = false;
	constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase, private userService: UserService) {}

	// store the URL so we can redirect after logging in
	redirectUrl: string;

	//   login(): Observable<boolean> {
	//     return Observable.of(true).delay(1000).do(val => (this.isLoggedIn = true));
	//   }
	isAuthenticated(): boolean {
		this.isLoggedIn = !!this.afAuth.auth.currentUser ? true : false;
		return !!this.afAuth.auth.currentUser ? true : false;
	}
	getCurrentUser() {
		return this.userService.getCurrentUser();
	}
	signInGoogle() {
		this.afAuth.auth
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then((result: any) => {
				console.log("WON signIn popup", result);
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				this.userService.setUser(user);
			})
			.catch((error: any) => {
				console.log("LOST signIn popup", error);
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
			});
	}
	signInAnonymously() {
		this.afAuth.auth
			.signInAnonymously()
			.then(value => {
				this.isLoggedIn = true;
				console.log("WON Sign In Anonymously", value);
			})
			.catch(err => {
				console.log("LOST Sign In Anonymously:", err);
			});
	}
	logout() {
		this.afAuth.auth
			.signOut()
			.then(value => {
				this.isLoggedIn = false;
				this.userService.clearUser();
				console.log("WON LogOut", value);
			})
			.catch(err => {
				console.log("LOST LogOut:", err);
			});
	}
	login(email: string, password: string) {
		this.afAuth.auth
			.signInWithEmailAndPassword(email, password)
			.then(value => {
				this.isLoggedIn = true;
				console.log("WON Login", value);
			})
			.catch(err => {
				console.log("LOST Login:", err);
			});
	}
	signup(email: string, password: string) {
		this.afAuth.auth
			.createUserWithEmailAndPassword(email, password)
			.then(value => {
				this.isLoggedIn = true;
				console.log("WON SignUp", value);
			})
			.catch(err => {
				console.log("LOST SignUp:", err);
			});
	}
}
