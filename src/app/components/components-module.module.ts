import { NgModule } from "@angular/core";
// import { Ng4DropdownModule } from "ng4-material-dropdown";

import { CommonModule } from "@angular/common";
import { SubmitQuestionComponent } from "./submit-question/submit-question.component";
import { QuestionListComponent } from './question-list/question-list.component';

@NgModule({
	imports: [CommonModule],
	declarations: [SubmitQuestionComponent, QuestionListComponent]
})
export class ComponentsModule {}
