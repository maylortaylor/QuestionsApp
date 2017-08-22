import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";


import { Question } from "../../models/question.model";
import { Tag } from "../../models/tag.model";
import { Category } from "../../models/category.model";
import { SubCategory } from "../../models/SubCategory.model";

import { QuestionService } from "../../shared/questions/Question.service";
import { QuestionActionService } from "../../shared/questions/QuestionAction.service";
// import { VotingService } from "./services/Voting.service";
import { LoggingService } from "../../shared/logging/logging.service";
import { AngularFireDBService } from "../../shared/angular-fire/angular-fire-db.service";
import { ToastService } from "../../shared/toasts/toast.service";
import { SearchService } from "../../shared/filters/search.service";

import * as _ from "lodash";
declare var jquery: any;


@Component({
    selector: 'app-saved-question-list',
    templateUrl: './savedQuestionList.component.html',
    styleUrls: ["./savedQuestionList.component.less"]
})

export class SavedQuestionListComponent implements OnInit {
    private question: Subscription;
	searchText: string;
	questions: Array<Question> = new Array<Question>();
	tagsForFilter: Array<Tag> = new Array<Tag>();
	categoriesForFilter: Array<Category> = new Array<Category>();
	subCategoriesForFilter: Array<SubCategory> = new Array<SubCategory>();

	// TAGS Filter
	filteredTags: any = new Array<any>();
	tagFilteringArray: any = new Array<any>();
	// CATEGORIES Filter
	filteredCategories: any = new Array<any>();
	categoryFilteringArray: any = new Array<any>();
	// SUBCATEGORIES Filter
	filteredSubCategories: any = new Array<any>();
	subCategoryFilteringArray: any = new Array<any>();

	constructor(
		private ss: SearchService,
		private afdb: AngularFireDBService,
		private logger: LoggingService,
		private toast: ToastService,
		// private votingService: VotingService,
		// private actionService: QuestionActionService,
		private questionService: QuestionService
	) {
		this.getQuestions();
	}
    ngOnInit() { }
	private async getQuestions() {
		var wonGetQuestions = items => {
			for (var i = 0; i < items.length; i++) {
				var question = items[i];
				this.questions.push(question);
			}
			if (!!this.questions.length) {
				this.questionService.markUserFavorite(this.questions);
				this.populateFilters(this.questions);
			}

			this.logger.log("WON Get Question", this.questions);
		};
		var lostGetQuestions = err => {
			this.logger.log("LOST Get Question", err);
		};
		this.questionService.getQuestions().subscribe(wonGetQuestions, lostGetQuestions);
	}
	public setButtonColor(array: any[]): string {
		if (!array || !array.length) {
			return null;
		}
		return "purple accent-3";
	}
	public hideCheckmarkOnButton(array: any[]): boolean {
		if (!array || !array.length) {
			return true;
		}
		return false;
	}
	public hideCheckmark(array: any[], item: any): boolean {
		if (!array) {
			return true;
		}
		if (!!array.length) {
			if (array.indexOf(item.id) > -1) {
				return false;
			}
			return true;
		}
		return true;
	}



	//
	// Filters
	//
	public showClearFilterButton() {
		if (
			(!!this.tagFilteringArray && !!this.tagFilteringArray.length) ||
			(!!this.categoryFilteringArray && !!this.categoryFilteringArray.length) ||
			(!!this.subCategoryFilteringArray && !!this.subCategoryFilteringArray.length)
		) {
			return true;
		}
		return false;
	}
	public clearFilters() {
		this.tagFilteringArray = null;
		this.categoryFilteringArray = null;
		this.subCategoryFilteringArray = null;
	}
	public setTagFilter(tag: Tag) {
		this.logger.log("Filtering Tag: ", tag.title);

		var index = this.filteredTags.indexOf(tag.id);
		if (index > -1) {
			this.filteredTags.splice(index, 1);
		} else {
			this.filteredTags.push(tag.id);
		}

		this.tagFilteringArray = this.filteredTags.length > 0 ? this.filteredTags : new Array<any>();

		this.logger.log("tag filtering", this.tagFilteringArray);
	}
	public setCategoryFilter(cat: Category) {
		this.logger.log("Filtering Category: ", cat.title);

		var index = this.filteredCategories.indexOf(cat.id);
		if (index > -1) {
			this.filteredCategories.splice(index, 1);
		} else {
			this.filteredCategories.push(cat.id);
		}

		this.categoryFilteringArray = this.filteredCategories.length > 0 ? this.filteredCategories : new Array<any>();

		this.logger.log("cat filtering", this.categoryFilteringArray);
	}
	public setSubCategoryFilter(subCat: SubCategory) {
		this.logger.log("Filtering Sub Category: ", subCat.title);

		var index = this.filteredSubCategories.indexOf(subCat.id);
		if (index > -1) {
			this.filteredSubCategories.splice(index, 1);
		} else {
			this.filteredSubCategories.push(subCat.id);
		}

		this.subCategoryFilteringArray = this.filteredSubCategories.length > 0 ? this.filteredSubCategories : new Array<any>();

		this.logger.log("subCat filtering", this.subCategoryFilteringArray);
	}
	private populateFilters(questions: Array<Question>) {
		this.getTagsForFilter(this.questions);
		this.getCategoriesForFilter(this.questions);
		this.getSubCategoriesForFilter(this.questions);
	}
	private async getCategoriesForFilter(questions: Array<Question>) {
		for (var i = 0; i < questions.length; i++) {
			var q = questions[i];
			if (!!q.category) {
				this.categoriesForFilter.push(q.category);
			}
		}
		this.categoriesForFilter = _.uniqBy(this.categoriesForFilter, "id");
		this.logger.log("Categories For Filter: ", this.categoriesForFilter);
	}
	private async getSubCategoriesForFilter(questions: Array<Question>) {
		for (var i = 0; i < questions.length; i++) {
			var q = questions[i];
			if (!!q.subCategory) {
				this.subCategoriesForFilter.push(q.subCategory);
			}
		}
		this.subCategoriesForFilter = _.uniqBy(this.subCategoriesForFilter, "id");
		this.logger.log("Sub Categories For Filter: ", this.subCategoriesForFilter);
	}
	private async getTagsForFilter(questions: Array<Question>) {
		for (var i = 0; i < questions.length; i++) {
			var q = questions[i];
			if (!!q.tags) {
				for (var t = 0; t < q.tags.length; t++) {
					var tag = q.tags[t];
					if (!!tag) {
						this.tagsForFilter.push(tag);
					}
				}
			}
		}
		this.tagsForFilter = _.uniqBy(this.tagsForFilter, "id");
		this.logger.log("Tags For Filter: ", this.tagsForFilter);
	}
}