import { Routes } from '@angular/router';
import { ChapterPage } from './chapter/chapter.page';
import { SlokaComponent } from './sloka/sloka.component'; 

export const routes: Routes = [  
  { path: 'chapter/:chapterId', component: ChapterPage },
  { path: 'chapter/:chapterId/sloka/:slokaId', component: SlokaComponent },
  { path: '', redirectTo: 'chapter/Dhyanam', pathMatch: 'full' },
  { path: '**', redirectTo: 'chapter/Dhyanam' }
];
