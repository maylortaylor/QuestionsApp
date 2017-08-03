import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Category } from "../../models/category.model";
import { SubCategory } from "../../models/subCategory.model";
import { Tag } from "../../models/tag.model";

import { Question } from "../../models/question.model";

import { GuidService } from "../../shared/guid/guid.service";

import * as _ from "lodash";
declare var jquery: any;
declare var $: any;

@Component({
	selector: "app-submit-question",
	templateUrl: "./submit-question.component.html",
	styleUrls: ["./submit-question.component.less"]
})
export class SubmitQuestionComponent implements OnInit {
	categories: Array<Category>;
	subCategories: Array<SubCategory>;
	tags: Array<Tag>;

	question: Question = new Question(this.guid.newGuid());

	private cats: any = ["Would You Rather", "Fuck, Marry, or Kill", "Pick Top 3", "Devil's Advocate", "Opend Ended..."];
	private subcats: any = ["Real", "Fiction", "Male", "Female"];
	private allTags: any = [
		"SFW",
		"NSFW",
		"PC (politically correct)",
		"non-PC (not politically correct)",
		"People",
		"Places",
		"Things",
		"Politics",
		"Religion",
		"Nerd",
		"Books",
		"Music",
		"Technology",
		"Geek",
		"Comics"
	];
	constructor(private guid: GuidService) {}

	ngOnInit() {
		$(document).ready(function() {
			$("select").material_select();
		});

		this.categories = new Array<Category>();
		this.subCategories = new Array<SubCategory>();
		this.tags = new Array<Tag>();

		_.forEach(this.cats, cat => {
			var newCat = new Category();
			newCat.id = this.guid.newGuid();
			newCat.title = cat;
			this.categories.push(newCat);
		});
		_.forEach(this.subcats, subcat => {
			var newSubCat = new SubCategory();
			newSubCat.id = this.guid.newGuid();
			newSubCat.title = subcat;
			this.subCategories.push(newSubCat);
		});
		_.forEach(this.allTags, tag => {
			var newTag = new Tag();
			newTag.id = this.guid.newGuid();
			newTag.title = tag;
			this.tags.push(newTag);
		});
	}
	submitQuestion() {
		console.log(this.question);
	}
}
