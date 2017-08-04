import { NgModule, ErrorHandler } from "@angular/core";
import { HttpModule } from "@angular/http";

import { GlobalErrorHandler } from "./globalErrorHandler.service";

@NgModule({
	declarations: [],
	exports: [],
	imports: [HttpModule],
	providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }]
})
export class ErrorHandlerModule {}
