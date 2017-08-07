import { Component, OnInit } from "@angular/core";

import { UserProfileComponent } from "../user-profile.component";

import { UserService } from "../../../core/user-service/user.service";

@Component({
	selector: "user-profile-overview",
	templateUrl: "user-profile-overview.component.html"
})
export class UserProfileOverviewComponent implements OnInit {
	parent: UserProfileComponent;
	constructor(private userService: UserService) {}

	ngOnInit() {}
}
