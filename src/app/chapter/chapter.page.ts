import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ContentService } from '../services/content.service';
import { environment } from '../../environments/environment';
import { UtilityService } from '../services/utility.service';
import { SlokaListComponent } from '../sloka-list/sloka-list.component';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.page.html',
  styleUrls: ['./chapter.page.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, SlokaListComponent],
})

export class ChapterPage implements OnInit {
  chapterId!: number;
  chapterTitle!: string;
  contentArray: string[] = [];
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  constructor(private contentService: ContentService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.chapterId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.chapterTitle = this.utilityService.getChapterName(this.chapterId);
    const slokaCount: number = this.utilityService.getSlokaCount(this.chapterId);
    for (let index = 1; index <= slokaCount; index++) {
      const slokaURL: string = this.utilityService.getSlokaURL(this.chapterId, index, 'english');
      this.contentService.getContent(slokaURL).subscribe((data: string) => {
        this.contentArray[index - 1] = data;
      });
    }
  }
  onItemClicked(index: number) {
    // Navigate to the desired page with the index
    this.router.navigate([`/chapter/${this.chapterId}/sloka/${index + 1}`]);
  }
}

