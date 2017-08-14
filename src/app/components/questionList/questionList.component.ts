import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { Question } from "../../models/question.model";
import { Tag } from "../../models/tag.model";
import { Category } from "../../models/category.model";
import { SubCategory } from "../../models/SubCategory.model";

import { LoggingService } from "../../shared/logging/logging.service";
import { AngularFireDBService } from "../../shared/angular-fire/angular-fire-db.service";
import { ToastService } from "../../shared/toasts/toast.service";
import { SearchService } from "../../shared/filters/search.service";

// import { SearchFilterPipe } from "../../shared/filters/search-filter.pipe";

import * as _ from "lodash";
declare var jquery: any;

@Component({
	selector: "app-question-list",
	templateUrl: "./questionList.component.html",
	styleUrls: ["./questionList.component.less"]
})
export class QuestionListComponent implements OnInit {
	private question: Subscription;
	searchText: string;
	questions: Array<Question> = new Array<Question>();
	tagsForFilter: Array<Tag> = new Array<Tag>();
	categoriesForFilter: Array<Category> = new Array<Category>();
	subCategoriesForFilter: Array<SubCategory> = new Array<SubCategory>();

	filteredTags: any = new Array<any>();
	tagFilteringArray: any = new Array<any>();

	filteredCategories: any = new Array<any>();
	categoryFilteringArray: any = new Array<any>();

	constructor(
		private ss: SearchService,
		private afdb: AngularFireDBService,
		private logger: LoggingService,
		private toast: ToastService
	) {
		this.getQuestions();
	}

	ngOnInit() {}

	private async getQuestions() {
		this.afdb.getAllFromArea("Submissions").subscribe(items => {
			for (var i = 0; i < items.length; i++) {
				var question = items[i];
				this.questions.push(question);
			}
			if (!!this.questions.length) {
				this.populateFilters(this.questions);
			}
		});

		this.logger.log("Questions", this.questions);
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
