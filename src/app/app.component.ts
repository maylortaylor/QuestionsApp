import { Component } from "@angular/core";
import { AngularFireDbSeeder } from "./shared/angular-fire/angular-fire-seed/angular-fire-seed.service";
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.less"]
})
export class AppComponent {
	title = "app";
	seedDatabase: boolean = false;
	constructor(private dbSeeder: AngularFireDbSeeder) {
		this.initializeApp();
	}

	initializeApp() {
		if (this.seedDatabase) {
			this.seedFirebaseDb();
		}
	}

	seedFirebaseDb() {
		this.dbSeeder.uploadCategories();
		this.dbSeeder.uploadSubCategories();
		this.dbSeeder.uploadTags();
	}
}
