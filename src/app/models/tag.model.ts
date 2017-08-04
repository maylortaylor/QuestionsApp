import { Status } from "./enums/status.enum";
import * as moment from "moment";

export class Tag {
	id: string;
	title: string;
	dateCreated: string;
	status: Status;
	/**
     *
     */
	constructor(guid, isPlatform: boolean = false) {
		this.id = guid;
		this.dateCreated = moment.utc().format();
		if (isPlatform) {
			this.status = Status.Platform;
		} else {
			this.status = Status.Undefined;
		}
	}
}
