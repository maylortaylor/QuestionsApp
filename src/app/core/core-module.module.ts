import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserProfileRouting } from "./user-profile/user-profile.routes";
import { UserService } from "./user-service/user.service";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserProfileEditComponent } from "./user-profile/edit/user-profile-edit.component";
import { UserProfileOverviewComponent } from "./user-profile/overview/user-profile-overview.component";

@NgModule({
	imports: [CommonModule, UserProfileRouting],
	declarations: [UserProfileComponent, UserProfileOverviewComponent, UserProfileEditComponent],
	providers: [UserService]
})
export class CoreModule {}
