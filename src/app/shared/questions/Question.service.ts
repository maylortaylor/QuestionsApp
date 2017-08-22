import { Injectable } from "@angular/core";

import { UserService } from "../../core/user-service/user.service";
import { AngularFireDBService } from "../../shared/angular-fire/angular-fire-db.service";
import { ToastService } from "../../shared/toasts/toast.service";
import { LoggingService } from "../../shared/logging/logging.service";

import * as _ from "lodash";

@Injectable()
export class QuestionService {
	constructor(
		private userService: UserService,
		private afdb: AngularFireDBService,
		private toast: ToastService,
		private logger: LoggingService
	) {}

	public getQuestions() {
		return this.afdb.getAllFromArea("Submissions");
	}
	public markUserFavorite(questions: any) {
		var user = this.userService.getCurrentUser();
		if (!user) {
			return Error("no user available");
		}

		var wonGetFavorites = response => {
			for (var i = 0; i < questions.length; i++) {
				var question = questions[i];
				var favoriteIndex = _.findIndex(response, { $key: question.id });
				if (favoriteIndex > -1) {
					questions[favoriteIndex].favorited = true;
				}
			}
		};
		this.userService.getUsersListFromDb("Favorites", user).subscribe(wonGetFavorites);
	}
}
