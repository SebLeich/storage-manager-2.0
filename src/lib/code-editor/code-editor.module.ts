import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';



@NgModule({
  declarations: [CodeEditorComponent],
  imports: [CodemirrorModule, CommonModule],
  exports: [CodeEditorComponent]
})
export class CodeEditorModule { }
