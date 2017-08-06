import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, NgForm } from "@angular/forms";

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
import { SubmitQuestionFormValidatorService } from "./services/SubmitQuestionFormValidator.service";
import { NumberOfInputFieldDeterminerService } from "./services/NumberOfInputFieldDeterminer.service";

import * as _ from "lodash";
declare var jquery: any;
declare var $: any;

@Component({
	selector: "app-submit-question",
	templateUrl: "./submitQuestion.component.html",
	styleUrls: ["./submitQuestion.component.less"]
})
export class SubmitQuestionComponent implements OnInit {
	submitQuestionForm: any;
	categories: Array<Category> = new Array<Category>();
	subCategories: Array<SubCategory> = new Array<SubCategory>();
	tags: Array<Tag> = new Array<Tag>();
	questionItems: Array<string> = new Array<string>();

	question: Question = new Question(this.guid.newGuid(), false);
	showSubCategory: boolean = false;

	minLengthOfMultiInputs: number = 4;
	minLengthOfSingleInput: number = 10;

	constructor(
		private formBuilder: FormBuilder,
		private guid: GuidService,
		private afdb: AngularFireDBService,
		private logger: LoggingService,
		private toast: ToastService,
		private labelService: MultiInputLabelDeterminerService,
		private formValidator: SubmitQuestionFormValidatorService,
		private inputCount: NumberOfInputFieldDeterminerService
	) {
		// prettier-ignore
		// TODO get angular validators working
		// this.submitQuestionForm = this.formBuilder.group({
		// 	'questionText': ["", Validators.required, Validators.minLength(10)]
		// 	// email: ["", [Validators.required]],
		// 	// profile: ["", [Validators.required, Validators.minLength(10)]]
		// });
	}

	routerOnActivate() {}
	ngOnInit() {
		$(document).ready(() => {
			$("select").material_select();
		});

		this.getCategories();
		this.getSubCategories();
		this.getTags();
	}
	onCategoryChange(submitQuestionForm: NgForm) {
		this.determineShowSubCategory();
	}
	public indexTrackBy(index: number, obj: any): any {
		return index;
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
	private determineShowSubCategory() {
		if (!!this.question.category) {
			var cat: Category = _.first(_.filter(this.categories, this.question.category));
			this.showSubCategory = !!cat.hasSubCategories;
		}
	}
	public determineNumberOfInputFields() {
		var numberOfInputFields: number = this.inputCount.determineNumberOfInputFields(this.question);
		if (numberOfInputFields > 1 && numberOfInputFields != Number.MAX_VALUE) {
			this.questionItems = new Array<string>(numberOfInputFields);
		}
		return numberOfInputFields;
	}
	public determindQuestionItemLabel(category: Category, index: number) {
		if (this.determineNumberOfInputFields() > 1) {
			return this.labelService.multipleInputFields(category, index);
		} else {
			return this.labelService.singleInputField(category, index);
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
		if (!!this.question) {
			return this.formValidator.isSubmitQuestionFormValid(this.question);
		} else {
			return false;
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
