import { effect, Injectable, numberAttribute } from '@angular/core';
import { environment } from '../../environments/environment';
import { h } from 'ionicons/dist/types/stencil-public-runtime';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() {}

  getChapterNumber(chapterId: number): number {
    return chapterId;
  }

  getSlokaArrayIndex(chapterId: number): number {
    return chapterId; 
  }

  getLeftAppendedNumber(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }

  getSlokaURL(chapterNumber: string, slokaIndex: string, lang: string): string {
    return environment.baseURL + "/chap" + chapterNumber + "/" + lang + "_" + chapterNumber + "_" + slokaIndex + ".txt"
  }

  getChapterName(chapterId: number): string {
    return environment.appPages[chapterId].title;
  }

  getChapterIndex(chapterId: string): number {
    let index: number = environment.appPages.findIndex(page => page.title.includes(chapterId));
    if (index === -1) {
      if (chapterId.includes('00')) {
        index = 0;
      } else if (chapterId.includes('19')) {
      index = 19;
      }
    }
    return index;
  }

  getSlokaAudioURL(chapterNumber: string, slokaIndex: string): string {
    return environment.baseURL + "/chap" + chapterNumber + "/" + chapterNumber + "-" + slokaIndex + ".mp3"
  }

  getChapterAudioURL(chapterName: string, chapterNumber: string): string {
    return environment.baseURL + "/chap" + chapterNumber + "/" + 
    (chapterName.startsWith("Chapter")? "chap" + chapterNumber:chapterName.toLowerCase()) + ".mp3"
  } 

  getChapterResource(chapterName: string, chapterNumber: string): string {
    let effectiveChapter: String ;
    if (chapterNumber === '00') {
      effectiveChapter = "dhyanam";
    }
    else if (chapterNumber === '19') {
      effectiveChapter = "mahatmyam";
    }
    else {
      effectiveChapter = chapterName.replace("Chapter","chap").replace("-","") ;
    }
    let url = environment.baseURL + "/chap" + chapterNumber + "/" + effectiveChapter + ".pdf";
    return url;
  } 

  getSlokaCount(chapterId: number): number {
    return environment.slokasArray[chapterId];
  }
}