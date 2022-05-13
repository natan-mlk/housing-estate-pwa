import { Pipe, PipeTransform } from "@angular/core";
import { DateAndTimeService } from "./common.module";

@Pipe({
    name: 'CutPostCharactersPipe'
})
export class CutPostCharactersPipe implements PipeTransform {
    transform(text: string) {
        if (text.length <= 400) {
            return text.substring(0, 400);
        } else {
            return text.substring(0, 400) + '(...)';
        }
    }
}

@Pipe({
    name: 'CutCommentCharactersPipe'
})
export class CutCommentCharactersPipe implements PipeTransform {
    transform(text: string) {
        if (text.length <= 200) {
            return text.substring(0, 200);
        } else {
            return text.substring(0, 200) + '(...)';
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