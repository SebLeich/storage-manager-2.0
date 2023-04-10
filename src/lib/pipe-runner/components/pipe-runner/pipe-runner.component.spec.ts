import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipeRunnerComponent } from './pipe-runner.component';
import { PipeRunnerService } from './pipe-runner.service';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { RouterTestingModule } from '@angular/router/testing';

describe('PipeRunnerComponent', () => {
  let component: PipeRunnerComponent;
  let fixture: ComponentFixture<PipeRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PipeRunnerComponent],
      imports: [...defaultImportsConstant, RouterTestingModule],
      providers: [PipeRunnerService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PipeRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
