import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserService } from "./user-service/user.service";
import { UserProfileComponent } from "./user-profile/user-profile.component";

@NgModule({
	imports: [CommonModule],
	declarations: [UserProfileComponent],
	providers: [UserService]
})
export class CoreModule {}
