import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { text } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) {}

  getContent(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }
}
