import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { ContentService } from '../services/content.service';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
  IonMenuButton, IonBreadcrumbs, IonBreadcrumb, IonCard,
IonCardHeader, IonCardContent } from '@ionic/angular/standalone';
@Component({
  selector: 'app-sloka',
  templateUrl: './sloka.component.html',
  styleUrls: ['./sloka.component.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonMenuButton, IonBreadcrumbs, IonBreadcrumb, IonCard,
    IonCardHeader, IonCardContent],
})
export class SlokaComponent  implements OnInit {

  public index!: number;
  public chapterId!: string;
  public chapterName!: string;
  public englishSloka!: string;
  public sanskritSloka!: string;
  public slokaMeaning!: string;
  public slokaAudioSrc!: string;
  public chapterAudioSrc!: string;
  public chapterResource!: string; 
  
  constructor(private activatedRoute: ActivatedRoute, 
    private utilityService: UtilityService,
    private contentService: ContentService) { }

  ngOnInit() {
    this.index = +this.activatedRoute.snapshot.paramMap.get('index')!;
    this.chapterId = this.activatedRoute.snapshot.paramMap.get('chapterId')!;
    this.chapterName = this.utilityService.getChapterName(this.chapterId);
    const chapterIndex: string = this.utilityService.getLeftAppendedNumber(this.utilityService.getChapterIndex(this.chapterId));
    const slokaURL = this.utilityService.getSlokaURL(chapterIndex, this.utilityService.getLeftAppendedNumber(this.index + 1 ), 'english');
    this.contentService.getContent(slokaURL).subscribe(content => {
      this.englishSloka = content;
    });
    const sanskritSlokaURL = this.utilityService.getSlokaURL(chapterIndex, this.utilityService.getLeftAppendedNumber(this.index + 1), 'sanskrit');
    this.contentService.getContent(sanskritSlokaURL).subscribe(content => {
      this.sanskritSloka = content;
    });
    const meaningURL = this.utilityService.getSlokaURL(chapterIndex, this.utilityService.getLeftAppendedNumber(this.index + 1), 'meaning');
    this.contentService.getContent(meaningURL).subscribe(content => {
      this.slokaMeaning = content;
    });
    this.slokaAudioSrc = this.utilityService.getSlokaAudioURL(chapterIndex, this.utilityService.getLeftAppendedNumber(this.index + 1));
    this.chapterAudioSrc = this.utilityService.getChapterAudioURL(this.chapterName, chapterIndex);
    this.chapterResource = this.utilityService.getChapterResource(this.chapterName, chapterIndex);
  }
}
