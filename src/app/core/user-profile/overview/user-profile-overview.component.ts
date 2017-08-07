import { Component, OnInit, Input } from "@angular/core";

import { UserProfileComponent } from "../user-profile.component";

import { UserModel } from "../../../core/user-service/user.model";

import { UserService } from "../../../core/user-service/user.service";
import { LoggingService } from "../../../shared/logging/logging.service";
import { ToastService } from "../../../shared/toasts/toast.service";

@Component({
	selector: "user-profile-overview",
	templateUrl: "user-profile-overview.component.html"
})
export class UserProfileOverviewComponent implements OnInit {
	user: UserModel;
	constructor(private userService: UserService, private logger: LoggingService, private toast: ToastService) {
		this.user = this.userService.getCurrentUser();
	}

	ngOnInit() {
		this.logger.log("Parent", this.user);
	}
}
