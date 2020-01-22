import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';

import { MatEditorToolbarComponent } from './mat-editor-toolbar/mat-editor-toolbar.component';
import { MatEditorComponent } from './mat-editor.component';
import { ImageUploadService } from './common/ImageUpload.service';
import { ExecuteCommandsService } from './common/execute-commands.service';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MatEditorComponent,
    MatEditorToolbarComponent
  ],
  exports: [
    MatEditorComponent
  ],
  providers: [ExecuteCommandsService, ImageUploadService]
})
export class MatEditorModule { }
