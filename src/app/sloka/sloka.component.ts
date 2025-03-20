import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { ContentService } from '../services/content.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // Import 'of' to provide fallback data
@Component({
  selector: 'app-sloka',
  templateUrl: './sloka.component.html',
  styleUrls: ['./sloka.component.css'],
  imports: [FormsModule, CommonModule]
})
export class SlokaComponent implements OnChanges {
  @Input() chapterId: number = 0;
  @Input() showSanskrit: boolean = false;
  @Input() slokaTitle: string = '';
  @Input() slokaGroup: number[] = [];
  @Input() showSandhi: boolean = false;
  @Input() groups: any[] = []; // Accept groups as an input
  slokaMeaning: string[] = [];
  slokaAudioSrc: string[] = [];
  sanskritSandhi: string = "";
  sanskritAnvaya: string = "";
  selectedSloka: number | null = null; // Track the selected sloka

  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(private utilityService: UtilityService,
    private contentService: ContentService) { }

  ngOnInit(): void {
    this.updateSlokaContent();
    if (this.slokaGroup.length > 0) {
      this.selectedSloka = this.slokaGroup[0]; // Default to the first sloka in the group
    }
  }

  ngAfterViewInit(): void {
    // Ensure the audioPlayer is initialized after the view is ready
    if (this.selectedSloka) {
      this.onSlokaChange(); // Update the audio source after the view is initialized
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slokaId'] || changes['showSanskrit'] || changes['showSandhi'] || changes['groups']) {
      this.updateSlokaContent();
    }
  }

  fetchSandhiAndAnvaya(): void {
    if (this.showSanskrit && this.showSandhi && this.groups.length > 0) {
      const sandhiURL = this.utilityService.getSlokaURL(this.chapterId, this.slokaGroup[0], 'sandhi');
      this.contentService.getContent(sandhiURL).subscribe(
        content => (this.sanskritSandhi = content),
        error => {
          console.error('Error fetching Sandhi:', error);
          this.sanskritSandhi = 'Error loading Sandhi content.';
        }
      );

      const anvayaURL = this.utilityService.getSlokaURL(this.chapterId, this.slokaGroup[0], 'anvaya');
      this.contentService.getContent(anvayaURL).subscribe(
        content => (this.sanskritAnvaya = content),
        error => {
          console.error('Error fetching Anvaya:', error);
          this.sanskritAnvaya = 'Error loading Anvaya content.';
        }
      );
    }
  }
  updateSlokaContent(): void {
    this.fetchSandhiAndAnvaya();

    for (const slokaId of this.slokaGroup) {
      const meaningURL = this.utilityService.getSlokaURL(this.chapterId, slokaId, 'meaning');
      this.contentService.getContent(meaningURL).pipe(
        catchError(error => {
          console.error(`Error fetching meaning for Sloka ${slokaId}:`, error);
          this.slokaMeaning[slokaId] = 'Error loading meaning.';
          return of(null); // Return a fallback observable
        })
      ).subscribe(content => {
        if (content) {
          this.slokaMeaning[slokaId] = content;
        }
      });

      const audioURL = this.utilityService.getSlokaAudioURL(this.chapterId, slokaId);
      this.slokaAudioSrc[slokaId] = audioURL; // Assuming audio URLs are static and don't require error handling
    }
  }

  onSlokaChange(): void {
    // Dynamically update the audio source
    if (this.audioPlayer && this.selectedSloka) {
      const audioElement = this.audioPlayer.nativeElement;
      // Stop the currently playing audio
      audioElement.pause();
      audioElement.currentTime = 0;

      // Clear the current source to reset the player
      audioElement.src = '';
      audioElement.load(); // Reload the audio element to visually reset it

      audioElement.src = this.slokaAudioSrc[this.selectedSloka];
      audioElement.load(); // Reload the audio element to apply the new source
    }
  }

  getSlokaTitle(index: number): string {
    return this.utilityService.getSlokaTitle(index, this.showSanskrit);
  }
}
