import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat',
})
export class MomentPipe implements PipeTransform {
  transform(
    value: Date | moment.Moment | string | undefined,
    dateFormat: string
  ): any {
    return moment(value).format(dateFormat);
  }
}
