import { Injectable } from "@angular/core";
import { AngularFireDBService } from "../angular-fire-db.service";
import { GuidService } from "../../guid/guid.service";
import { LoggingService } from "../../logging/logging.service";

import { Category } from "../../../models/category.model";
import { SubCategory } from "../../../models/subCategory.model";
import { Tag } from "../../../models/tag.model";
import { CategoryType } from "../../../models/enums/categoryType.enum";
import { Status } from "../../../models/enums/status.enum";

import * as moment from "moment";

@Injectable()
export class AngularFireDbSeeder {
	private categoriesForSeed: Array<Category> = [
		new Category(
			this.guid.newGuid(),
			true,
			"Would You Rather",
			null,
			Status.Platform,
			CategoryType.WouldYouRather,
			false,
			true,
			Number.MAX_VALUE,
			true
		),
		new Category(this.guid.newGuid(), true, "Fuck Mary Kill", null, Status.Platform, CategoryType.FuckMaryKill, false, true, 3, true),
		new Category(this.guid.newGuid(), true, "Pick Favorite", null, Status.Platform, CategoryType.PickFavorite, true, true, 1, true),
		new Category(this.guid.newGuid(), true, "Pick Top 3", null, Status.Platform, CategoryType.Pick3, true, true, 3, true),
		new Category(this.guid.newGuid(), true, "Pick Top 5", null, Status.Platform, CategoryType.Pick5, true, true, 5, true),
		new Category(this.guid.newGuid(), true, "Devil's Advocate", null, Status.Platform, CategoryType.DevilsAdvocate, false, false, 1, true),
		new Category(this.guid.newGuid(), true, "Open Ended...", null, Status.Platform, CategoryType.OpenEnded, false, false, 1, true)
	];
	private subCategoriesForSeed: Array<SubCategory> = [
		new SubCategory(this.guid.newGuid(), true, "Real", null, Status.Platform),
		new SubCategory(this.guid.newGuid(), true, "Fiction", null, Status.Platform),
		new SubCategory(this.guid.newGuid(), true, "Male", null, Status.Platform),
		new SubCategory(this.guid.newGuid(), true, "Female", null, Status.Platform)
	];
	private tagsForSeed: Array<Tag> = [
		new Tag(this.guid.newGuid(), true, "SFW", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "NSFW", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "PC (politically correct)", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "non-PC (not politically correct)", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "People", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "Places", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "Things", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "Politics", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "Religion", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "Nerd", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "Books", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "Music", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "Technology", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "Geek", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "Movies", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "Movie Fights", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "Comics", null, Status.Platform),
		new Tag(this.guid.newGuid(), true, "Food", null, Status.Platform)
	];
	constructor(private afdb: AngularFireDBService, private guid: GuidService, private logger: LoggingService) {}
	// testSeed() {
	// 	for (var i = 0; i < this.categoriesForSeed.length; i++) {
	// 		var category= this.categoriesForSeed[i];

	// 		this.afdb
	// 			.upload("test-1", category)
	// 			.then(() => {
	// 				this.logger.log(category, "Uploaded Test: ");
	// 			})
	// 			.catch(error => {
	// 				this.logError(error);
	// 			});
	// 	}
	// }
	uploadCategories() {
		for (var i = 0; i < this.categoriesForSeed.length; i++) {
			var cat = this.categoriesForSeed[i];

			this.afdb
				.upload("Categories", cat, "category")
				.then(() => {
					this.logger.log("Uploaded Cat: ", cat);
				})
				.catch(error => {
					this.logError(error);
				});
		}
	}
	uploadSubCategories() {
		for (var i = 0; i < this.subCategoriesForSeed.length; i++) {
			var subCategory = this.subCategoriesForSeed[i];

			this.afdb
				.upload("SubCategories", subCategory, "subCategory")
				.then(() => {
					this.logger.log("Uploaded SubCat: ", subCategory);
				})
				.catch(error => {
					this.logError(error);
				});
		}
	}
	uploadTags() {
		for (var i = 0; i < this.tagsForSeed.length; i++) {
			var tag = this.tagsForSeed[i];

			this.afdb
				.upload("Tags", tag, "tag")
				.then(() => {
					this.logger.log("Uploaded Tag: ", tag);
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
