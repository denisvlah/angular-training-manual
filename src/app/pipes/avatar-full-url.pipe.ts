import { inject, Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'avatarFullUrl'
})
export class AvatarFullUrlPipe implements PipeTransform {

  transform(value: string | null | undefined, ...args: unknown[]): string | null {
    const basePath = environment.API_BASE_PATH
    if (value) {
      return `${basePath}${value}`
    }
    return value || null
  }

}
