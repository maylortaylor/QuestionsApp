import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../shared/auth/auth.service";
import { UserService } from "../core/user-service/user.service";
import { UserModel } from "../core/user-service/user.model";
import { SearchService } from "../shared/filters/search.service";
import { LoggingService } from "../shared/logging/logging.service";
@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	styleUrls: ["./navigation.component.less"],
	changeDetection: ChangeDetectionStrategy.Default
})
export class NavigationComponent implements OnInit {
	user: UserModel;
	searchFilter: string;

	title: string = "No Right Answer";

	constructor(
		public authService: AuthService,
		public userService: UserService,
		private ss: SearchService,
		private cdr: ChangeDetectorRef,
		private logger: LoggingService
	) {}

	ngOnInit() {}
	onChange(newValue: any) {
		this.ss.addSearch(newValue);
	}
	// ngAfterViewChecked() {
	// 	this.user = this.userService.getCurrentUser();
	// }

	signInAnonymously() {
		this.authService.signInAnonymously();
		this.logger.log("SIGNING IN ANONYMOUSLY");
	}
	logOut() {
		this.authService.logout();
		this.logger.log("LOGGING OUT");
	}
}
