import { Pipe, PipeTransform } from "@angular/core";
import { DateAndTimeService } from "./common.module";

@Pipe({
    name: 'CutPostCharactersPipe'
})
export class CutPostCharactersPipe implements PipeTransform {
    transform(text: string) {
        if (text.length <= 300) {
            return text.substring(0, 300);
        } else {
            return text.substring(0, 300) + '(...)';
        }
    }
}

@Pipe({
    name: 'CutCommentCharactersPipe'
})
export class CutCommentCharactersPipe implements PipeTransform {
    transform(text: string) {
        if (text.length <= 100) {
            return text.substring(0, 100);
        } else {
            return text.substring(0, 100) + '(...)';
        }
    }
}

@Pipe({
    name: 'FormatBackendDatePipe'
})
export class FormatBackendDatePipe implements PipeTransform {

    constructor(
        private dateService: DateAndTimeService
    ) { }

    transform(dateBackend: string) {
        return this.dateService.getFormattedDate(dateBackend);
    }
}