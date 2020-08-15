import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value): unknown {

    let hours = Math.floor(value / 60)
    let minutes = Math.floor(value % 60);
    let hourString = (hours == 0) ? ""  :  (hours == 1) ? hours + " hour" : hours +  " hours";
    let minuteString = (minutes == 0) ? "" : (minutes == 1) ? minutes +  " minute" : minutes +  " minutes"
    let time = hourString + " " + minuteString
    return time;
  }

}
