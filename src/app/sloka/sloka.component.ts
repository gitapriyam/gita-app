import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { ContentService } from '../services/content.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sloka',
  templateUrl: './sloka.component.html',
  styleUrls: ['./sloka.component.css'],
  imports: [FormsModule, CommonModule]
})
export class SlokaComponent implements OnChanges {
  @Input() slokaId: number = 1;
  @Input() chapterId: number = 0;
  @Input() showSanskrit: boolean = false;
  slokaMeaning!: string;
  slokaAudioSrc!: string;  

  constructor(private utilityService: UtilityService,
    private contentService: ContentService) { }

  ngOnInit(): void {
    this.updateSlokaContent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slokaId']) {
      this.updateSlokaContent();
    }
  }

  updateSlokaContent(): void {
    const meaningURL = this.utilityService.getSlokaURL(this.chapterId, this.slokaId, 'meaning');
    this.contentService.getContent(meaningURL).subscribe(content => {
      this.slokaMeaning = content;
    });

    this.slokaAudioSrc = this.utilityService.getSlokaAudioURL(this.chapterId, this.slokaId);   
  }

  getSlokaTitle(index: number): string {
    return this.utilityService.getSlokaTitle(index, this.showSanskrit );
  }
}
