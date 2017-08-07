import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/auth/auth-guard.service";

import { AppComponent } from "./app.component";
import { SubmitQuestionComponent } from "./components/submitQuestion/submitQuestion.component";
import { QuestionListComponent } from "./components/questionList/questionList.component";
import { UserProfileComponent } from "./core/user-profile/user-profile.component";
export const router: Routes = [
	{ path: "", component: QuestionListComponent },
	{ path: "addquestion", component: SubmitQuestionComponent }
	// { path: "profile", component: UserProfileComponent }
	// { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },
	// { path: "channel/:channelId", component: ChannelComponent },
	// { path: "signup", component: SignupComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(router);
