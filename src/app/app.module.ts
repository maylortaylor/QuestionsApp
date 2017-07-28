import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { AppRouting } from "./app.routes";

import { FormsModule } from "@angular/forms";
import { CoreModule } from "./core/core-module.module";
import { SharedModule } from "./shared/shared-module.module";
import { ComponentsModule } from "./components/components-module.module";
import { AuthModule } from "./shared/auth/auth.module";

import { AppComponent } from "./app.component";
import { NavigationComponent } from "./navigation/navigation.component";

export const firebaseConfig = {
	apiKey: "AIzaSyCs8DfHQqmXIhyHbwRVPEDIL75brdoDgbk",
	authDomain: "no-right-answer.firebaseapp.com",
	databaseURL: "https://no-right-answer.firebaseio.com",
	projectId: "no-right-answer",
	storageBucket: "",
	messagingSenderId: "808618544774"
};

@NgModule({
	declarations: [AppComponent, NavigationComponent],
	imports: [
		BrowserModule,
		FormsModule,
		AppRouting,

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
