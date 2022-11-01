import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ 
    name: 'shorten',
    pure: false
})
export class ShortenPipe implements PipeTransform {
    
    transform(value: any, ...args: any[]) {
        return value.substr(0, +args[0]) + ' ...';
    }

}
