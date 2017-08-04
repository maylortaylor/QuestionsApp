import { Status } from "./enums/status.enum";
import { SelectListItem } from "./selectListItem.model"
import { Category } from "./category.model";
import { SubCategory } from "./subCategory.model";
import { Tag } from "./tag.model";

import * as moment from "moment";

export class Question {
	id: string;
	// categoryId: any;
	category: Category;
	// subCategoryId: string;
	subCategory: SubCategory
	questionText: string;
	description: string;
	dateCreated: string;
	tags: Array<Tag>;
	status: Status;
	/**
     *
     */
	constructor(guid, isPlatform: boolean = false) {
		this.id = guid;
		this.tags = new Array<Tag>();
		this.dateCreated = moment.utc().format();
		if (isPlatform) {
			this.status = Status.Platform;
		} else {
			this.status = Status.Undefined;
		}
	}
}
