import { Routes } from '@angular/router';
import { ChapterPage } from './chapter/chapter.page';
import { SlokaComponent } from './sloka/sloka.component'; 

export const routes: Routes = [  
  { path: 'chapter/:id', component: ChapterPage },
  { path: 'chapter/:id/sloka/:slokaId', component: SlokaComponent },
  { path: '', redirectTo: 'chapter/0', pathMatch: 'full' },
  { path: '**', redirectTo: 'chapter/0' }
];
