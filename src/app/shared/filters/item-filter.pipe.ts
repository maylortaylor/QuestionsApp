import { Pipe, PipeTransform } from "@angular/core";

import * as _ from "lodash";

@Pipe({
	name: "itemFilter",
	pure: true
})
export class ItemFilterPipe implements PipeTransform {
	// Example: | tagFilter:'tags': tagFilteringArray)
	// items == ngFor array list
	// property == property of object to deep-search into
	// array == array of filtered items on component
	transform(items: any[], property: any, array: any[]): any {
        var filteredItems = [];

        if (!items.length) {
			return items;
		}

		if (!!items.length) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];

				if (!array || array.length === 0) {
					filteredItems.push(item);
				}

				for (var s in item[property]) {
                    if (!!item[property][s]) {
                        if (array.indexOf(item[property][s]) !== -1) {
                            if (filteredItems.indexOf(item) === -1) {
                                filteredItems.push(item);
                            }
                        }
                    }
                }

			}
        }

		return filteredItems;
	}

}
