import { effect, Injectable, numberAttribute } from '@angular/core';
import { environment } from '../../environments/environment';
import { h } from 'ionicons/dist/types/stencil-public-runtime';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() {}

  getLeftAppendedNumber(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }

  getSlokaURL(chapterId: number, slokaId: number, content: string): string {
    let chapterNumber: string = this.getLeftAppendedNumber(chapterId);
    let slokaIndex: string = this.getLeftAppendedNumber(slokaId);
    return environment.baseURL + "/chap" + chapterNumber + "/" + content + "_" + chapterNumber + "_" + slokaIndex + ".txt"
  }

  getChapterName(chapterId: number): string {
    return environment.chapters[chapterId].title;
  }

  getSlokaAudioURL(chapterId: number, slokaId: number): string {
    let chapterNumber: string = this.getLeftAppendedNumber(chapterId);
    let slokaIndex: string = this.getLeftAppendedNumber(slokaId);
    return environment.baseURL + "/chap" + chapterNumber + "/" + chapterNumber + "-" + slokaIndex + ".mp3"
  }

  getChapterAudioURL(chapterId: number): string {
    let chapterNumber: string = this.getLeftAppendedNumber(chapterId);
    let chapterName: string = this.getChapterResourceName(chapterId);
    return environment.baseURL + "/chap" + chapterNumber + "/" + chapterName + ".mp3"
  } 

  getChapterResource(chapterId: number): string {
    let chapterNumber: string = this.getLeftAppendedNumber(chapterId);
    let chapterName: string = this.getChapterResourceName(chapterId);
    let url = environment.baseURL + "/chap" + chapterNumber + "/" + chapterName + ".pdf";
    return url;
  } 

  getChapterResourceName(chapterId: number): string {
    return this.getChapterName(chapterId).replace('Chapter-','chap').toLowerCase();
  }

  getSlokaCount(chapterId: number): number {
     return environment.chapters[chapterId].slokaCount;
  }
}