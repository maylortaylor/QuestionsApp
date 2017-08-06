import { Component } from "@angular/core";
import { AngularFireDbSeeder } from "./shared/angular-fire/angular-fire-seed/angular-fire-seed.service";

import { UserModel } from "./core/user-service/user.model";
import { UserService } from "./core/user-service/user.service";
import { AuthService } from "./shared/auth/auth.service";
import { AngularFireDBService } from "./shared/angular-fire/angular-fire-db.service";
import { LoggingService } from "./shared/logging/logging.service";
import { ToastService } from "./shared/toasts/toast.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.less"]
})
export class AppComponent {
	title = "app";
	seedDatabase: boolean = false;
	constructor(
		private dbSeeder: AngularFireDbSeeder,
		private user: UserService,
		private auth: AuthService,
		private afdb: AngularFireDBService,
		private logger: LoggingService,
		private toast: ToastService
	) {
		this.initializeApp();
	}
	ngAfterViewChecked() {
		this.user.getCurrentUser();
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
