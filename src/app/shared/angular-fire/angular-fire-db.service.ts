import { Injectable } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";

import { Action } from "../../models/enums/action.enum";
import { Question } from "../../models/question.model";
import { UserModel } from "../../core/user-service/user.model";
// import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../../core/user-service/user.service";
import { LoggingService } from "../logging/logging.service";

import * as moment from "moment";

@Injectable()
export class AngularFireDBService {
	constructor(
		private afdb: AngularFireDatabase,
		private authService: AuthService,
		private userService: UserService,
		private logger: LoggingService
	) {}

	public upload(dbArea: string, object: any, objectPrefix: string = null) {
		if (!dbArea) {
			throw Error("No area was provided!");
		}
		if (!object) {
			throw Error("No object was provided!");
		}

		var dbLocation = dbArea + "/";
		if (!!objectPrefix) {
			dbLocation = dbLocation + objectPrefix + "-";
		}
		dbLocation = dbLocation + object.id;

		const uploadResponse = this.afdb.object(dbLocation);
		if (this.authService.isAuthenticated()) {
			var currentUser = this.authService.getCurrentUser();
			if (!!currentUser) {
				object.createdByUserId = currentUser.uid;
			}
		}
		return uploadResponse.set(object);
	}
	public update(dbArea: string, object: any) {
		if (!dbArea) {
			throw Error("No area was provided!");
		}
		if (!object) {
			throw Error("No object was provided!");
		}

		var dbLocation = dbArea + "/" + object.id;

		const uploadResponse = this.afdb.object(dbLocation);
		if (this.authService.isAuthenticated()) {
			var currentUser = this.authService.getCurrentUser();
			if (!!currentUser) {
				object.lastModifiedBy = currentUser.uid;
			}
		}
		return uploadResponse.update(object);
	}
	public registerAction(dbArea: string, action: Action, object: any) {
		if (!dbArea) {
			throw Error("No dbArea was provided!");
		}
		if (!action) {
			throw Error("No action was provided!");
		}
		if (!object) {
			throw Error("No object was provided!");
		}

		var dbLocation = dbArea + "/" + object.id;

		switch (action) {
			case Action.UpVote:
				object.upVotes = !!object.upVotes ? object.upVotes + 1 : 1;
				break;
			case Action.DownVote:
				object.downVotes = !!object.downVotes ? object.downVotes + 1 : 1;
				break;
		}

		const uploadResponse = this.afdb.object(dbLocation);
		return uploadResponse.set(object);
	}
	public favoriteQuestion(question: Question) {
		var user = this.userService.getCurrentUser();
		if (user) {
			return this.uploadUserItem("Favorites", question, user);
		}
	}
	public unfavoriteQuestion(question: Question) {
		var user = this.userService.getCurrentUser();
		if (user) {
			return this.removeUserItem("Favorites", question.id, user);
		}
	}
	public removeUserItem(areaName: string, objectId: any, user: UserModel = null) {
		if (!user) {
			user = this.userService.getCurrentUser();
			if (!user) {
				throw Error("No user was available!");
			}
		}
		if (!objectId) {
			throw Error("No objectId was provided!");
		}

		var dbLocation = user.uid + "/" + areaName + "/" + objectId;

		const uploadResponse = this.afdb.object(dbLocation);
		return uploadResponse.remove();
	}
	public updateUserItem(itemName: string, object: any, user: UserModel = null) {
		if (!user) {
			user = this.userService.getCurrentUser();
			if (!user) {
				throw Error("No user was available!");
			}
		}
		if (!object) {
			throw Error("No object was provided!");
		}

		var dbLocation = user.uid + "/" + itemName + "/" + object.id;

		const uploadResponse = this.afdb.object(dbLocation);
		return uploadResponse.set(object);
	}
	public uploadUserItem(itemName: string, object: any, user: UserModel = null) {
		if (!user) {
			user = this.userService.getCurrentUser();
			if (!user) {
				throw Error("No user was available!");
			}
		}
		if (!object) {
			throw Error("No object was provided!");
		}

		var dbLocation = user.uid + "/" + itemName + "/" + object.id;

		const uploadResponse = this.afdb.object(dbLocation);
		return uploadResponse.set(moment.utc().format());
	}
	public getUserItem(itemName: string, object: any, user: UserModel = null) {
		if (!user) {
			user = this.userService.getCurrentUser();
			if (!user) {
				throw Error("No user was available!");
			}
		}
		if (!object) {
			throw Error("No object was provided!");
		}

		var dbLocation = user.uid + "/" + itemName + "/" + object.id;

		const response = this.afdb.object(dbLocation);
		return response;
	}
	public getUserList(areaName: string, user: UserModel = null) {
		if (!user) {
			user = this.userService.getCurrentUser();
			if (!user) {
				throw Error("No user was available!");
			}
		}

		var dbLocation = user.uid + "/" + areaName;

		const response = this.afdb.object(dbLocation);
		return response;
	}
	public getAllFromArea(area: string) {
		if (!area) {
			throw Error("No area was provided!");
		}

		const getResponse = this.afdb.list(`/${area}`);
		return getResponse;
	}
	public getByIdFromArea(area: string, id: string) {
		if (!area) {
			throw Error("No area was provided!");
		}
		if (!id) {
			throw Error("No id was provided!");
		}

		const getResponse = this.afdb.object(`/${area}/${id}`);
		return getResponse;
	}
}
