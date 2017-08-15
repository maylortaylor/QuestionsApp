import { UserStylingModel } from "./userStyling.model";

export class UserModel {
	email: string;
	password: string;
	username: string;
	dateCreated: string;
	favorites: Array<string>;
	submittedQuestions: Array<string>;
	upvotedQuestions: Array<string>;

	styling: UserStylingModel;

	// Google Auth Variables
	uid: string;
	emailVerified: boolean;
	displayName: string;
	photoUrl: string;
	refreshToken: string;

	constructor() {
		this.styling = new UserStylingModel();
	}
}
