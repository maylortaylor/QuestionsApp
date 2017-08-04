import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorHandlerModule } from "./errorHandler/errorHandler.module";
import { AngularFireModule } from "./angular-fire/angularFire.module";

import { SearchFilterPipe } from "./filters/search-filter.pipe";
import { AuthService } from "./auth/auth.service";
import { SearchService } from "./filters/search.service";
import { GuidService } from "./guid/guid.service";
import { LoggingService } from "./logging/logging.service";

@NgModule({
	imports: [CommonModule, ErrorHandlerModule, AngularFireModule],
	declarations: [SearchFilterPipe],
	providers: [AuthService, SearchService, GuidService, LoggingService]
})
export class SharedModule {}
