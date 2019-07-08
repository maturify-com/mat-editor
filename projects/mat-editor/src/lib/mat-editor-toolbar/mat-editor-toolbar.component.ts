import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ExecuteCommandsService } from '../common/execute-commands.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-mat-editor-toolbar',
  templateUrl: './mat-editor-toolbar.component.html',
  styleUrls: ['./mat-editor-toolbar.component.scss']
})
export class MatEditorToolbarComponent implements OnInit {

  /** holds values of the insert link form */
  public imageUrlForm: FormGroup;
  public videoUrlForm: FormGroup;
  public tableForm: FormGroup;

  public insertImageUrl = false;
  public showModal = false;
  public showVideoModal = false;
  public showTableOptions = false;

  public isUpload = false;
  public uploadComplete = false;
  public isUploading = false;

  /**
  * Editor configuration
  */
  @Input() config: any;

  /**
 * Emits an event when a toolbar button is clicked
 */
  @Output() execute: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private _formBuilder: FormBuilder,
    private executeCommand: ExecuteCommandsService,
  ) { }

  ngOnInit() {
    this.imageUrlForm = new FormGroup({
      'urlLink': new FormControl('', Validators.required)
    });
    this.videoUrlForm = new FormGroup({
      'urlLink': new FormControl('', Validators.required)
    });
    this.tableForm = new FormGroup({
      'rows': new FormControl('', Validators.required),
      'collumns': new FormControl('',Validators.required)
    });
  }

  /**
   * triggers command from the toolbar to be executed and emits an event
   *
   * @param command name of the command to be executed
   */
  triggerCommand(command: string): void {
    this.execute.emit(command);
  }

  /**
   * inserts link in the editor
   */
  insertLink(): void {
    document.getElementById("myForm").style.display = "none";
    try {
      this.executeCommand.createLink(this.imageUrlForm.value);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * enable image upload
   */
  enableImageUpload(): void {
    // Create the input type file and click
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('id', 'fileUploadInput');
    input.click();

    input.onchange = () => {
      if (input.files.length > 0) {
        const file = input.files[0];
        try {
          this.executeCommand.uploadImage(file, 'https://s3.console.aws.amazon.com/s3/buckets/maturify-resources-dev/editor-images/?region=eu-west-1&tab=overview').subscribe(event => {
            // if (event instanceof HttpResponse) {
            try {
              this.executeCommand.insertImage(event.body.url);
              //this.executeCommand.insertImage('https://maturify-resources-dev.s3.eu-west-1.amazonaws.com/models/5bcdb6a66d709a0001dfd937/attachments/Screen%20Shot%202019-06-19%20at%2011.02.31%20AM_1560922365879');
              //this.executeCommand.insertImage('https://maturify-resources-dev.s3-eu-west-1.amazonaws.com/models/5b18b18aca28d80001126c29/attachments/GOPR0609_1549865755819');
            } catch (error) {
              console.log(error);
            }
            this.uploadComplete = true;
            this.isUploading = false;
            //  }
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
  }

  /** append the image in the editor */
  insertImage(url): void {
    try {
      this.executeCommand.insertImage(url);
    } catch (error) {
      console.log(error);
    }
  }

  showVideo() {
    if (this.showVideoModal) {
      this.showVideoModal = false;
      document.getElementById("myForm-2").style.display = "none";
    } else {
      this.showVideoModal = true;
      document.getElementById("myForm-2").style.display = "flex";
    }
  }

  onTextAreaBlur(): void {
    /** save selection if focussed out */
    // this._commandExecutor.savedSelection = Utils.saveSelection();    
    // if (typeof this.onTouched === 'function') {
    //   this.onTouched();
    // }
    // this.blur.emit('blur');
  }

  showLink() {
    if (this.showModal) {
      this.showModal = false;
      document.getElementById("myForm").style.display = "none";
    } else {
      this.showModal = true;
      document.getElementById("myForm").style.display = "block";
    }
  }

  /**
   * add the video link
   */
  addVideoLink(): void {
    try {
      this.executeCommand.insertVideoUrl(this.videoUrlForm.value.urlLink);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * show insert table 
   */
  showTable(): void {
    if (this.showTableOptions) {
      this.showTableOptions = false;
      document.getElementById("showTable").style.display = "none";
    } else {
      this.showModal = true;
      document.getElementById("showTable").style.display = "block";
    }
  }

  insertTables(): void {
    try {
      this.executeCommand.embedTables(this.tableForm.value.rows,this.tableForm.value.collumns);
    } catch (error) {
      console.log(error);
    }
  }
  /** insert videos in to the editor */
  uploadVideo(): void {
    // Create the input type file and click
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('id', 'fileUploadInput');
    input.click();

    input.onchange = () => {
      if (input.files.length > 0) {
        const file = input.files[0];
        try {
          this.executeCommand.uploadVideoToServer(file, 'https://s3.console.aws.amazon.com/s3/buckets/maturify-resources-dev/editor-images/?region=eu-west-1&tab=overview').subscribe(event => {
            try {
              // if (event instanceof HttpResponse) {
              this.executeCommand.insertVideo(event.file.url);
            } catch {

            }
            //  }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
}
