import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { ContentService } from '../services/content.service';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonMenuButton, IonBreadcrumbs, IonBreadcrumb, IonCard,
  IonCardHeader, IonCardContent
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-sloka',
  templateUrl: './sloka.component.html',
  styleUrls: ['./sloka.component.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonMenuButton, IonBreadcrumbs, IonBreadcrumb, IonCard,
    IonCardHeader, IonCardContent],
})
export class SlokaComponent implements OnInit {

  slokaId!: number 
  chapterId!: string;
  chapterName!: string;
  englishSloka!: string;
  sanskritSloka!: string;
  slokaMeaning!: string;
  slokaAudioSrc!: string;
  chapterAudioSrc!: string;
  chapterResource!: string;
  totalSlokas!: number;

  constructor(private activatedRoute: ActivatedRoute,
    private utilityService: UtilityService,
    private contentService: ContentService) { }

  ngOnInit() {
    this.chapterId = this.activatedRoute.snapshot.paramMap.get('chapterId')!;
    this.slokaId = +(this.activatedRoute.snapshot.paramMap.get('slokaId')!);
    this.chapterName = this.utilityService.getChapterName(this.chapterId);
    
    const index = this.utilityService.getChapterIndex(this.chapterId)
    const chapterIndex: string = this.utilityService.getLeftAppendedNumber(index);
    console.log(this.slokaId, this.chapterId, this.chapterName, chapterIndex);
    const slokaURL = this.utilityService.getSlokaURL(chapterIndex, this.utilityService.getLeftAppendedNumber(this.slokaId), 'english');
    this.contentService.getContent(slokaURL).subscribe(content => {
      this.englishSloka = content;
    });
    const sanskritSlokaURL = this.utilityService.getSlokaURL(chapterIndex, this.utilityService.getLeftAppendedNumber(this.slokaId), 'sanskrit');
    this.contentService.getContent(sanskritSlokaURL).subscribe(content => {
      this.sanskritSloka = content;
    });
    const meaningURL = this.utilityService.getSlokaURL(chapterIndex, this.utilityService.getLeftAppendedNumber(this.slokaId), 'meaning');
    this.contentService.getContent(meaningURL).subscribe(content => {
      this.slokaMeaning = content;
    });
    this.slokaAudioSrc = this.utilityService.getSlokaAudioURL(chapterIndex, this.utilityService.getLeftAppendedNumber(this.slokaId));
    this.chapterAudioSrc = this.utilityService.getChapterAudioURL(this.chapterName, chapterIndex);
    this.chapterResource = this.utilityService.getChapterResource(this.chapterName, chapterIndex);
    this.totalSlokas = this.utilityService.getTotalSlokas(this.chapterId);
  }

  hasNextSloka(): boolean {
    return this.slokaId + 1 <= this.totalSlokas;
  }
}
