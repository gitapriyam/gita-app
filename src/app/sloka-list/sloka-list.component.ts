import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../services/content.service';
import { UtilityService } from '../services/utility.service';
import { FormsModule } from '@angular/forms';
import { SlokaComponent } from '../sloka/sloka.component';
@Component({
  selector: 'app-sloka-list',
  templateUrl: './sloka-list.component.html',
  styleUrls: ['./sloka-list.component.css'],
  imports: [CommonModule, FormsModule, SlokaComponent]
})
export class SlokaListComponent implements OnChanges {
  @Input() chapterId: number = 0;
  @Input() chapterName: string = '';
  @Input() slokaCount: number = 0;
  @Input() showSanskrit: boolean = false;
  @Output() sanskritToggled = new EventEmitter<boolean>();
  @Output() showSloka = new EventEmitter<number>();
  slokas: string[] = [];
  expandedSloka: number | null = null;

  constructor(private contentService: ContentService, 
    private utilityService: UtilityService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chapterId'] || changes['showSanskrit'] || changes['chapterName']) {
      this.loadSlokas();
    }
  }

  loadSlokas(): void {
    this.expandedSloka = null;
    this.slokas = [];
    this.chapterName = this.utilityService.getChapterName(this.chapterId, this.showSanskrit);
    const language = this.showSanskrit ? 'sanskrit' : 'english';
    for (let index = 1; index <= this.slokaCount; index++) {
      const slokaURL: string = this.utilityService.getSlokaURL(this.chapterId, index, language);
      this.contentService.getContent(slokaURL).subscribe((data: string) => {
        this.slokas[index - 1] = data;
      });
    }
  }

  onSlokaClick(index: number): void {
    this.showSloka.emit(index);
  }

  onToggleSanskrit(): void {
    this.showSanskrit = !this.showSanskrit;
    this.sanskritToggled.emit(this.showSanskrit);
    this.loadSlokas();
  }

  getSlokaTitle(index: number): string {
    return this.utilityService.getSlokaTitle(index, this.showSanskrit);
  }

  toggleSloka(slokaIndex: number): void {
    this.expandedSloka = this.expandedSloka === slokaIndex ? null : slokaIndex;
  }  
}
