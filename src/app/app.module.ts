import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { AppRouting } from "./app.routes";
import { ErrorHandlerModule } from "./shared/errorHandler/errorHandler.module";

import { CoreModule } from "./core/core-module.module";
import { SharedModule } from "./shared/shared-module.module";
import { ComponentsModule } from "./components/components-module.module";
import { AuthModule } from "./shared/auth/auth.module";
import { Ng4DropdownModule } from "ng4-material-dropdown";

import { AppComponent } from "./app.component";
import { NavigationComponent } from "./navigation/navigation.component";

import { SearchFilterPipe } from "./shared/filters/search-filter.pipe";
import { FilterModule } from "./shared/filters/filter.module";

var firebaseConfig = {
	apiKey: "AIzaSyCs8DfHQqmXIhyHbwRVPEDIL75brdoDgbk",
	authDomain: "no-right-answer.firebaseapp.com",
	databaseURL: "https://no-right-answer.firebaseio.com",
	projectId: "no-right-answer",
	storageBucket: "no-right-answer.appspot.com",
	messagingSenderId: "808618544774"
};
@NgModule({
	declarations: [AppComponent, NavigationComponent],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRouting,
		HttpModule,
		// ErrorHandlerModule,

		// FilterModule.forRoot(),
		AuthModule,
		CoreModule,
		SharedModule,
		ComponentsModule,

		//  Angular Firebase
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireDatabaseModule,
		AngularFireAuthModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
