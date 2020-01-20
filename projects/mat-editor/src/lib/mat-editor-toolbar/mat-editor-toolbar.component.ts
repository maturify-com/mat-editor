import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ExecuteCommandsService } from '../common/execute-commands.service';
import { ImageUploadService } from '../common/imageUpload.service';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import * as Utils from '../common/mat-editor.utils';

@Component({
  selector: 'app-mat-editor-toolbar',
  templateUrl: './mat-editor-toolbar.component.html',
  styleUrls: ['./mat-editor-toolbar.component.scss']
})
export class MatEditorToolbarComponent implements OnInit {
  private imageURLSubscription: Subscription;
  private imageURL: any;

  /** holds values of the insert link form */
  public imageUrlForm: FormGroup;
  public videoUrlForm: FormGroup;
  public tableForm: FormGroup;
  public fontNameForm: FormGroup;

  public insertImageUrl = false;
  public showModal = false;
  public showVideoModal = false;
  public showTableOptions = false;

  public isUpload = false;
  public uploadComplete = false;
  public isUploading = false;
  public defaultFont;
  public fontName = [
    {
      label: 'Trebuchet',
      value: "'Trebuchet MS', 'Helvetica Neue', Arial, sans-serif"
    },
    {
      label: 'Georgia',
      value: 'Georgia, times, serif'
    },
    {
      label: 'Arial',
      value: 'Arial, Black, serif'
    }
  ];

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
    private imageUploadService: ImageUploadService
  ) { }

  ngOnInit() {
    this.imageURLSubscription = this.imageUploadService.afterImageUpload.subscribe((url) => {
      // subscribing for a image url which is sent from the mat-editor component
      this.imageURL = url;
      try {
        //removing the loader after image gets added to the content
        this.executeCommand.removeElement("matLoading");
        this.executeCommand.insertImage(this.imageURL);
      } catch (error) {
        console.log(error);
      }
    });
    this.imageUrlForm = new FormGroup({
      'urlLink': new FormControl('', Validators.required)
    });
    this.videoUrlForm = new FormGroup({
      'urlLink': new FormControl('', Validators.required)
    });
    this.tableForm = new FormGroup({
      'rows': new FormControl('', Validators.required),
      'collumns': new FormControl('', Validators.required)
    });
    this.defaultFont = this.fontName[0];
  }


  /**
   * enable or diable toolbar based on configuration
   *
   * @param value name of the toolbar buttons
   */
  canEnableToolbarOptions(value): boolean {
    return Utils.canEnableToolbarOptions(value, this.config['toolbar']);
  }

  /**
   *  Gets triggered when the font color
   * @param color Color that needs to be setted to the selection
   */
  fontColor(color: string): void {
    try {
      this.executeCommand.setFontColor(color);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Gets triggered when the font name changes
   */
  onSelect(fontName: string): void {
    try {
      this.executeCommand.setFontName(fontName);
    } catch (error) {
      console.log(error);
    }
  }
  /** set font size */
  setFontSize(): void {
    try {
      this.executeCommand.increaseFontSize();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * triggers command from the toolbar to be executed and emits an event
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
          this.executeCommand.showLoadingTag("[..Uploading Image..]");
          this.imageUploadService.onImageUpload.emit(file);
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
    this.showModal = false;
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
      this.showTableOptions = true;
      document.getElementById("showTable").style.display = "block";
    }
  }

  /**
   * Insert the table into the text area
   */
  insertTables(): void {
    this.showTableOptions = false;
    try {
      this.executeCommand.embedTables(this.tableForm.value.rows, this.tableForm.value.collumns);
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
          this.executeCommand.uploadVideoToServer(file, this.config.videEndPoint).subscribe(event => {
            if (event instanceof HttpResponse) {
              this.executeCommand.insertVideo(event.body.url);
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.imageURLSubscription) {
      this.imageURLSubscription.unsubscribe();
    }
  }
}
