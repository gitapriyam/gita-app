import { effect, Injectable, numberAttribute } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() {}

  getChapterNumber(chapterContent: string): string {
    if (chapterContent.includes('Dhyanam')) {
      return '00';
    } else if (chapterContent.includes('Mahatmyam')) {
      return '19';
    } else {
      return chapterContent.split('-')[1];
    }
  }

  getSlokaArrayIndex(chapterContent: string): number {
    const chapterNumber = this.getChapterNumber(chapterContent);
    return Number(chapterNumber); 
  }

  getNumberOfVerses(chapterContent: string): number {
    const index: number =  this.getSlokaArrayIndex(chapterContent);
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

  getChapterIndex(chapterName: string): number {
    console.log("chapterName: ===" + chapterName);
    let index: number = environment.appPages.findIndex(page => page.title.includes(chapterName));
    if (index === -1) {
      index = 19;
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
}