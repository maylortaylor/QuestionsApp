import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { AuthGuard } from "./shared/auth/auth-guard.service";

import { UserProfileComponent } from "./user-profile.component";
import { UserProfileEditComponent } from "./edit/user-profile-edit.component";
import { UserProfileOverviewComponent } from "./overview/user-profile-overview.component";

// prettier-ignore
export const router: Routes = [
    { path: "profile", component: UserProfileComponent, children: [
        { path: "overview", component: UserProfileOverviewComponent },
        { path: "edit", component: UserProfileEditComponent }
    ]}
];

export const UserProfileRouting: ModuleWithProviders = RouterModule.forRoot(router);
