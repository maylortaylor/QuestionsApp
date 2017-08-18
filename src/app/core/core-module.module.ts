import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { UserProfileRouting } from "./user-profile/user-profile.routes";
import { UserService } from "./user-service/user.service";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserProfileEditComponent } from "./user-profile/edit/user-profile-edit.component";
import { UserProfileOverviewComponent } from "./user-profile/overview/user-profile-overview.component";
import { UserOverviewListService } from "./user-profile/services/UserOverviewList.service";

@NgModule({
	imports: [CommonModule, UserProfileRouting, FormsModule],
	declarations: [UserProfileComponent, UserProfileOverviewComponent, UserProfileEditComponent],
	providers: [UserService, UserOverviewListService]
})
export class CoreModule {}
