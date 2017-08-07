import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserModel } from "../../core/user-service/user.model";

import { UserService } from "../../core/user-service/user.service";
import { LoggingService } from "../../shared/logging/logging.service";
import { ToastService } from "../../shared/toasts/toast.service";
import { AngularFireDBService } from "../../shared/angular-fire/angular-fire-db.service";

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
		private toast: ToastService
	) {
		if (!this.userService.userIsLoggedIn) {
			this.router.navigate(["/"]);
		}
	}

	ngOnInit() {
		// this.userService.user = this.userService.getCurrentUser();
		this.user = this.userService.user;
		this.logger.log("User Page UserModel: ", this.userService.user);
	}
}
