import { Injectable } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { UserModel } from "./user.model";

import { LoggingService } from "../../shared/logging/logging.service";
import { ToastService } from "../../shared/toasts/toast.service";
// import { AuthService } from "../../shared/auth/auth.service";

@Injectable()
export class UserService {
	user: UserModel = null;
	userIsLoggedIn: boolean = false;

	constructor(private afAuth: AngularFireAuth, private af: AngularFireDatabase, private logger: LoggingService, private toast: ToastService) {
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
			this.user = new UserModel();
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
		this.user = null;
	}
	getCurrentUser(): UserModel {
		var isLoggedIn = !!this.afAuth.auth.currentUser;
		if (!!isLoggedIn) {
			this.setUser(this.afAuth.auth.currentUser);
			this.userIsLoggedIn = true;
			// this.toast.success("User is Logged In");
			this.logger.log("User:", this.user);
			return this.user;
		} else {
			return null;
		}
	}
}
