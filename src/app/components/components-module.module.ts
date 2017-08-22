import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MomentModule } from "angular2-moment";
import { FormBuilder, Validators, NgForm } from "@angular/forms";

// import { Ng4DropdownModule } from "ng4-material-dropdown";
import { MaterializeModule } from "angular2-materialize";
import { CommonModule, NgSwitch } from "@angular/common";

import { SubmitQuestionComponent } from "./submitQuestion/submitQuestion.component";
import { SavedQuestionListComponent } from "./savedQuestionList/savedQuestionList.component";
import { SubmissionListComponent } from "./submissionList/submissionList.component";

import { QuestionLabelDeterminerService } from "./submitQuestion/services/QuestionLabelDeterminer.service";
import { SubmitQuestionFormValidatorService } from "./submitQuestion/services/SubmitQuestionFormValidator.service";
import { NumberOfInputFieldDeterminerService } from "./submitQuestion/services/NumberOfInputFieldDeterminer.service";
import { VotingService } from "../components/submissionList/services/Voting.service";
import { QuestionActionService } from "../shared/questions/QuestionAction.service";
import { QuestionService } from "../shared/questions/Question.service";

import { FilterModule } from "../shared/filters/filter.module";
import { SearchFilterPipe } from "../shared/filters/search-filter.pipe";

@NgModule({
	imports: [FilterModule, CommonModule, BrowserModule, FormsModule, MaterializeModule, MomentModule],
	declarations: [SubmitQuestionComponent, SubmissionListComponent, SavedQuestionListComponent],
	providers: [
		FormBuilder,
		QuestionLabelDeterminerService,
		SubmitQuestionFormValidatorService,
		NumberOfInputFieldDeterminerService,
		VotingService,
		// QuestionActionService,
		// QuestionService
	]
})
export class ComponentsModule {}
