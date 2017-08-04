import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { LoggingService } from "../logging/logging.service";

import * as StackTrace from "./stack-trace.min";

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
	constructor(private logger: LoggingService, private location: LocationStrategy) {
		super();
	}
	handleError(error) {
		const message = error.message ? error.message : error.toString();
		const url = location instanceof PathLocationStrategy ? location.path() : "";
		// get the stack trace, lets grab the last 10 stacks only
		StackTrace.fromError(error).then(stackframes => {
			const stackString = stackframes
				.splice(0, 20)
				.map(function(sf) {
					return sf.toString();
				})
				.join("\n");

			// log it somewhere
			this.logger.log(message, `URL: ${url} ------ Stack: ${stackString}`);
			// console.log({ message, url, stack: stackString });
		});
		throw error;
	}
}
