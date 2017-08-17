import { Injectable } from "@angular/core";
import { Category } from "../../../models/category.model";
import { CategoryType } from "../../../models/enums/categoryType.enum";
@Injectable()
export class QuestionLabelDeterminerService {
	constructor() {}
	public multipleInputFields(category: Category, index: number): string {
		switch (category.type) {
			case CategoryType.FuckMarryKill:
				return "Fuck, Mary, or Kill";
			case CategoryType.Pick3:
				return "What are your top 3";
			case CategoryType.Pick5:
				return "What are your top 5";
			case CategoryType.WouldYouRather:
				if (index == 0) {
					return "Do this...";
				} else {
					return "Or do this...";
				}
		}
	}
	public singleInputField(category: Category, index: number): string {
		switch (category.type) {
			case CategoryType.DevilsAdvocate:
				return "Question";
			case CategoryType.OpenEnded:
				return "Question";
			case CategoryType.PickFavorite:
				return "What is your favorite ..";
			case CategoryType.Pick3:
				return "What are your top 3 ";
			case CategoryType.FuckMarryKill:
				return "Give three options for Fuck, Marry, or Kill";
			case CategoryType.WouldYouRather:
				return "Would you rather ";
			default:
				return "Ouestion";
		}
	}
	public getQuestionLabel(category: Category): string {
		switch (category.type) {
			case CategoryType.DevilsAdvocate:
				return "Question";
			case CategoryType.OpenEnded:
				return "Question";
			case CategoryType.PickFavorite:
				return "What is your favorite..";
			case CategoryType.Pick3:
				return "What are your top 3..";
			case CategoryType.Pick5:
				return "What are your top 5..";
			case CategoryType.FuckMarryKill:
				return "Give three choices for Fuck, Marry, or Kill";
			case CategoryType.WouldYouRather:
				return "Would you rather ";
			default:
				return "Ouestion";
		}
	}
	private determineFuckMaryKill(category: Category, index: number): string {
		switch (index) {
			case 0:
				return "Fuck";
			case 1:
				return "Marry";
			case 2:
				return "Kill";
		}
	}
	private determinePickTop3(category: Category, index: number): string {
		switch (index) {
			case 0:
				return "Choice 1";
			case 1:
				return "Choice 2";
			case 2:
				return "Choice 3";
		}
	}
	private determinePickTop5(category: Category, index: number): string {
		switch (index) {
			case 0:
				return "Choice 1";
			case 1:
				return "Choice 2";
			case 2:
				return "Choice 3";
			case 3:
				return "Choice 4";
			case 4:
				return "Choice 5";
		}
	}
}
