import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { environment } from '../../environments/environment';
import { SlokaListComponent } from '../sloka-list/sloka-list.component';
import { CommonModule } from '@angular/common';
import { ContentService } from '../services/content.service';
import { UtilityService } from '../services/utility.service';
import { isPlatformBrowser } from '@angular/common';
import { SlokaComponent } from '../sloka/sloka.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css'],
  imports: [SlokaListComponent, CommonModule,
    SlokaComponent, FormsModule]
})
export class ChaptersComponent implements OnInit {
  chapterId: number = 0;
  chapters = environment.chapters;
  chapterName: string = '';
  showChapterView: boolean = true;
  showSlokaView: boolean = false;
  slokaTitle: string = '';
  slokaCount: number = 0;
  windowWidth: number = 0;
  slokaId: number = 0;
  showSanskrit: boolean = false;
  fontSize: number = 16;
  chapterAudioSrc: string = '';
  chapterResource: string = '';
  chapterTamilResource: string = '';
  showReferences: boolean = false;
  references: string[] = environment.references;
  isDropdownOpen: boolean = false;

  constructor(private contentService: ContentService,
    private utilityService: UtilityService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
      this.showSlokas(this.chapters[0]); // Set default chapter selection
      this.adjustChapterView(this.windowWidth);
    }
    this.showReferences = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = event.target.innerWidth;
      this.adjustChapterView(this.windowWidth);
    }
  }

  private adjustChapterView(width: number): void {
    this.showChapterView = width >= 768; // Show chapter view on desktop/tablets, hide on mobile
  }

  toggleMenu(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.windowWidth < 768) {
        this.showChapterView = !this.showChapterView;
      }
    }
  }

  showSlokas(chapter: any): void {
    this.chapterId = chapter.id;
    this.chapterName = this.showSanskrit ? chapter.sanskrit : chapter.english;
    this.slokaCount = chapter.slokaCount;
    this.showSlokaView = false;
    this.chapterAudioSrc = this.utilityService.getChapterAudioURL(this.chapterId);
    this.chapterResource = this.utilityService.getChapterResource(this.chapterId, this.showSanskrit);
    this.chapterTamilResource = this.utilityService.getChapterTamilResource(this.chapterId);
    if (isPlatformBrowser(this.platformId) && this.windowWidth < 768) {
      this.showChapterView = false;
    }
  }

  showSloka(slokaIndex: number): void {
    this.slokaId = slokaIndex;
    this.showSlokaView = true;
  }

  backToSlokaList(): void {
    this.showSlokaView = false;
  }

  toggleSanskrit(): void {
    this.showSanskrit = !this.showSanskrit;
    this.chapterResource = this.utilityService.getChapterResource(this.chapterId, this.showSanskrit);
  }

  getChapterName(chapter: any): string {
    return this.utilityService.getChapterName(chapter.id, this.showSanskrit);
  }

  hideChapterOverlay(): void {
    if (this.windowWidth < 768) {
      this.showChapterView = false;
    }
  }

  increaseFontSize(): void {
    this.fontSize += 2;
  }

  decreaseFontSize(): void {
    this.fontSize -= 2;
  }

  getApplicationTitle(): string {
    return this.utilityService.getApplicationTitle(this.showSanskrit);
  }

  openReferences(): void {
    this.showReferences = true;
  }

  closeReferences(): void {
    this.showReferences = false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Close the dropdown if the click is outside the dropdown
    if (!target.closest('.dropdown')) {
      this.isDropdownOpen = false;
    }
  }
}
