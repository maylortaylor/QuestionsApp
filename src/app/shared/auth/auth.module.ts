import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AuthRouting } from "./auth.routes";
import { SignupComponent } from "./signup.component";
import { LoginComponent } from "./login.component";

@NgModule({
	imports: [AuthRouting, FormsModule],
	declarations: [LoginComponent, SignupComponent]
})
export class AuthModule {}
