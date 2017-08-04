import { Component, OnInit } from "@angular/core";
// import { NgForm } from "@angular/forms";
import { Category } from "../../models/category.model";
import { SubCategory } from "../../models/subCategory.model";
import { Tag } from "../../models/tag.model";

import { Question } from "../../models/question.model";

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
	categories: Array<Category> = new Array<Category>();
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
	async getCategories() {
		await this.afdb.getAllFromArea("Categories").subscribe(items => {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				this.categories.push(item);
			}
		});
	}

	async getSubCategories() {
		await this.afdb.getAllFromArea("SubCategories").subscribe(items => {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				this.subCategories.push(item);
			}
		});
	}

	async getTags() {
		await this.afdb.getAllFromArea("Tags").subscribe(items => {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				this.tags.push(item);
			}
		});
	}

	isValidForm() {
		if (!!this.question.questionText && this.question.questionText.length > 10) {
			return true;
		} else {
			return false;
		}
	}
	submitQuestion() {
		if (!this.question.questionText) {
			this.logger.log("No Question was provided", this.question);
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
