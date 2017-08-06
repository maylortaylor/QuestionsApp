import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MomentModule } from "angular2-moment";

// import { Ng4DropdownModule } from "ng4-material-dropdown";
import { MaterializeModule } from "angular2-materialize";
import { CommonModule } from "@angular/common";
import { SubmitQuestionComponent } from "./submitQuestion/submitQuestion.component";
import { QuestionListComponent } from "./questionList/questionList.component";

import { MultiInputLabelDeterminerService } from "./submitQuestion/services/MultiInputLabelDeterminer.service";

@NgModule({
	imports: [CommonModule, BrowserModule, FormsModule, MaterializeModule, MomentModule],
	declarations: [SubmitQuestionComponent, QuestionListComponent],
	providers: [MultiInputLabelDeterminerService]
})
export class ComponentsModule {}
