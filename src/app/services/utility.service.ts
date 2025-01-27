import { effect, Injectable, numberAttribute } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() {}

  getChapterNumber(chapterId: string): string {
    if (chapterId.includes('Dhyanam')) {
      return '0';
    } else if (chapterId.includes('Mahatmyam')) {
      return '19';
    } else {
      return chapterId.split('-')[1];
    }
  }

  getSlokaArrayIndex(chapterId: string): number {
    const chapterNumber = this.getChapterNumber(chapterId);
    return Number(chapterNumber); 
  }

  getNumberOfVerses(chapterId: string): number {
    const index: number =  this.getSlokaArrayIndex(chapterId);
    return environment.slokasArray[index];
  }

  getLeftAppendedNumber(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }

  getSlokaURL(chapterNumber: string, slokaIndex: string, lang: string): string {
    return environment.baseURL + "/chap" + chapterNumber + "/" + lang + "_" + chapterNumber + "_" + slokaIndex + ".txt"
  }

  getChapterName(chapterId: string): string {
    if (chapterId.includes('00')) {
      return 'Dhyanam';
    } else if (chapterId.includes('19')) {
      return 'Mahatmyam';
    } else {
      return chapterId;
    }
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

  getTotalSlokas(chapterId: string): number {
    return environment.slokasArray[this.getSlokaArrayIndex(chapterId)];
  }
}