import { Injectable } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class AngularFireDBService {
	constructor(private afdb: AngularFireDatabase) {}

	public upload(area: string, object: any, objectPrefix: string = null) {
		if (!area) {
			throw Error("No area was provided!");
		}
		if (!object) {
			throw Error("No object was provided!");
		}

		var dbLocation = area + "/";
		if (!!objectPrefix) {
			dbLocation = dbLocation + objectPrefix + "-";
		}
		dbLocation = dbLocation + object.id;

		const uploadResponse = this.afdb.object(dbLocation);
		return uploadResponse.set(object);
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
