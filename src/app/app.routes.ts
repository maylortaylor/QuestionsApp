import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { AuthGuard } from "./shared/auth/auth-guard.service";
export const router: Routes = [
	{ path: "", component: AppComponent }
	// { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },
	// { path: "music", component: PlatformStreamsComponent },
	// { path: "channel/:channelId", component: ChannelComponent },
	// { path: "signup", component: SignupComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(router);
