import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/auth/auth-guard.service";

import { AppComponent } from "./app.component";
import { SubmitQuestionComponent } from "./components/submitQuestion/submitQuestion.component";
import { SubmissionListComponent } from "./components/submissionList/submissionList.component";
import { SavedQuestionListComponent } from "./components/savedQuestionList/savedQuestionList.component";
import { UserProfileComponent } from "./core/user-profile/user-profile.component";
export const router: Routes = [
	{ path: "submissions", component: SubmissionListComponent },
	{ path: "submit", component: SubmitQuestionComponent },
	{ path: "questions", component: SavedQuestionListComponent }
	// { path: "profile", component: UserProfileComponent }
	// { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },
	// { path: "channel/:channelId", component: ChannelComponent },
	// { path: "signup", component: SignupComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(router);
