import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlokaService {

  constructor(private http: HttpClient) { }

  getSlokaData(chapterId: number): Observable<any> {
    const url = `assets/data/chapter${chapterId}.json`;
    return this.http.get<any>(url);
  }

  findSlokaById(chapterId: number, slokaId: number, isSanskrit: boolean): Observable<number[]> {
    return this.getSlokaData(chapterId).pipe(
      map(data => {
        if (isSanskrit) {
          // Check sloka groups
          for (const group of data.groups) {
            if (group.slokas.includes(slokaId)) {
              return group.slokas;
            }
          }
        }

        // Treat other slokas as standalone
        return [slokaId];
      })
    );
  }
}
