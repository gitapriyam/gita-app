import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { ContentService } from '../services/content.service';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonMenuButton, IonBreadcrumbs, IonBreadcrumb, IonCard,
  IonCardHeader, IonCardContent, IonIcon
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-sloka',
  templateUrl: './sloka.component.html',
  styleUrls: ['./sloka.component.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle,
    IonContent, IonButtons, IonMenuButton, IonBreadcrumbs,
    IonBreadcrumb, IonCard, IonCardHeader, IonCardContent, IonIcon],
})
export class SlokaComponent implements OnInit {

  slokaId!: number
  chapterId!: number;
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
    private contentService: ContentService,
    private router: Router) { }

  ngOnInit() {
    this.chapterId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.slokaId = +(this.activatedRoute.snapshot.paramMap.get('slokaId')!);
    this.chapterName = this.utilityService.getChapterName(this.chapterId);

    const slokaURL = this.utilityService.getSlokaURL(this.chapterId, this.slokaId, 'english');
    this.contentService.getContent(slokaURL).subscribe(content => {
      this.englishSloka = content;
    });
    const sanskritSlokaURL = this.utilityService.getSlokaURL(this.chapterId, this.slokaId, 'sanskrit');
    this.contentService.getContent(sanskritSlokaURL).subscribe(content => {
      this.sanskritSloka = content;
    });
    const meaningURL = this.utilityService.getSlokaURL(this.chapterId, this.slokaId, 'meaning');
    this.contentService.getContent(meaningURL).subscribe(content => {
      this.slokaMeaning = content;
    });
    
    this.slokaAudioSrc = this.utilityService.getSlokaAudioURL(this.chapterId, this.slokaId);
    this.chapterAudioSrc = this.utilityService.getChapterAudioURL(this.chapterId);
    this.chapterResource = this.utilityService.getChapterResource(this.chapterId);
    this.totalSlokas = this.utilityService.getSlokaCount(this.chapterId);
  }

  hasNextSloka(): boolean {
    return this.slokaId + 1 <= this.totalSlokas;
  }

  hasPreviousSloka(): boolean {
    return this.slokaId > 1;
  }

  navigateToNextSloka() {
    if (this.hasNextSloka()) {
      this.router.navigate([`/chapter/${this.chapterId}/sloka/${this.slokaId + 1}`]);
    }
  }

  navigateToPreviousSloka() {
    if (this.hasPreviousSloka()) {
      this.router.navigate([`/chapter/${this.chapterId}/sloka/${this.slokaId - 1}`]);
    }
  }
}
