import { Component, OnInit } from "@angular/core";
// import { NgForm } from "@angular/forms";
import { Category } from "../../models/category.model";
import { SubCategory } from "../../models/subCategory.model";
import { Tag } from "../../models/tag.model";

import { Question } from "../../models/question.model";
import { SelectListItem } from "../../models/selectListItem.model";

import { LoggingService } from "../../shared/logging/logging.service";
import { GuidService } from "../../shared/guid/guid.service";
import { AngularFireDBService } from "../../shared/angular-fire/angular-fire-db.service";
import { ToastService } from "../../shared/toasts/toast.service";

import * as _ from "lodash";
declare var jquery: any;
declare var $: any;

@Component({
	selector: "app-submit-question",
	templateUrl: "./submitQuestion.component.html",
	styleUrls: ["./submitQuestion.component.less"]
})
export class SubmitQuestionComponent implements OnInit {
	categories: Array<Category> = new Array<Category>();
	subCategories: Array<SubCategory> = new Array<SubCategory>();
	tags: Array<Tag> = new Array<Tag>();

	question: Question = new Question(this.guid.newGuid());
	showSubCategory: boolean = false;

	constructor(private guid: GuidService, private afdb: AngularFireDBService, private logger: LoggingService, private toast: ToastService) {}

	routerOnActivate() {}
	ngOnInit() {
		$(document).ready(() => {
			$("select").material_select();
		});

		this.getCategories();
		this.getSubCategories();
		this.getTags();
	}
	hasCategory() {
		var hasCategory: boolean = false;
		if (!!this.question.category) {
			if (!!this.question.category.id) {
				return true;
			}
		}
		return false;
	}
	onCategoryChange() {
		this.determineShowSubCategory();
	}
	determineShowSubCategory() {
		if (!!this.question.category) {
			var cat: Category = _.first(_.filter(this.categories, this.question.category));
			this.showSubCategory = (!!cat.isMultipleChoice)
		}
	}
	determineNumberOfInputFields() {
		if (!!this.question.category) {
			var cat: Category = _.first(_.filter(this.categories, this.question.category));
			if (!!cat.hasOptions) {
				return 3;
			} else {
				return 1;
			}
		}
	}
	private async getCategories() {
		var wonGetCategories = (items) => {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				// var selectListItem = new SelectListItem();
				// selectListItem.title = item.title;
				// selectListItem.itemValue = item.id;
				this.categories.push(item);
			}
			this.categories = _.orderBy(this.categories, ['title'], ['asc'])
			this.logger.log("WON get Categories", this.categories);
		}
		var lostGetCategories = (response) => {
			this.logger.log("LOST get Categories", response);
			this.toast.fail("Uh oh! Failed to get Categories!");
		}

		this.afdb.getAllFromArea("Categories").subscribe(wonGetCategories, lostGetCategories);
	}

	private async getSubCategories() {
		var wonGetSubCateories = (items) => {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				this.subCategories.push(item);
			}

			this.subCategories = _.sortBy(this.subCategories, ['title'], ['asc'])
			this.logger.log("WON Sub Categories", this.subCategories);
		}
		var lostGetSubCategories = (response) => {
			this.logger.log("LOST get Sub Categories", response);
			this.toast.fail("Uh oh! Failed to get Sub Categories!");
		}
		await this.afdb.getAllFromArea("SubCategories").subscribe(wonGetSubCateories, lostGetSubCategories);
	}

	private async getTags() {
		var wonGetTags = (items) => {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				this.tags.push(item);
			}

			this.tags = _.sortBy(this.tags, ['title'], ['asc'])
			this.logger.log("WON get Tags", this.tags);
		}
		var lostGetTags = (response) => {
			this.logger.log("LOST get Tags", response);
			this.toast.fail("Uh oh! Failed to get Tags!");
		}
		await this.afdb.getAllFromArea("Tags").subscribe(wonGetTags, lostGetTags);
	}

	public isValidForm() {
		if (!!this.question.questionText && this.question.questionText.length > 10) {
			return true;
		} else {
			return false;
		}
	}
	public submitQuestion() {
		if (!this.question.questionText) {
			this.logger.log("No Question Text was provided", this.question);
		}
		this.logger.log("Submitting Question", this.question);

		var wonSubmitQuestion = (response) => {
			this.logger.log("WON Upload Submission", this.question);
			this.toast.success("Yay! Question uploaded!");
		}
		var lostSubmitQuestion = (response) => {
			this.logger.log("LOST Upload Submission", this.question);
			this.toast.fail("On No!! Question failed to upload!");
		}
		this.afdb
			.upload("Submissions", this.question)
			.then(wonSubmitQuestion)
			.catch(lostSubmitQuestion);
	}
}
