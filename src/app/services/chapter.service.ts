import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  private chaptersSubject = new BehaviorSubject<any[]>([]); // BehaviorSubject to store chapters
  private chaptersLoaded = false; // Flag to track if chapters are already loaded

  constructor(private apiService: ApiService) {}

  // Fetch chapters from the API (only if not already loaded)
  fetchChapters(): Observable<any[]> {
    if (this.chaptersLoaded) {
      // If chapters are already loaded, return the cached data as an Observable
      return this.chaptersSubject.asObservable();
    }

    // Fetch chapters from the API and update the BehaviorSubject
    return this.apiService.getChapters().pipe(
      tap((response: any) => {
        this.chaptersSubject.next(response.chapters); // Update the BehaviorSubject
        this.chaptersLoaded = true; // Mark chapters as loaded
      }),
      catchError((error) => {
        console.error('Error fetching chapters:', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }

  // Get the chapters as an Observable
  getChaptersObservable(): Observable<any[]> {
    return this.apiService.getChapters().pipe(
      map((response: any) => response.chapters || response) // Normalize the response
    );
  }

  // Get the current value of chapters synchronously
  getChapters(): any[] {
    return this.chaptersSubject.getValue();
  }
}