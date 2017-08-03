import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchFilterPipe } from "./filters/search-filter.pipe";
import { AuthService } from "./auth/auth.service";
import { SearchService } from "./filters/search.service";
import { GuidService } from "./guid/guid.service";

@NgModule({
	imports: [CommonModule],
	declarations: [SearchFilterPipe],
	providers: [AuthService, SearchService, GuidService]
})
export class SharedModule {}
