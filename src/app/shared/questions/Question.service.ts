import { Injectable } from "@angular/core";

import { UserService } from "../../core/user-service/user.service";
import { AngularFireDBService } from "../../shared/angular-fire/angular-fire-db.service";
import { ToastService } from "../../shared/toasts/toast.service";
import { LoggingService } from "../../shared/logging/logging.service";

import * as _ from "lodash";
// import * as querybase from "querybase";

@Injectable()
export class QuestionService {
	constructor(
		private userService: UserService,
		private afdb: AngularFireDBService,
		private toast: ToastService,
		private logger: LoggingService
	) {}

	public getSavedQuestions() {
		// return this.afdb.getAllFromArea("SavedQuestions");
		var dbRef = this.afdb.getQuestions(20);
		return new Promise(function(resolve, reject) {
			dbRef.once("value", dataSnapshot => {
				var data = dataSnapshot.val();
				if (dataSnapshot.exists()) {
					var array = $.map(data, function(value, index) {
						return [value];
					});
					return resolve(array);
				} else {
					var array = $.map(data, function(value, index) {
						return [value];
					});
					return reject(array);
				}
			});
		});
	}
	public getSubmissions() {
		// return this.afdb.getAllFromArea("Submissions");

		var dbRef = this.afdb.getSubmissions(20);
		return new Promise(function(resolve, reject) {
			dbRef.once("value", dataSnapshot => {
				var data = dataSnapshot.val();
				if (dataSnapshot.exists()) {
					var array = $.map(data, function(value, index) {
						return [value];
					});
					// filter out submissions with more than 20 upVotes
					var filteredSubmissoins = _.remove(array, function(n: any) {
						return n.upVotes <= 20
					})
					return resolve(filteredSubmissoins);
				} else {
					var array = $.map(data, function(value, index) {
						return [value];
					});
					return reject(array);
				}
			});
		});
	}
	public markUserFavorite(questions: any) {
		var user = this.userService.getCurrentUser();
		if (!user) {
			return Error("no user available");
		}

		var wonGetFavorites = response => {
			for (var i = 0; i < questions.length; i++) {
				var question = questions[i];
				var favoriteIndex = _.findIndex(questions, { $key: question.id });
				if (favoriteIndex > -1) {
					questions[favoriteIndex].favorited = true;
				}
			}
		};
		this.userService.getUsersListFromDb("Favorites", user).subscribe(wonGetFavorites);
	}
}
