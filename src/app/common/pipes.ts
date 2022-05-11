import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'CutTextCharactersPipe'
  })
export class CutTextCharactersPipe implements PipeTransform {
    transform(text: string) {
        return text.substring(0,400) + ' (...)';
    }
}