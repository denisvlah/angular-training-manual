import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarFullUrl'
})
export class AvatarFullUrlPipe implements PipeTransform {

  transform(value: string | null, ...args: unknown[]): string | null {
    if (value) {
      return `https://icherniakov.ru/yt-course/${value}`
    }
    return value
  }

}
