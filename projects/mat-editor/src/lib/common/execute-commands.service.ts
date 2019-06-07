import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExecuteCommandsService {
  /** saves the selection from the editor when focussed out */
  savedSelection: any = undefined;

  constructor() { }

  /**
 * Execute the commands from  toolbar
 *
 * @param command Command to be executed (Ex- bold,italic)
 */
  execute(command: string): void {

    // if (!this.savedSelection && command !== 'enableObjectResizing') {
    //   throw new Error('Range out of Editor');
    // }

    if (command === 'enableObjectResizing') {
      document.execCommand('enableObjectResizing', true);
    }

    if (command === 'blockquote') {
      document.execCommand('formatBlock', false, 'blockquote');
    }

    if (command === 'removeBlockquote') {
      document.execCommand('formatBlock', false, 'div');
    }

    document.execCommand(command, false, null);
  }
}
