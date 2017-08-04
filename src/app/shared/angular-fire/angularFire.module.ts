import { NgModule, ErrorHandler } from "@angular/core";
import { HttpModule } from "@angular/http";

import { AngularFireDBService } from "./angular-fire-db.service";
import { AngularFireDbSeeder } from "./angular-fire-seed/angular-fire-seed.service";

@NgModule({
	declarations: [],
	exports: [],
	imports: [],
	providers: [AngularFireDBService, AngularFireDbSeeder]
})
export class AngularFireModule {}
