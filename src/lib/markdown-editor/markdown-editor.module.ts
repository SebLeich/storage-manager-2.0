import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownEditorComponent } from './components/markdown-editor/markdown-editor.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MarkdownEditorComponent
  ],
  imports: [
    CommonModule,
    QuillModule.forRoot({
      modules: {
        history: {
          delay: 2000,
          maxStack: 500,
          userOnly: true
        }
      }
    }),
    ReactiveFormsModule,
  ],
  exports: [
    MarkdownEditorComponent
  ]
})
export class MarkdownEditorModule { }
