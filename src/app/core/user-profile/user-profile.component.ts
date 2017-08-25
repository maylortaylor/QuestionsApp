import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserModel } from "../../core/user-service/user.model";

import { UserService } from "../../core/user-service/user.service";
import { LoggingService } from "../../shared/logging/logging.service";
import { ToastService } from "../../shared/toasts/toast.service";
import { AngularFireDBService } from "../../shared/angular-fire/angular-fire-db.service";
import { UserOverviewListService } from "./services/UserOverviewList.service";
@Component({
	selector: "app-user-profile",
	templateUrl: "./user-profile.component.html",
	styleUrls: ["./user-profile.component.less"]
})
export class UserProfileComponent implements OnInit {
	user: UserModel;

	constructor(
		private router: Router,
		private afdb: AngularFireDBService,
		public userService: UserService,
		private logger: LoggingService,
		private toast: ToastService,
		private overviewService: UserOverviewListService
	) {
		if (!this.userService.userIsLoggedIn) {
			this.router.navigate(["/submissions"]);
		}
	}

	ngOnInit() {
		// this.user = this.userService.user;
		this.logger.log("User Page UserModel: ", this.userService.user);
		this.getUserFavorites();
		this.getUserSubmittedQuestions();
		this.getUserUpvotedQuestions();
	}

	public getUserFavorites() {
		var wonGetUserFavorites = response => {
			this.logger.log("WON GetUserFavorites", response);
		};
		var lostGetUserFavorites = err => {
			this.logger.log("LOST GetUserFavorites", err);
		};
		this.overviewService.getFavorites().subscribe(wonGetUserFavorites, lostGetUserFavorites);
	}
	public getUserSubmittedQuestions() {
		var wonGetUserSubmittedQuestions = response => {
			this.logger.log("WON GetUserSubmittedQuestions", response);
		};
		var lostGetUserSubmittedQuestions = err => {
			this.logger.log("LOST GetUserSubmittedQuestions", err);
		};
		this.overviewService.getSubmittedQuestions().subscribe(wonGetUserSubmittedQuestions, lostGetUserSubmittedQuestions);
	}
	public getUserUpvotedQuestions() {
		var wonGetUserUpvotedQuestions = response => {
			this.logger.log("WON GetUserUpvotedQuestions", response);
		};
		var lostGetUserUpvotedQuestions = err => {
			this.logger.log("LOST GetUserUpvotedQuestions", err);
		};
		this.overviewService.getUpvotedQuestions().subscribe(wonGetUserUpvotedQuestions, lostGetUserUpvotedQuestions);
	}
}
