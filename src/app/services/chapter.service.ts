import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  private chaptersSubject = new BehaviorSubject<any[]>([]); // BehaviorSubject to store chapters
  private chaptersLoaded = false; // Flag to track if chapters are already loaded

  constructor() {}

  // Fetch chapters from the environment JSON content
  fetchChapters(): Observable<any[]> {
    if (this.chaptersLoaded) {
      // If chapters are already loaded, return the cached data as an Observable
      return this.chaptersSubject.asObservable();
    }

    // Load chapters from the environment JSON content
    const chapters = environment.chapters;
    this.chaptersSubject.next(chapters); // Update the BehaviorSubject
    this.chaptersLoaded = true; // Mark chapters as loaded
    return of(chapters); // Return the chapters as an Observable
  }

  // Get the chapters as an Observable
  getChaptersObservable(): Observable<any[]> {
    return this.chaptersSubject.asObservable();
  }

  // Get the current value of chapters synchronously
  getChapters(): Observable<any[]> {
    return this.chaptersSubject.asObservable(); // Directly return the chapters as an Observable
  }
}