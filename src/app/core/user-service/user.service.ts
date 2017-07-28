import { Injectable } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { UserModel } from "./user.model";

@Injectable()
export class UserService {
	user: UserModel = new UserModel();

	constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
		//this.checkLoginStatus();
	}
	checkLoginStatus() {
		this.afAuth.auth.onAuthStateChanged(user => {
			this.setUser(user);
		});
	}
	setUser(user: any) {
		if (!!user) {
			// User is signed in.
			this.user.uid = user.uid;
			this.user.email = user.email;
			this.user.emailVerified = user.emailVerified;
			this.user.displayName = user.displayName;
			this.user.photoUrl = user.photoUrl;
			this.user.refreshToken = user.refreshToken;

			console.log("LOGGED IN USER", this.user);
		} else {
			// No user is signed in.
			console.log("not logged in");
		}
	}
	clearUser() {
		this.user = new UserModel();
	}
	isAuthenticated() {
		return !!this.afAuth.auth.currentUser.uid ? true : false;
	}
	signInAnonymously() {
		this.afAuth.auth.signInAnonymously();
	}

	signOut() {
		this.afAuth.auth.signOut();
	}
	getCurrentUser() {
		if (!!this.user.uid) {
			// delete this.user.uid;
			return this.user;
		} else {
			return null;
		}
	}
}
