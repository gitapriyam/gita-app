import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ChapterService } from './services/chapter.service';

// Function to initialize chapters
export function initializeChapters(chapterService: ChapterService): () => Promise<void> {
  return () =>
    new Promise((resolve) => {
      chapterService.fetchChapters().subscribe(() => {
        resolve(); // Resolve the promise once chapters are loaded
      });
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    ChapterService, // Ensure ChapterService is provided
    {
      provide: APP_INITIALIZER,
      useFactory: initializeChapters,
      deps: [ChapterService],
      multi: true
    }
  ]
};
