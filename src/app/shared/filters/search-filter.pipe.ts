import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "searchFilter",
	pure: true
})
export class SearchFilterPipe implements PipeTransform {
	transform(items: any, keys: string, term: string): any {
		if (!term) return items;
		var foundObject = (items || [])
			.filter(item => keys.split(",").some(key => item.hasOwnProperty(key) && new RegExp(term, "gi").test(item[key])));

		// console.log("Found Object", foundObject);
		return foundObject;
	}
	// transform(items: any[], term: string, value: any): any[] {
	// 	if (!term) return items;
	// 	return items.filter(item => {
	// 		return Object.keys(item).some(k => {
	// 			// item is single object in list
	// 			// k is each property of the object
	// 			// -typeof item[k] == "string"- looks for only properties that are strings
	// 			// (does not look into arrays or objects of the item)
	// 			if (item[k] != null && item[k] != undefined && typeof item[k] == "string")
	// 				return item[k].toLowerCase().includes(term.toLowerCase());
	// 		});
	// 	});
	// }
}
