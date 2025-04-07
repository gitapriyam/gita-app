import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SlokaListComponent } from './sloka-list/sloka-list.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SlokaComponent } from './sloka/sloka.component';
import { FormsModule } from '@angular/forms';
import { ChapterService } from './services/chapter.service';

export function initializeChapters(chapterService: ChapterService): () => Promise<void> {
  return () =>
    new Promise((resolve) => {
      chapterService.fetchChapters().subscribe(() => {
        resolve(); // Resolve the promise once chapters are loaded
      });
    });
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    AppComponent,
    SlokaListComponent,
    ChaptersComponent,
    SlokaComponent,
    FormsModule
  ],
  providers: [
    provideHttpClient(withFetch())
  ]
})
export class AppModule { }

