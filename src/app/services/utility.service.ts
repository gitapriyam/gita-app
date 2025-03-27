import { effect, Injectable, numberAttribute } from '@angular/core';
import { environment } from '../../environments/environment';
import e from 'express';

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
    return this.getChapterBasePath(chapterId) + content + "_" + chapterNumber + "_" + slokaIndex + ".txt"
  }

  getChapterBasePath(chapterId: number) {
    let chapterNumber: string = this.getLeftAppendedNumber(chapterId);
    return environment.baseURL + "/chap" + chapterNumber + "/";
  }

  getChapterName(chapterId: number, isSanskrit: boolean): string {
    return isSanskrit? environment.chapters[chapterId].sanskrit: environment.chapters[chapterId].english;
  }

  getSlokaAudioURL(chapterId: number, slokaId: number): string {
    let chapterNumber: string = this.getLeftAppendedNumber(chapterId);
    let slokaIndex: string = this.getLeftAppendedNumber(slokaId);
    return this.getChapterBasePath(chapterId) + chapterNumber + "-" + slokaIndex + ".mp3"
  }

  getChapterAudioURL(chapterId: number): string {
    let chapterNumber: string = this.getLeftAppendedNumber(chapterId);
    let chapterName: string = this.getChapterResourceName(chapterId);
    return this.getChapterBasePath(chapterId) + chapterName + ".mp3"
  } 

  getChapterResource(chapterId: number, isSanskrit: boolean): string {
    if(isSanskrit){
      let replaceValue: string = 'bg_chapter' + this.getLeftAppendedNumber(chapterId);
      if(chapterId === 0){
        replaceValue = 'bg_dhyaanam';
      }else if(chapterId === 19){
        replaceValue = 'bg_maahaatmyam';
      }
      return environment.prapatti.urlTemplate.replace('{chapter}', replaceValue);
    }
    let chapterNumber: string = this.getLeftAppendedNumber(chapterId);
    let chapterName: string = this.getChapterResourceName(chapterId);
    let url = this.getChapterBasePath(chapterId) + chapterName + ".pdf";
    return url;
  } 

  getChapterResourceName(chapterId: number): string {
    const chapterName = environment.chapters[chapterId].english
    return chapterName.replace('Chapter-','chap').toLowerCase();
  }

  getSlokaCount(chapterId: number): number {
     return environment.chapters[chapterId].slokaCount;
  }

  getSlokaTitle(index: number, isSanskrit: boolean ): string {
    return isSanskrit? 'श्लोकः ' + index : 'Verse ' + index;
  }

  getApplicationTitle(isSanskrit: boolean): string {
    return isSanskrit? environment.title.sanskrit:environment.title.english;
  }

}