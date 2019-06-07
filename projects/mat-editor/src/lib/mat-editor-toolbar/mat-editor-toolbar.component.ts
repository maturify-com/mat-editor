import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mat-editor-toolbar',
  templateUrl: './mat-editor-toolbar.component.html',
  styleUrls: ['./mat-editor-toolbar.component.scss']
})
export class MatEditorToolbarComponent implements OnInit {

    /**
   * Emits an event when a toolbar button is clicked
   */
  @Output() execute: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  /**
   * triggers command from the toolbar to be executed and emits an event
   *
   * @param command name of the command to be executed
   */
  triggerCommand(command: string): void {
    this.execute.emit(command);
  }
}
