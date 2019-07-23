import { Component, OnInit, Renderer2, ViewChild, Output, EventEmitter, Input, forwardRef, SimpleChanges } from '@angular/core';
import { ExecuteCommandsService } from './common/execute-commands.service';
import { FormGroup, FormBuilder, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';

import { matEditorConfig } from './common/mat-editor.defaults';
import * as Utils from './common/mat-editor.utils';

@Component({
  selector: 'app-mat-editor',
  templateUrl: './mat-editor.component.html',
  styleUrls: ['./mat-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatEditorComponent),
    multi: true
  }]
})
export class MatEditorComponent implements OnInit {

  /**
 * The config property is a JSON object
 *
 * All avaibale inputs inputs can be provided in the configuration as JSON
 * inputs provided directly are considered as top priority
 */
  @Input() config = matEditorConfig;
  /** Specifies weather the textarea to be editable or not */
  @Input() editable: boolean;
  /** The spellcheck property specifies whether the element is to have its spelling and grammar checked or not. */
  @Input() spellcheck: boolean;
  /** Placeholder for the textArea */
  @Input() placeholder: string;
  /**
   * The translate property specifies whether the content of an element should be translated or not.
   *
   * Check https://www.w3schools.com/tags/att_global_translate.asp for more information and browser support
   */
  @Input() translate: string;
  /** Sets height of the editor */
  @Input() height: string;
  /** Sets minimum height for the editor */
  @Input() minHeight: string;
  /** Sets Width of the editor */
  @Input() width: string;
  /** Sets minimum width of the editor */
  @Input() minWidth: string;
  /**
   * Toolbar accepts an array which specifies the options to be enabled for the toolbar
   *
   * Check ngxEditorConfig for toolbar configuration
   *
   * Passing an empty array will enable all toolbar
   */
  @Input() toolbar: Object;
  /** Weather to show or hide toolbar */
  @Input() showToolbar: boolean;
  /** Weather to enable or disable the toolbar */
  @Input() enableToolbar: boolean;
  /** Endpoint for which the image to be uploaded */
  @Input() imageEndPoint: string;
   /** Endpoint for which the video to be uploaded */
   @Input() videoEndPoint: string;
  /**
   * The config property is a JSON object
   *
   * All avaibale inputs inputs can be provided in the configuration as JSON
   * inputs provided directly are considered as top priority
   */
  //@Input() config = matEditorConfig;
  /** emits `blur` event when focused out from the textarea */
  @Output() blur: EventEmitter<string> = new EventEmitter<string>();
  /** emits `focus` event when focused in to the textarea */
  @Output() focus: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('ngxTextArea') textArea: any;
  @ViewChild('ngxWrapper') ngxWrapper: any;
  Utils: any = Utils;
  private onChange: (value: string) => void;
  private onTouched: () => void;


  /** holds values of the insert link form */
  urlForm: FormGroup;
  /** holds values of the insert image form */
  imageForm: FormGroup;
  /** holds values of the insert video form */
  videoForm: FormGroup;
  /** set to false when image is being uploaded */
  uploadComplete = true;
  /** upload percentage */
  updloadPercentage = 0;
  /** set to true when the image is being uploaded */
  isUploading = false;
  /** which tab to active for color insetion */
  selectedColorTab = 'textColor';
  /** font family name */
  fontName = '';
  /** font size */
  fontSize = '';
  /** hex color code */
  hexColor = '';
  /** show/hide image uploader */
  isImageUploader = false;

  constructor(
    private _formBuilder: FormBuilder,
    private executeCommand: ExecuteCommandsService,
    private _renderer: Renderer2
  ) { }

  ngOnInit() {
    /**
     * set configuartion
     */
    this.config = this.Utils.getEditorConfiguration(this.config, matEditorConfig, this.getEditorConfigs());
    // this.height = this.height || this.textArea.nativeElement.offsetHeight;
    // this.executeCommand('enableObjectResizing');
  }

  /**
 * returns a json containing all the input configs 
 */
  getEditorConfigs(): any {
    return {
      editable: this.editable,
      spellcheck: this.spellcheck,
      placeholder: this.placeholder,
      translate: this.translate,
      height: this.height,
      minHeight: this.minHeight,
      width: this.width,
      minWidth: this.minWidth,
      enableToolbar: this.enableToolbar,
      showToolbar: this.showToolbar,
      imageEndPoint: this.imageEndPoint,
      videoEndPoint:this.videoEndPoint,
      toolbar: this.toolbar
    };
  }

    /**
   * refresh view/HTML of the editor
   * @param value html string from the editor
   */
  refreshView(value: string): void {
    const normalizedValue = value === null ? '' : value;
    this._renderer.setProperty(this.textArea.nativeElement, 'innerHTML', normalizedValue);
  }

   /**
   * Write a new value to the element.
   * @param value value to be executed when there is a change in contenteditable
   */
  writeValue(value: any): void {
    //this.togglePlaceholder(value);
    if (value === null || value === undefined || value === '' || value === '<br>') {
      value = null;
    }  
    this.refreshView(value);
  }

   /**
   * Set the function to be called
   * when the control receives a change event.
   * @param fn a function
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Set the function to be called
   * when the control receives a touch event.
   * @param fn a function
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
  * exectue commands from toolbar
  * @param commandName name of the command to be executed
  */
  executeCommands(commandName: string): void {
    try {
      this.executeCommand.execute(commandName);
    } catch (error) {
      console.log(error);
    }
  }

  onTextAreaBlur(): void {
    /** save selection if focussed out */
    this.executeCommand.savedSelection = Utils.saveSelection();
    if (typeof this.onTouched === 'function') {
      this.onTouched();
    }
    this.blur.emit('blur');
  }

   /**
   * Exectues when there's a change action in contenteditable section
   * @param html html string from contenteditable
   */
  contentChange(innerHTML: string): void {
    if (typeof this.onChange === 'function') {
      this.onChange(innerHTML);
    }
  }
}
