import { Injectable } from '@angular/core';
import * as Utils from '../common/mat-editor.utils';
import { HttpRequest, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ExecuteCommandsService {
  /** saves the selection from the editor when focussed out */
  savedSelection: any = undefined;

  constructor(private http: HttpClient) { }

  /**
 * Execute the commands from  toolbar
 *
 * @param command Command to be executed (Ex- bold,italic)
 */
  execute(command: string): void {

    if (!this.savedSelection && command !== 'enableObjectResizing') {
      throw new Error('Range out of Editor');
    }

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

  /** insert HTML */
  private insertHtml(html: string): void {
    const isHTMLInserted = document.execCommand('insertHTML', false, html);

    if (!isHTMLInserted) {
      throw new Error('Unable to perform the operation');
    }
  }

  /**
 * Insert links into the editor
 * @param params parameters that holds the information for the link
 */
  createLink(params: any): void {
    if (this.savedSelection) {
      //const newUrl = '<a href="' + params.urlLink + '" target="_blank">' + this.savedSelection.startContainer.data + '</a>';
      if (document.getSelection().type !== 'Range') {
        const restored = Utils.restoreSelection(this.savedSelection);
        if (restored) {
          const inserted = document.execCommand('createLink', false, params.urlLink);
        }
      } else {
        throw new Error('Only new links can be inserted. You cannot edit URL`s');
      }
    } else {
      throw new Error('Range out of the editor');
    }
  }

  /**
  * uploads image to the server
  *
  * @param file Image that has to be uploaded to the server
  * @param endPoint back end endpoint to which the image has to be sent
  */
  uploadImage(file: File, endPoint: string): any {
    console.log(file);
    if (!endPoint) {
      throw new Error('Image Endpoint isn`t provided or invalid');
    }
    const formData: FormData = new FormData();
    if (file) {
      formData.append('file', file);
      const req = new HttpRequest('POST', endPoint, formData, {
        reportProgress: true
      });
      return this.http.request(req);

    } else {
      throw new Error('Invalid Image');
    }
  }

  /**
  * inserts image in to the editor
  *
  * @param imageURI url of the image to be inserted
  */
  insertImage(imageUrl: string): void {
    const image = '<img src=' + imageUrl + ' width=100% >' // fix a width to the image
    if (this.savedSelection) {
      if (imageUrl) {
        const restored = Utils.restoreSelection(this.savedSelection);
        if (restored) {
          const inserted = document.execCommand('insertHTML', false, image);
          if (!inserted) {
            throw new Error('Invalid URL');
          }
        }
      }
    } else {
      throw new Error('Range out of the editor');
    }
  }

  /**
   * 
   * @param file video that needs to be uploaded
   * @param endpoint back end enpoint to which the video has to be sent
   */
  uploadVideoToServer(file: File, endpoint: string): any {
    console.log(file);
    if (!endpoint) {
      throw new Error('Video Endpoint isn`t provided or invalid');
    }
    const formData: FormData = new FormData();
    if (file) {
      formData.append('file', file);
      const req = new HttpRequest('POST', endpoint, formData, {
        reportProgress: true
      });
      return this.http.request(req);

    } else {
      throw new Error('Invalid Image');
    }
  }

  /**
  * inserts video in to the editor
  *
  * @param videParams url of the image to be inserted
  */
  insertVideo(videoUrl: any): void {
    if (this.savedSelection) {
      if (videoUrl) {
        const restored = Utils.restoreSelection(this.savedSelection);
        if (restored) {
          const video = '<video width="100%" controls> <source src=' + videoUrl + ' type="video/mp4"></video>'
          const inserted = document.execCommand('insertHTML', false, video);
          if (!inserted) {
            throw new Error('Invalid URL');
          }
        }
      }
    } else {
      throw new Error('Range out of the editor');
    }
  }

  insertVideoUrl(videoUrl: any): void {
    console.log(videoUrl);
    if (this.savedSelection) {
      if (videoUrl) {
        const restored = Utils.restoreSelection(this.savedSelection);
        if (restored) {
          const newUrl = this.embedYoutubeUrl(videoUrl);
          const video = '<iframe  allowfullscreen="true" frameborder="0" height=720 width=100% src="' + newUrl + '"></iframe>';
          const inserted = document.execCommand('insertHTML', false, video);
        }
      }
    }
  }

  /**
   * 
   * @param rows Number of rows that includes in the table
   * @param collumns Number of collumns that includes in the table
   */
  embedTables(rows: number, collumns: number): any {
    if (this.savedSelection) {
      const restored = Utils.restoreSelection(this.savedSelection);
      if (restored) {
        let html = '<table class="tableContent" style="border-collapse:collapse;width:80%;margin:5% auto;" "><tbody>';
        for (let i = 0; i < rows; i++) {
          html += "<tr>";
          for (let j = 0; j < collumns; j++) {
            html += '<td style="padding:15px;border:1px solid black;vertical-align:middle;"></td>'
          }
          html += "</tr>"
        }
        html += "</tbody></table>";
        console.log(html);
        const inserted = document.execCommand('insertHTML', false, html);
      }
    }
  }


  /**
   * Re-arrange the url into a embed url
   * @param url youtube url that needs to be fixed into a embeded one
   */
  embedYoutubeUrl(url: string): any {
    const link = url;
    const newUrl = link.replace("watch?v=", "embed/");
    return newUrl;
  }

  /**
   * checks the input url is a valid youtube URL or not
   * @param url Youtue URL
   */
  private isYoutubeLink(url: string): boolean {
    const ytRegExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    return ytRegExp.test(url);
  }
  //https://maturify-resources-dev.s3-eu-west-1.amazonaws.com/editor-images/raciit.mp4
}
