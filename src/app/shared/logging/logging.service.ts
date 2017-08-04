import { Injectable } from "@angular/core";

@Injectable()
export class LoggingService {
	log(message: string = "Logger: ", itemToLog: any) {
		// console.log(itemToLog, message);
		console.log(message, itemToLog);
	}
}
