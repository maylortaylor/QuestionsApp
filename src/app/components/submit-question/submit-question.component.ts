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

import * as _ from "lodash";
declare var jquery: any;
declare var $: any;

@Component({
	selector: "app-submit-question",
	templateUrl: "./submit-question.component.html",
	styleUrls: ["./submit-question.component.less"]
})
export class SubmitQuestionComponent implements OnInit {
	categories: Array<SelectListItem> = new Array<SelectListItem>();
	subCategories: Array<SubCategory> = new Array<SubCategory>();
	tags: Array<Tag> = new Array<Tag>();

	question: Question = new Question(this.guid.newGuid());

	constructor(private guid: GuidService, private afdb: AngularFireDBService, private logger: LoggingService) {}

	routerOnActivate() {}
	ngOnInit() {
		$(document).ready(() => {
			$("select").material_select();
		});

		this.getCategories();
		this.getSubCategories();
		this.getTags();
	}
	private async getCategories() {
		var wonGetCategories = (items) => {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var selectListItem = new SelectListItem();
				selectListItem.title = item.title;
				selectListItem.itemValue = item.id;
				this.categories.push(selectListItem);
			}
			this.categories = _.orderBy(this.categories, ['title'], ['asc'])
			this.logger.log("WON get Categories", this.categories);
		}
		var lostGetCategories = (response) => {
			this.logger.log("LOST get Categories", response);
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

		this.afdb
			.upload("Submissions", this.question)
			.then(() => {
				this.logger.log("WON Upload Submission", this.question);
			})
			.catch(() => {
				this.logger.log("LOST Upload Submission", this.question);
			});
	}
}
