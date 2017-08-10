import { NgModule } from "@angular/core";
import { SearchFilterPipe } from "./search-filter.pipe";

@NgModule({
	imports: [],
	exports: [],
	declarations: [SearchFilterPipe],
	providers: [SearchFilterPipe]
})
export class FilterModule {
	// static forRoot() {
	// 	return {
	// 		ngModule: FilterModule,
	// 		providers: []
	// 	};
	// }
}
