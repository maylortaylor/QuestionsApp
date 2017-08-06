import { Injectable } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { UserModel } from "./user.model";

import { LoggingService } from "../../shared/logging/logging.service";
@Injectable()
export class UserService {
	user: UserModel = new UserModel();

	constructor(private afAuth: AngularFireAuth, private af: AngularFireDatabase, private logger: LoggingService) {
		//this.checkLoginStatus();
		this.setUser(this.afAuth.auth.currentUser);
	}
	checkLoginStatus(): void {
		this.afAuth.auth.onAuthStateChanged(user => {
			this.setUser(user);
		});
	}
	setUser(user: any): void {
		if (!!user) {
			// User is signed in.
			this.user.uid = user.uid;
			this.user.email = user.email;
			this.user.emailVerified = user.emailVerified;
			this.user.displayName = user.displayName;
			this.user.photoUrl = user.photoUrl;
			this.user.refreshToken = user.refreshToken;

			this.logger.log("LOGGED IN USER", this.user);
		} else {
			// No user is signed in.
			this.logger.log("not logged in");
		}
	}
	clearUser(): void {
		this.user = new UserModel();
	}
	isAuthenticated(): boolean {
		return !!this.afAuth.auth.currentUser ? true : false;
	}
	signInAnonymously(): void {
		this.afAuth.auth.signInAnonymously();
	}

	signOut(): void {
		this.afAuth.auth.signOut();
	}
	getCurrentUser(): UserModel {
		if (this.isAuthenticated()) {
			this.setUser(this.afAuth.auth.currentUser);
			return this.user;
		} else {
			return null;
		}
	}
}
