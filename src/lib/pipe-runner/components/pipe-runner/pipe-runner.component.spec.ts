import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipeRunnerComponent } from './pipe-runner.component';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { RouterTestingModule } from '@angular/router/testing';
import { PipelineStoreModule } from 'src/lib/pipeline-store/pipeline-store.module';
import { PipeRunnerService } from './services/pipe-runner.service';
import { PipeRunnerModule } from '../../pipe-runner.module';

describe('PipeRunnerComponent', () => {
  let component: PipeRunnerComponent;
  let fixture: ComponentFixture<PipeRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...defaultImportsConstant, RouterTestingModule, PipelineStoreModule, PipeRunnerModule],
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
