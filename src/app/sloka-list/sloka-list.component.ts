import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-card-list',
  templateUrl: './sloka-list.component.html',
  styleUrls: ['./sloka-list.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class SlokaListComponent {
  @Input() items: string[] = [];
  @Output() itemClicked = new EventEmitter<number>();

  onItemClicked(index: number) {
    this.itemClicked.emit(index);
  }
}
