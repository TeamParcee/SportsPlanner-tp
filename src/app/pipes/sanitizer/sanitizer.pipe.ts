import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SanitizerPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value) {

    let cleanUrl = this.sanitizer.bypassSecurityTrustResourceUrl(value);
    console.log(cleanUrl);
    return cleanUrl;
  }

}
