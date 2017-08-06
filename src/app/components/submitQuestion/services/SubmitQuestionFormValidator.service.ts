import { Injectable } from "@angular/core";
import { Question } from "../../../models/question.model";
import { NumberOfInputFieldDeterminerService } from "./NumberOfInputFieldDeterminer.service";

@Injectable()
export class SubmitQuestionFormValidatorService {
	constructor(private inputCount: NumberOfInputFieldDeterminerService) {}

	public isSubmitQuestionFormValid(question: Question): boolean {
		var numberOfInputFields: number = this.inputCount.determineNumberOfInputFields(question);

		if (numberOfInputFields > 1) {
			switch (question.questionItems.length) {
				case 3:
					return this.checkAllInputs(question.questionItems, numberOfInputFields);
				case 5:
					return this.checkAllInputs(question.questionItems, numberOfInputFields);
			}
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
