import { Injectable } from "@angular/core";

@Injectable()
export class MultiInputLabelDeterminerService {
	constructor() {}
	determineFuckMaryKill(category, index) {
		switch (index) {
			case 0:
				return "Fuck";
			case 1:
				return "Marry";
			case 2:
				return "Kill";
		}
	}
	determinePickTop3(category, index) {
		switch (index) {
			case 0:
				return "Choice 1";
			case 1:
				return "Choice 2";
			case 2:
				return "Choice 3";
		}
	}
	determinePickTop5(category, index) {
		switch (index) {
			case 0:
				return "Choice 1";
			case 1:
				return "Choice 2";
			case 2:
				return "Choice 3";
			case 3:
				return "Choice 4";
			case 4:
				return "Choice 5";
		}
	}
}
