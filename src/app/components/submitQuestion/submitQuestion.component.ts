import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Category } from "../../models/category.model";
import { CategoryType } from "../../models/enums/categoryType.enum";
import { SubCategory } from "../../models/subCategory.model";
import { Tag } from "../../models/tag.model";

import { Question } from "../../models/question.model";
import { SelectListItem } from "../../models/selectListItem.model";

import { LoggingService } from "../../shared/logging/logging.service";
import { GuidService } from "../../shared/guid/guid.service";
import { AngularFireDBService } from "../../shared/angular-fire/angular-fire-db.service";
import { ToastService } from "../../shared/toasts/toast.service";
import { MultiInputLabelDeterminerService } from "./services/MultiInputLabelDeterminer.service";

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
	questionItems: Array<string> = new Array<string>();

	question: Question = new Question(this.guid.newGuid(), false);
	showSubCategory: boolean = false;

	constructor(
		private guid: GuidService,
		private afdb: AngularFireDBService,
		private logger: LoggingService,
		private toast: ToastService,
		private labelService: MultiInputLabelDeterminerService
	) {}

	routerOnActivate() {}
	ngOnInit() {
		$(document).ready(() => {
			$("select").material_select();
		});

		this.getCategories();
		this.getSubCategories();
		this.getTags();
	}
	public hasCategory() {
		var hasCategory: boolean = false;
		if (!!this.question.category) {
			if (!!this.question.category.id) {
				return true;
			}
		}
		return false;
	}
	onCategoryChange(submitQuestionForm: NgForm) {
		this.determineShowSubCategory();
	}
	private determineShowSubCategory() {
		if (!!this.question.category) {
			var cat: Category = _.first(_.filter(this.categories, this.question.category));
			this.showSubCategory = !!cat.hasSubCategories;
		}
	}
	public indexTrackBy(index: number, obj: any): any {
		return index;
	}
	public determineNumberOfInputFields() {
		if (!!this.question.category) {
			var cat: Category = _.first(_.filter(this.categories, this.question.category));
			if (cat.numberOfChoices > 1) {
				this.questionItems = new Array<string>(cat.numberOfChoices);
				return cat.numberOfChoices;
			}
			return cat.numberOfChoices;
		}
	}
	public determindQuestionItemLabel(category: Category, index: number) {
		switch (category.type) {
			case CategoryType.FuckMaryKill:
				return this.labelService.determineFuckMaryKill(category, index);
			case CategoryType.Pick3:
				return this.labelService.determinePickTop3(category, index);
			case CategoryType.Pick5:
				return this.labelService.determinePickTop5(category, index);
		}
	}
	public hasMaxNumberOfChoices() {
		if (!!this.question.category) {
			return this.question.category.numberOfChoices == Number.MAX_VALUE ? true : false;
		} else {
			return false;
		}
	}
	private async getCategories() {
		var wonGetCategories = items => {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				// var selectListItem = new SelectListItem();
				// selectListItem.title = item.title;
				// selectListItem.itemValue = item.id;
				this.categories.push(item);
			}
			this.categories = _.orderBy(this.categories, ["title"], ["asc"]);
			this.logger.log("WON get Categories", this.categories);
		};
		var lostGetCategories = response => {
			this.logger.log("LOST get Categories", response);
			this.toast.fail("Uh oh! Failed to get Categories!");
		};

		this.afdb.getAllFromArea("Categories").subscribe(wonGetCategories, lostGetCategories);
	}

	private async getSubCategories() {
		var wonGetSubCateories = items => {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				this.subCategories.push(item);
			}

			this.subCategories = _.sortBy(this.subCategories, ["title"], ["asc"]);
			this.logger.log("WON Sub Categories", this.subCategories);
		};
		var lostGetSubCategories = response => {
			this.logger.log("LOST get Sub Categories", response);
			this.toast.fail("Uh oh! Failed to get Sub Categories!");
		};
		await this.afdb.getAllFromArea("SubCategories").subscribe(wonGetSubCateories, lostGetSubCategories);
	}

	private async getTags() {
		var wonGetTags = items => {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				this.tags.push(item);
			}

			this.tags = _.sortBy(this.tags, ["title"], ["asc"]);
			this.logger.log("WON get Tags", this.tags);
		};
		var lostGetTags = response => {
			this.logger.log("LOST get Tags", response);
			this.toast.fail("Uh oh! Failed to get Tags!");
		};
		await this.afdb.getAllFromArea("Tags").subscribe(wonGetTags, lostGetTags);
	}

	public isValidForm() {
		if (this.determineNumberOfInputFields() > 1) {
			switch (this.question.questionItems.length) {
				case 3:
					if (!!this.question.questionItems[0] && !!this.question.questionItems[1] && !!this.question.questionItems[2]) {
						return true;
					} else {
						return false;
					}
				case 5:
					if (
						!!this.question.questionItems[0] &&
						!!this.question.questionItems[1] &&
						!!this.question.questionItems[2] &&
						!!this.question.questionItems[3] &&
						!!this.question.questionItems[4]
					) {
						return true;
					} else {
						return false;
					}
			}
		} else {
			if (!!this.question.questionText && this.question.questionText.length > 10) {
				return true;
			} else {
				return false;
			}
		}
	}
	public submitQuestion(submitQuestionForm: NgForm) {
		this.logger.log("FORM", submitQuestionForm);

		if (!this.question.questionText) {
			this.logger.log("No Question Text was provided", this.question);
		}
		this.logger.log("Submitting Question", this.question);

		var wonSubmitQuestion = response => {
			this.logger.log("WON Upload Submission", this.question);
			this.toast.success("Yay! Question uploaded!");
		};
		var lostSubmitQuestion = response => {
			this.logger.log("LOST Upload Submission", this.question);
			this.toast.fail("On No!! Question failed to upload!");
		};
		this.afdb.upload("Submissions", this.question).then(wonSubmitQuestion).catch(lostSubmitQuestion);
	}
}
