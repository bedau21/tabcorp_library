import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('form'));
    htmlElement = debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set submitted to true'), async(() => {
    component.saveBook();
    expect(component.submitted).toBeTruthy();
  });

  it('should call saveBook method'), async(() => {
    htmlElement = fixture.debugElement.query(By.css('add-book')).nativeElement;
    htmlElement.click();
    expect(component.saveBook).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid because of title, category, description required', async(() => {
    component.bookForm.controls['title'].setValue('');
    component.bookForm.controls['category'].setValue('');
    component.bookForm.controls['description'].setValue('');
    expect(component.bookForm.valid).toBeFalsy();
  }));

  it('form should be invalid because title length is more than 30 characters', async(() => {
    component.bookForm.controls['title'].setValue('title length is more than 30 characters, title length is more than 30 characters');
    component.bookForm.controls['category'].setValue('Drama');
    component.bookForm.controls['description'].setValue('text');
    expect(component.bookForm.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    component.bookForm.controls['title'].setValue('Gone Girl');
    component.bookForm.controls['category'].setValue('Drama');
    component.bookForm.controls['description'].setValue('text');
    expect(component.bookForm.valid).toBeTruthy();
  }));
});
