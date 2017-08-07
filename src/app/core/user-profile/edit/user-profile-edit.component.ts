import { Component, OnInit, Input } from "@angular/core";

import { UserProfileComponent } from "../user-profile.component";

import { UserModel } from "../../../core/user-service/user.model";

import { UserService } from "../../../core/user-service/user.service";
import { LoggingService } from "../../../shared/logging/logging.service";
import { ToastService } from "../../../shared/toasts/toast.service";

import * as Materialize from "angular2-materialize";

@Component({
	selector: "user-profile-edit",
	templateUrl: "./user-profile-edit.component.html",
	styleUrls: ["./user-profile-edit.component.less"]
})
export class UserProfileEditComponent implements OnInit {
	user: UserModel;
	navbarColor: string;
	constructor(private userService: UserService, private logger: LoggingService, private toast: ToastService) {}

	ngOnInit() {
		this.user = this.userService.getCurrentUser();
		this.logger.log("Parent", this.user);
	}
}
