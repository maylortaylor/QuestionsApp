import { Pipe, PipeTransform } from "@angular/core";

import * as _ from "lodash";

@Pipe({
	name: "collectionFilter",
	pure: true
})
export class CollectionFilterPipe implements PipeTransform {
	// Example: | tagFilter:'tags': tagFilteringArray)
	// items == ngFor array list
	// property == property of object to deep-search into
	// array == array of filtered items on component
	transform(items: any[], property: any, subProperty: any, array: any[]): any {
		var filteredItems = [];

		if (!array || !items.length) {
			return items;
		}

		if (!!items.length) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];

				if (!array || array.length === 0) {
					filteredItems.push(item);
				}

				for (var s in item[property]) {
					if (array.indexOf(item[property][s][subProperty]) !== -1) {
						if (filteredItems.indexOf(item) === -1) {
							filteredItems.push(item);
						}
					}
				}
			}
		}

		return filteredItems;
	}
}
