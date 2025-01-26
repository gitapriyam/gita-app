import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ChapterPage } from './chapter.page';
import { ContentService } from '../services/content.service';

describe('ChapterPage', () => {
  let component: ChapterPage;
  let fixture: ComponentFixture<ChapterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterPage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ChapterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
