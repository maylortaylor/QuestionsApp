import { Injectable } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

import { AngularFireDBService } from "../../../shared/angular-fire/angular-fire-db.service";

import { LoggingService } from "../../../shared/logging/logging.service";
import { ToastService } from "../../../shared/toasts/toast.service";

@Injectable()
export class UserOverviewListService {
	constructor(
		private afAuth: AngularFireAuth,
		private afdb: AngularFireDBService,
		private logger: LoggingService,
		private toast: ToastService
	) {}

	public getFavorites() {
		return this.afdb.getUserList("Favorites");
	}
	public getSubmittedQuestions() {
		return this.afdb.getUserList("SubmittedQuestions");
	}
	public getUpvotedQuestions() {
		return this.afdb.getUserList("UpvotedQuestions");
	}
}
