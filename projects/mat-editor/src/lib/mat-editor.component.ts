import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ExecuteCommandsService } from "./common/execute-commands.service";
import { from } from 'rxjs';

@Component({
  selector: 'app-mat-editor',
  templateUrl: './mat-editor.component.html',
  styleUrls: ['./mat-editor.component.scss']
})
export class MatEditorComponent implements OnInit {

  @ViewChild('ngxTextArea') textArea: any;
  @ViewChild('ngxWrapper') ngxWrapper: any;
  
  constructor(
    //private _messageService: MessageService,
    private executeCommand : ExecuteCommandsService,
    private _renderer: Renderer2
  ) { }

  ngOnInit() {
  }

   /**
   * editor actions, i.e., executes command from toolbar
   *
   * @param commandName name of the command to be executed
   */
  executeCommands(commandName: string): void {
    try {
      this.executeCommand.execute(commandName);
    } catch (error) {
     // this._messageService.sendMessage(error.message);
    }
  }
}
