import { Injectable } from "@angular/core";
import { Question } from "../../../models/question.model";
import { NumberOfInputFieldDeterminerService } from "./NumberOfInputFieldDeterminer.service";

@Injectable()
export class SubmitQuestionFormValidatorService {
	constructor(private inputCount: NumberOfInputFieldDeterminerService) {}

	public isSubmitQuestionFormValid(question: Question): boolean {
		if (question.questionItems.length > 1) {
			return this.checkAllInputs(question.questionItems, question.questionItems.length);
		} else {
			return this.checkSingleInput(question);
		}
	}
	private checkSingleInput(question: Question): boolean {
		if (!!question.questionText && question.questionText.length > 10) {
			return true;
		} else {
			return false;
		}
	}
	private checkAllInputs(questionItems: Array<string>, countOfInputs: number) {
		for (var i = 0; i < countOfInputs; i++) {
			if (!!questionItems[i] && questionItems[i].length >= 3) {
				// has value, keep going
				continue;
			} else {
				// doesn't have value, return false
				return false;
			}
		}
		return true;
	}
}
