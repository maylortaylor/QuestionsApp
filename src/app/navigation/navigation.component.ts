import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../shared/auth/auth.service";
import { UserService } from "../core/user-service/user.service";
import { UserModel } from "../core/user-service/user.model";
import { SearchService } from "../shared/filters/search.service";

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

	constructor(public authService: AuthService, private userService: UserService, private ss: SearchService, private cdr: ChangeDetectorRef) {}

	ngOnInit() {}
	onChange(newValue: any) {
		this.ss.addSearch(newValue);
	}
	ngAfterViewChecked() {
		this.user = this.userService.getCurrentUser();
		if (!!this.user) console.log("user object on navbar", this.user);
	}

	signInAnonymously() {
		console.log("SIGNING IN ANONYMOUSLY");
		this.authService.signInAnonymously();
	}
	logOut() {
		console.log("LOGGING OUT");
		this.authService.logout();
	}
}
