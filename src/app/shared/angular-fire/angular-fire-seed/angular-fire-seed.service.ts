import { Injectable } from "@angular/core";
import { AngularFireDBService } from "../angular-fire-db.service";
import { GuidService } from "../../guid/guid.service";
import { LoggingService } from "../../logging/logging.service";

import { Category } from "../../../models/category.model";
import { SubCategory } from "../../../models/subCategory.model";
import { Tag } from "../../../models/tag.model";

import * as moment from "moment";

@Injectable()
export class AngularFireDbSeeder {
	private categoriesForSeed: any = ["Would You Rather", "Fuck, Marry, or Kill", "Pick Top 3", "Devil's Advocate", "Opend Ended..."];
	private subCategoriesForSeed: any = ["Real", "Fiction", "Male", "Female"];
	private tagsForSeed: any = [
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
		"Movies",
		"Movie Fights",
		"Comics"
	];
	constructor(private afdb: AngularFireDBService, private guid: GuidService, private logger: LoggingService) {}
	// testSeed() {
	// 	for (var i = 0; i < this.categoriesForSeed.length; i++) {
	// 		var categoryTitle = this.categoriesForSeed[i];
	// 		var newCategory = new Category();

	// 		newCategory.id = this.guid.newGuid();
	// 		newCategory.title = categoryTitle;
	// 		this.afdb
	// 			.upload("test-1", newCategory)
	// 			.then(() => {
	// 				this.logger.log(newCategory, "Uploaded Test: ");
	// 			})
	// 			.catch(error => {
	// 				this.logError(error);
	// 			});
	// 	}
	// }
	uploadCategories() {
		for (var i = 0; i < this.categoriesForSeed.length; i++) {
			var categoryTitle = this.categoriesForSeed[i];
			var newCategory = new Category(this.guid.newGuid(), true);
			newCategory.title = categoryTitle;

			this.afdb
				.upload("Categories", newCategory, "category")
				.then(() => {
					this.logger.log("Uploaded Cat: ", newCategory);
				})
				.catch(error => {
					this.logError(error);
				});
		}
	}
	uploadSubCategories() {
		for (var i = 0; i < this.subCategoriesForSeed.length; i++) {
			var subCategoryTitle = this.subCategoriesForSeed[i];
			var newSubCategory = new SubCategory(this.guid.newGuid(), true);
			newSubCategory.title = subCategoryTitle;

			this.afdb
				.upload("SubCategories", newSubCategory, "subCategory")
				.then(() => {
					this.logger.log("Uploaded SubCat: ", newSubCategory);
				})
				.catch(error => {
					this.logError(error);
				});
		}
	}
	uploadTags() {
		for (var i = 0; i < this.tagsForSeed.length; i++) {
			var tagTitle = this.tagsForSeed[i];
			var newTag = new Tag(this.guid.newGuid(), true);
			newTag.title = tagTitle;

			this.afdb
				.upload("Tags", newTag, "tag")
				.then(() => {
					this.logger.log("Uploaded Tag: ", newTag);
				})
				.catch(error => {
					this.logError(error);
				});
		}
	}

	private logError(error) {
		throw Error("Firebase Seeding Error: ");
	}
}
