import { Status } from "./enums/status.enum";
import { SelectListItem } from "./selectListItem.model"

import * as moment from "moment";

export class Question {
	id: string;
	// categoryId: any;
	category: SelectListItem;
	// subCategoryId: string;
	subCategory: SelectListItem
	questionText: string;
	description: string;
	dateCreated: string;
	tags: Array<SelectListItem>;
	status: Status;
	/**
     *
     */
	constructor(guid, isPlatform: boolean = false) {
		this.id = guid;
		this.tags = new Array<SelectListItem>();
		this.dateCreated = moment.utc().format();
		if (isPlatform) {
			this.status = Status.Platform;
		} else {
			this.status = Status.Undefined;
		}
	}
}
