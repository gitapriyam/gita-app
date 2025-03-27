import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlokaService {

  constructor(private http: HttpClient) { }

  getSlokaData(url: string): Observable<any> {    
    return this.http.get<any>(url);
  }

  findSlokaById(url: string, slokaId: number, isSanskrit: boolean): Observable<number[]> {
    return this.getSlokaData(url).pipe(
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

  isSlokaGroupReady(isProduction: boolean, readiness: Readiness ): boolean {
    if (isProduction) {
      return isProduction && readiness.production;
    }
    return !isProduction && readiness.development;
  }
}

export interface Readiness {
  production: boolean;
  development: boolean;
}