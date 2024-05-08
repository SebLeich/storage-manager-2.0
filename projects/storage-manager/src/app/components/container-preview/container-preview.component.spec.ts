import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IContainer } from '@smgr/interfaces';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { PrettyLengthPipe } from 'src/app/pipes/pretty-length.pipe';
import { PrettyVolumePipe } from 'src/app/pipes/pretty-volume.pipe';

import { ContainerPreviewComponent } from './container-preview.component';

describe('ContainerPreviewComponent', () => {
  let component: ContainerPreviewComponent;
  let fixture: ComponentFixture<ContainerPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerPreviewComponent, PrettyLengthPipe, PrettyVolumePipe],
      imports: [
        ...defaultImportsConstant,

        AppModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no container hint in case no container available', () => {
    expect(fixture.debugElement.query(By.css('.no-content-available'))).toBeTruthy();
  });

  it('should display container preview and properties in case container is available', () => {
    fixture.componentInstance.container = { 'height': 10, 'length': 10, 'width': 10 } as IContainer;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.description')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('.property-row .property')).length).toBe(4);
    expect(fixture.debugElement.queryAll(By.css('.chart-wrapper')).length).toBe(1);
  });
});
