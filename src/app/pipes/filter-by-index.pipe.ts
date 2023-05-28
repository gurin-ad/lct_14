import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filterByIndex'
})
export class FilterByIndexPipe implements PipeTransform {

	transform(items: any[], index: number): any[] {
		if (!items) return []; // если массив пустой, возвращаем пустой массив
		if (!index) return items; // если индекс не задан, возвращаем исходный массив
		console.log(`pipe`, items, index);
		return items.filter((item, i) => i !== index); // иначе фильтруем массив по индексу
	}

}
