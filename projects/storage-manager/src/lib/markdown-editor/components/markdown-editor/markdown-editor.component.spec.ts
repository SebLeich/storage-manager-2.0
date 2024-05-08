import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';

describe('MarkdownEditorComponent', () => {
  let spectator: Spectator<MarkdownEditorComponent>;

  const createComponent = createComponentFactory({
    component: MarkdownEditorComponent,
    imports: [
      QuillModule.forRoot({
        modules: {
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
          }
        }
      }),
      ReactiveFormsModule
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should contain quill-editor instance', () => {
    const quillEditor = spectator.query('quill-editor');
    expect(quillEditor).toBeTruthy();
  });
});
