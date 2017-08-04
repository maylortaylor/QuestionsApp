import { Status } from "./enums/status.enum";

import * as moment from "moment";

export class Question {
	id: string;
	categoryId: any;
	subCategoryId: string;
	questionText: string;
	description: string;
	dateCreated: string;
	tags: Array<string>;
	status: Status;
	/**
     *
     */
	constructor(guid, isPlatform: boolean = false) {
		this.id = guid;
		this.tags = new Array<string>();
		this.dateCreated = moment.utc().format();
		if (isPlatform) {
			this.status = Status.Platform;
		} else {
			this.status = Status.Undefined;
		}
	}
}
