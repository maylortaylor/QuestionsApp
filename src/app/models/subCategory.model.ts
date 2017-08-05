import { Status } from "./enums/status.enum";
import * as moment from "moment";

export class SubCategory {
	id: string;
	categoryId: string;
	title: string;
	description: string;
	dateCreated: string;
	status: Status;
	/**
     *
     */
	constructor(guid, isPlatform: boolean = false, title: string, description: string, status: Status) {
		this.id = guid;
		this.title = title;
		this.description = description;
		this.dateCreated = moment.utc().format();

		if (isPlatform) {
			this.status = Status.Platform;
		} else {
			this.status = Status.Undefined;
		}

		// override status with incoming status
		this.status = status;
	}
}
