import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hasShowMore'
})
export class HasShowMorePipe implements PipeTransform {
    transform(list: any[], count: number): boolean {
        return list.length < count;
    }
}
