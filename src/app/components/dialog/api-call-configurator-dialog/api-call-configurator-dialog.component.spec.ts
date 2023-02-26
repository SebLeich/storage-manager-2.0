import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { ApiCallConfiguratorDialogComponent } from './api-call-configurator-dialog.component';

describe('ApiCallConfiguratorDialogComponent', () => {
  let component: ApiCallConfiguratorDialogComponent;
  let fixture: ComponentFixture<ApiCallConfiguratorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiCallConfiguratorDialogComponent ],
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
      ],
      providers: [
        {
          provide: MatDialogRef<ApiCallConfiguratorDialogComponent>,
          useValue: {
            close: () => {
              
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCallConfiguratorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
