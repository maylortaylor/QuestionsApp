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

	constructor(
		private afAuth: AngularFireAuth,
		private afdb: AngularFireDatabase,
		private logger: LoggingService,
		private toast: ToastService
	) {
		//this.checkLoginStatus();
		// this.setUser(this.afAuth.auth.currentUser);
	}
	checkLoginStatus(): void {
		// this.afAuth.auth.onAuthStateChanged(user => {
		// 	this.setUser(user);
		// });
	}
	setUser(user: any, additionalUserInfo?: any): void {
		if (!!user) {
			// User is signed in.
			this.user = new UserModel();
			this.user.uid = user.uid;
			this.user.email = user.email;
			this.user.emailVerified = user.emailVerified;
			this.user.displayName = user.displayName;
			this.user.refreshToken = user.refreshToken;

			this.user.styling.primaryColor = "#4a148c";
			this.user.styling.secondaryColor = "#009688";
			this.user.styling.accentColor = "#d500f9";

			if (additionalUserInfo) {
				this.user.photoUrl = additionalUserInfo.profile.picture;
				this.user.familyName = additionalUserInfo.profile.family_name;
				this.user.givenName = additionalUserInfo.profile.given_name;
				this.user.displayName = additionalUserInfo.profile.name;
			}
		} else {
			// No user is signed in.
			this.logger.log("not logged in");
		}
	}
	uploadUser(user: UserModel) {
		this.logger.log("UPLOADING USER", user);
		var userUpload = this.afdb.object("Users/" + user.uid);
		userUpload.set(user);
	}
	clearUser(): void {
		this.user = null;
	}
	getCurrentUser(): UserModel {
		var isLoggedIn = !!this.afAuth.auth.currentUser;
		if (!!isLoggedIn) {
			// this.setUser(this.afAuth.auth.currentUser);
			this.userIsLoggedIn = true;
			if (!this.user) {
				this.user = this.getUser(this.afAuth.auth.currentUser.uid);
			}
			// this.toast.success("User is Logged In");
			// this.logger.log("User:", this.user);
			return this.user;
		} else {
			return null;
		}
	}
	getUser(userId: string): any {
		this.afdb.object(`/Users/${userId}`).subscribe(user => {
			return user;
		});
	}
	getUsersListFromDb(listName: string, user: UserModel = null) {
		if (!user) {
			user = this.getCurrentUser();
		}
		var dbLocation = "Users/" + user.uid + "/" + listName;

		var response = this.afdb.list(dbLocation);
		return response;
	}
}
