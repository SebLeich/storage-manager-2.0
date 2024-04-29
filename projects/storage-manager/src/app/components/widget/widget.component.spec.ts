import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { v4 as generateGuid } from 'uuid';

import { WidgetComponent } from './widget.component';

@Component({
  template: `
    <app-widget>
      <div class="headline-controls-wrapper">
        <div id="pseudo-headline-controls"></div>
      </div>
      <div class="widget-content">
        <div id="pseudo-widget-content"></div>
      </div>
    </app-widget>
  `
})
export class WidgetTestComponent { }

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let testComponentFixture: ComponentFixture<WidgetTestComponent>;
  let fixture: ComponentFixture<WidgetComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WidgetComponent);
    testComponentFixture = TestBed.createComponent(WidgetTestComponent);

    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render headline', () => {
    const headline = generateGuid();
    component.headline = headline;
    fixture.detectChanges();

    const headlineElement = debugElement.query(By.css('#headline'));
    expect((headlineElement.nativeElement as HTMLElement).textContent).toContain(headline);
  });

  it('should render headline controls', () => {
    const headlineControls = testComponentFixture.debugElement.query(By.css('#pseudo-headline-controls'));
    expect(headlineControls).toBeTruthy();
  });

  it('should render widget content', () => {
    const widgetContent = testComponentFixture.debugElement.query(By.css('#pseudo-widget-content'));
    expect(widgetContent).toBeTruthy();
  });
});
