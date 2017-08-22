import { Injectable } from "@angular/core";

import { Question } from "../../models/question.model";

import { UserService } from "../../core/user-service/user.service";
import { AngularFireDBService } from "../../shared/angular-fire/angular-fire-db.service";
import { ToastService } from "../../shared/toasts/toast.service";
import { LoggingService } from "../../shared/logging/logging.service";

@Injectable()
export class QuestionActionService {
	constructor(
		private userService: UserService,
		private afdb: AngularFireDBService,
		private toast: ToastService,
		private logger: LoggingService
	) {}

	public favorite(question: Question) {
		return this.afdb.favoriteQuestion(question);
	}
	public unfavorite(question: Question) {
		return this.afdb.unfavoriteQuestion(question);
	}
}
