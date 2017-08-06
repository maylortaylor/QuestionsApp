import { Status } from "./enums/status.enum";
import { SelectListItem } from "./selectListItem.model";
import { Category } from "./category.model";
import { SubCategory } from "./subCategory.model";
import { Tag } from "./tag.model";

import * as moment from "moment";

export class Question {
	id: string;
	// categoryId: any;
	category: Category;
	// subCategoryId: string;
	subCategory: SubCategory;
	questionText: string;
	description: string;
	dateCreated: string;
	questionItems: Array<string>;
	tags: Array<Tag>;
	status: Status;
	/**
     *
     */
	constructor(guid: string, isPlatform: boolean = false, questionText: string = null, description: string = null, status: Status = Status.Platform) {
		this.id = guid;
		this.tags = new Array<Tag>();
		this.questionItems = new Array<string>();
		this.dateCreated = moment.utc().format();
		this.questionText = questionText;
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
