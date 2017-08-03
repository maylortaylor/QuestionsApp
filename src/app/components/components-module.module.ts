import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
// import { Ng4DropdownModule } from "ng4-material-dropdown";
import { MaterializeModule } from "angular2-materialize";
import { CommonModule } from "@angular/common";
import { SubmitQuestionComponent } from "./submit-question/submit-question.component";
import { QuestionListComponent } from "./question-list/question-list.component";

@NgModule({
	imports: [CommonModule, BrowserModule, FormsModule, MaterializeModule],
	declarations: [SubmitQuestionComponent, QuestionListComponent]
})
export class ComponentsModule {}
