import { Component, OnInit } from "@angular/core";
import { Question } from "../../models/question.model";
import { LoggingService } from "../../shared/logging/logging.service";
import { AngularFireDBService } from "../../shared/angular-fire/angular-fire-db.service";

@Component({
	selector: "app-question-list",
	templateUrl: "./question-list.component.html",
	styleUrls: ["./question-list.component.less"]
})
export class QuestionListComponent implements OnInit {
	questions: Array<Question> = new Array<Question>();
	constructor(private afdb: AngularFireDBService, private logger: LoggingService) {}

	ngOnInit() {
		this.getQuestions();
	}
	getQuestions() {
		this.afdb.getAllFromArea("Submissions").subscribe(items => {
			for (var i = 0; i < items.length; i++) {
				var question = items[i];
				this.questions.push(question);
			}
		});
		this.logger.log("Questions", this.questions);
	}
}
