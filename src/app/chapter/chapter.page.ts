import { Component, inject, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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
  public chapter!: string;
  public chapterTitle!: string;
  public contentArray: string[] = [];
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  constructor(private contentService: ContentService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.chapter = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.chapterTitle = this.getChapterTitle(this.chapter);
    const chapterNumber: string = this.utilityService.getChapterNumber(this.chapter);
    const slokaCount: number = this.utilityService.getNumberOfVerses(this.chapter);
    for (let i = 1; i <= slokaCount; i++) {
      const slokaIndex = this.utilityService.getLeftAppendedNumber(i);
      const slokaURL: string = this.utilityService.getSlokaURL(chapterNumber, slokaIndex, 'english'); 
      this.contentService.getContent(slokaURL).subscribe((data: string) => {
        this.contentArray.push(data);
      });
    }    
  }  
  onItemClicked(index: number) {
    // Navigate to the desired page with the index
    this.router.navigate(['/sloka', index, { chapterId: this.chapter }]);
  }
  getChapterTitle(chapterId: string): string {
    const page = environment.appPages.find(p => p.url.includes(chapterId));
    return page ? page.title : 'Chapter';
  }
}

