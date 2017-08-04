import { SubCategory } from "./subCategory.model";
import { Status } from "./enums/status.enum";

import * as moment from "moment";
export class Category {
	id: string;
	title: string;
	description: string;
	dateCreated: string;
	subCategories: Array<SubCategory>;
	status: Status;
	/**
     *
     */
	constructor(guid, isPlatform: boolean = false) {
		this.id = guid;
		this.subCategories = new Array<SubCategory>();
		this.dateCreated = moment.utc().format();
		if (isPlatform) {
			this.status = Status.Platform;
		} else {
			this.status = Status.Undefined;
		}
	}
}
