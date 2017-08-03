export class Question {
	id: string;
	categoryId: any;
	subCategoryId: string;
	questionText: string;
	description: string;
	dateCreated: string;
	tags: Array<string>;
	/**
     *
     */
	constructor(guid) {
		this.id = guid;
		this.tags = new Array<string>();
	}
}
