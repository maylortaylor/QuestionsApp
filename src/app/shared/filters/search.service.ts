import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class SearchService {
	private text = new Subject<string>();
	public text$ = this.text.asObservable();

	addSearch(textToPublish: string) {
		this.text.next(textToPublish);
	}
}
