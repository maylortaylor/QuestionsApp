import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MomentModule } from "angular2-moment";
import { FormBuilder, Validators, NgForm } from "@angular/forms";

// import { Ng4DropdownModule } from "ng4-material-dropdown";
import { MaterializeModule } from "angular2-materialize";
import { CommonModule } from "@angular/common";

import { SubmitQuestionComponent } from "./submitQuestion/submitQuestion.component";
import { QuestionListComponent } from "./questionList/questionList.component";

import { MultiInputLabelDeterminerService } from "./submitQuestion/services/MultiInputLabelDeterminer.service";
import { SubmitQuestionFormValidatorService } from "./submitQuestion/services/SubmitQuestionFormValidator.service";
import { NumberOfInputFieldDeterminerService } from "./submitQuestion/services/NumberOfInputFieldDeterminer.service";

import { FilterModule } from "../shared/filters/filter.module";
import { SearchFilterPipe } from "../shared/filters/search-filter.pipe";

@NgModule({
	imports: [FilterModule, CommonModule, BrowserModule, FormsModule, MaterializeModule, MomentModule],
	declarations: [SubmitQuestionComponent, QuestionListComponent],
	providers: [
		FormBuilder,
		MultiInputLabelDeterminerService,
		SubmitQuestionFormValidatorService,
		NumberOfInputFieldDeterminerService
	]
})
export class ComponentsModule {}
