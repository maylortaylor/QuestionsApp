import { Component, OnInit } from "@angular/core";
import { Category } from "../../models/category.model";
import { SubCategory } from "../../models/subCategory.model";
import { Tag } from "../../models/tag.model";

import * as _ from "lodash";

@Component({
	selector: "app-submit-question",
	templateUrl: "./submit-question.component.html",
	styleUrls: ["./submit-question.component.less"]
})
export class SubmitQuestionComponent implements OnInit {
	categories: Array<Category>;
	subCategories: Array<SubCategory>;

	private cats: any = ["Would You Rather", "Fuck, Marry, or Kill", "Pick Top 3", "Devil's Advocate", "Opend Ended..."];
	private subcats: any = ["Real", "Fiction", "Male", "Female"];
	constructor() {}

	ngOnInit() {
		this.categories = new Array<Category>();
		this.subCategories = new Array<SubCategory>();

		_.forEach(this.cats, cat => {
			var newCat = new Category();
			newCat.id = "1";
			newCat.title = cat;
			this.categories.push(newCat);
		});
		_.forEach(this.subcats, subcat => {
			var newSubCat = new SubCategory();
			newSubCat.id = "sub1";
			newSubCat.title = subcat;
			this.subCategories.push(newSubCat);
		});
	}
}
