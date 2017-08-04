import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable()
export class DateTimeService {
	addFriendlyDateTime(object: any) {
		if (!!object.dateCreated) {
			object.dateCreated;
		}
	}
}
