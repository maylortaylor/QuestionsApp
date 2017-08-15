import { NgModule } from "@angular/core";
import { SearchFilterPipe } from "./search-filter.pipe";
import { CollectionFilterPipe } from "./collection-filter.pipe";
import { ItemFilterPipe } from "./item-filter.pipe";
import { CategoryFilterPipe } from "./category-filter.pipe";

@NgModule({
	imports: [],
	exports: [SearchFilterPipe, CollectionFilterPipe, ItemFilterPipe],
	declarations: [SearchFilterPipe, CollectionFilterPipe, ItemFilterPipe],
	providers: [SearchFilterPipe, CollectionFilterPipe, ItemFilterPipe]
})
export class FilterModule {
	// static forRoot() {
	// 	return {
	// 		ngModule: FilterModule,
	// 		providers: []
	// 	};
	// }
}
