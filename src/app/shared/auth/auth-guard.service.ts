import "rxjs/add/operator/first";
import "rxjs/add/operator/map";

import { Observable } from "rxjs/Observable";

import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private af: AngularFireAuth, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;

		return this.checkLogin(url);

		// return this.af.authState
		//   .map(auth => {
		//     if (auth == null) {
		//       this.router.navigate(["/login"]);
		//       return false;
		//     } else {
		//       return true;
		//     }
		//   })
		//   .first();
	}

	checkLogin(url: string): boolean {
		if (this.authService.isLoggedIn) {
			return true;
		}
		console.log("not logged in, redirecting");

		// Store the attempted URL for redirecting
		this.authService.redirectUrl = url;

		// Navigate to the login page with extras
		this.router.navigate(["/login"]);
		return false;
	}
}
