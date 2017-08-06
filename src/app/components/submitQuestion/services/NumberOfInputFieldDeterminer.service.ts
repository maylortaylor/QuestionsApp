import { Injectable } from "@angular/core";
import { Question } from "../../../models/question.model";
import { Category } from "../../../models/category.model";

@Injectable()
export class NumberOfInputFieldDeterminerService {
	constructor() {}

	public determineNumberOfInputFields(question: Question): number {
		if (!!question.category) {
			if (question.category.numberOfChoices > 1 && question.category.numberOfChoices != Number.MAX_VALUE) {
				return question.category.numberOfChoices;
			}
			return question.category.numberOfChoices;
		}
	}
}
