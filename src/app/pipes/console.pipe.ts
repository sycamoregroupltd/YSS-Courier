import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'console' }) // log variable into the console

export class ConsolePipe implements PipeTransform {
    transform($value: any, $title: string = '', $method: string = 'log') {
        console[$method]($title, $value);
        return '';
    }
}
