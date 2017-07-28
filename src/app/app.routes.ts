import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/auth/auth-guard.service";

import { AppComponent } from "./app.component";
import { SubmitQuestionComponent } from "./components/submit-question/submit-question.component";
import { QuestionListComponent } from "./components/question-list/question-list.component";

export const router: Routes = [
	{ path: "", component: QuestionListComponent },
	{ path: "addquestion", component: SubmitQuestionComponent }
	// { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },
	// { path: "channel/:channelId", component: ChannelComponent },
	// { path: "signup", component: SignupComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(router);
