import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChaptersComponent } from './chapters/chapters.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChaptersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'gita-app';
}
