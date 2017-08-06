import { SubCategory } from "./subCategory.model";
import { Status } from "./enums/status.enum";
import { BaseSettings } from "./baseSettings.model";
import { CategoryType } from "./enums/categoryType.enum";

import * as moment from "moment";
export class Category extends BaseSettings {
	id: string;
	title: string;
	description: string;
	dateCreated: string;
	subCategories: Array<SubCategory>;
	status: Status;
	type: CategoryType;
	numberOfChoices: number;
	/**
     *
     */
	constructor(
		guid: string,
		isPlatform: boolean = false,
		title: string,
		description: string,
		status: Status,
		type: CategoryType,
		hasOptions: boolean,
		isMultipleChoice: boolean,
		numberOfChoices: number = 1
	) {
		super();

		this.id = guid;
		this.title = title;
		this.description = description;
		this.type = type;
		this.subCategories = new Array<SubCategory>();
		this.dateCreated = moment.utc().format();
		this.hasOptions = hasOptions;
		this.isMultipleChoice = isMultipleChoice;
		this.numberOfChoices = !!this.isMultipleChoice ? numberOfChoices : 1;

		if (isPlatform) {
			this.status = Status.Platform;
		} else {
			this.status = Status.Undefined;
		}

		// override status with incoming status
		this.status = status;
	}
}
