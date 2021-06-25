import { HttpEvent, HttpEventType, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { pipe } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

export function filterResponse<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    // map((response: HttpResponse<T>) => response.body)
    map((response: any) => response.body)
  );

}

export function uploadProgress<T>(callback: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      callback(
        event.total ? Math.round((event.loaded * 100) / event.total) : 0
      );
    }
  });
}
