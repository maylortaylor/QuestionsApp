import { Status } from "./enums/status.enum";
import * as moment from "moment";

export class Tag {
	id: string;
	title: string;
	description: string;
	dateCreated: string;
	status: Status;
	/**
     *
     */
	constructor(guid: string, isPlatform: boolean = false, title: string, description: string, status: Status) {
		this.id = guid;
		this.dateCreated = moment.utc().format();
		this.title = title;
		this.description = description;

		if (isPlatform) {
			this.status = Status.Platform;
		} else {
			this.status = Status.Undefined;
		}

		// override status with incoming status
		this.status = status;
	}
}
