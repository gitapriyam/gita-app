import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { remoteResource } from '../models/remote-resource.model'; // Import the interface
import { SlokaData } from '../models/sloka-data.model'; // Import the interface
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Example: Fetch sloka data
  getSloka(chapterId: number, slokaIndex: number, content: string): Observable<any> {
    const url = `api/sloka/${chapterId}/${slokaIndex}?content=${content}`;
    return this.http.get<SlokaData>(url);
  }

  getSlokaAudio(chapterId: number, slokaIndex: number): Observable<remoteResource> {
    const url = `api/slokaAudio/${chapterId}/${slokaIndex}`;
    return this.http.get<remoteResource>(url);
  }

  getSlokaGroupData(chapterId: number): Observable<any> {
    const url = `api/slokaGroups/${chapterId}`;
    return this.http.get<any>(url);
  }

  getChapters(): Observable<any> {
    const url = `api/chapters`;
    return this.http.get<any>(url);
  }

  getChapterAudio(chapterId: number): Observable<remoteResource> {
    const url = `api/chapterAudio/${chapterId}`;
    return this.http.get<remoteResource>(url);
  }

  getChapterResource(chapterId: number, content: string): Observable<remoteResource> {
    const url = `api/chapterResource/${chapterId}?content=${content}`;
    return this.http.get<remoteResource>(url);
  }

}
