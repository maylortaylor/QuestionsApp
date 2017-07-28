import { SubCategory } from "./subCategory.model";

export class Category {
	id: string;
	title: string;
	description: string;
	dateCreated: string;
	subCategories: Array<SubCategory>;
	/**
     *
     */
	constructor() {
		// this.id = new Guid();
		this.subCategories = new Array<SubCategory>();
	}
}
