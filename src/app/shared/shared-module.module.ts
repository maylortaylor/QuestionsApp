import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorHandlerModule } from "./errorHandler/errorHandler.module";
import { AngularFireModule } from "./angular-fire/angularFire.module";

import { AuthService } from "./auth/auth.service";
import { SearchService } from "./filters/search.service";
import { GuidService } from "./guid/guid.service";
import { LoggingService } from "./logging/logging.service";
import { ToastService } from "./toasts/toast.service";

import { FilterModule } from "./filters/filter.module";
import { SearchFilterPipe } from "./filters/search-filter.pipe";

@NgModule({
	imports: [CommonModule, ErrorHandlerModule, AngularFireModule],
	declarations: [],
	providers: [AuthService, SearchService, GuidService, LoggingService, ToastService]
})
export class SharedModule {}
