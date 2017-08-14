import { NgModule } from "@angular/core";
import { SearchFilterPipe } from "./search-filter.pipe";
import { CollectionFilterPipe } from "./collection-filter.pipe";
import { CategoryFilterPipe } from "./category-filter.pipe";

@NgModule({
	imports: [],
	exports: [SearchFilterPipe, CollectionFilterPipe],
	declarations: [SearchFilterPipe, CollectionFilterPipe],
	providers: [SearchFilterPipe, CollectionFilterPipe]
})
export class FilterModule {
	// static forRoot() {
	// 	return {
	// 		ngModule: FilterModule,
	// 		providers: []
	// 	};
	// }
}
