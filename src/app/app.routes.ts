import { Routes } from '@angular/router';
import { ChapterPage } from './chapter/chapter.page';
import { SlokaComponent } from './sloka/sloka.component'; 

export const routes: Routes = [  
  { path: 'chapter/:id', component: ChapterPage },
  { path: 'sloka/:index', component: SlokaComponent },
  { path: '', redirectTo: 'chapter/Dhyanam', pathMatch: 'full' },
];
