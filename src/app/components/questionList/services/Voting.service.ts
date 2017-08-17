import { Injectable } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

import { Question } from "../../../models/question.model";
import { Status } from "../../../models/enums/status.enum";
import { Action } from "../../../models/enums/action.enum";

import { UserService } from "../../../core/user-service/user.service";
import { AngularFireDBService } from "../../../shared/angular-fire/angular-fire-db.service";
import { ToastService } from "../../../shared/toasts/toast.service";
import { LoggingService } from "../../../shared/logging/logging.service";

@Injectable()
export class VotingService {
	numberOfVotesToChangeStatus: number = 20;
	constructor(
		private userService: UserService,
		private afdb: AngularFireDBService,
		private toast: ToastService,
		private logger: LoggingService
	) {}

	public upVote(question: Question) {
		var wonUpVote = response => {
			this.logger.log("WON Up Vote: ", response);
			this.checkQuestionSubmissionStatus(question);
			this.trackUsersAction("upvotes", question);
		};
		var lostUpVote = response => {
			this.logger.log("LOST Up Vote: ", response);
			this.toast.fail("Whoopsee! We couldn't do that");
		};
		this.afdb.registerAction("Submissions", Action.UpVote, question).then(wonUpVote).catch(lostUpVote);
	}
	public downVote(question: Question) {
		var wonDownVote = response => {
			this.logger.log("WON Down Vote: ", response);
			this.checkQuestionSubmissionStatus(question);
			this.trackUsersAction("downvotes", question);
		};
		var lostDownVote = response => {
			this.logger.log("LOST Down Vote: ", response);
			this.toast.fail("Whoopsee! We couldn't do that");
		};
		this.afdb.registerAction("Submissions", Action.DownVote, question).then(wonDownVote).catch(lostDownVote);
	}

	private trackUsersAction(action: string, question: Question) {
		var user = this.userService.getCurrentUser();
		if (!!user) {
			var wonTrackUserAction = response => {
				this.logger.log("WON TrackUserAction: ", response);
			};
			var lostTrackUserAction = response => {
				this.logger.log("LOST TrackUserAction: ", response);
			};
			this.afdb.uploadUserItem(action, question).then(wonTrackUserAction).catch(lostTrackUserAction);
		}
	}

	private checkQuestionSubmissionStatus(question: Question) {
		var submission = this.afdb.getByIdFromArea("Submissions", question.id).subscribe(question => {
			if (question.upVotes > this.numberOfVotesToChangeStatus) {
				question.status = Status.Active;
			}
			if (question.downVotes > this.numberOfVotesToChangeStatus) {
				question.status = Status.Deleted;
			}

			this.afdb.update("Submissions", question);
		});
	}
}
