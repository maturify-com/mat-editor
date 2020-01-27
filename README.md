# Mat-Editor

Mat-Editor is a free, open source WYSIWYG('what you see is what you get') editor built for the modern web which is developed and maintained by [Maturify](https://www.maturify.com/). It is a npm library which can be used on **Angular** based web applications.

## Getting Started

In order to use the Mat-Editor in your Angular application, you will need to comply with the following steps:

1. Install Mat-Editor from [npm](https://www.npmjs.com/package/mat-editor)

`npm i mat-editor --save` 

2. Import Mat-Editor  in the `module.ts` file 

``` 
 import { MatEditorModule } from 'mat-editor';
    @NgModule({
     imports: [
       MatEditorModule
    ],
```

3.  Configure the Mat-Editor

``` 
      <mat-editor 
        [spellcheck]="true" [(ngModel)]="A variable which holds the content in the editor"
        (ngModelChange)="A method to trigger when the content changes (saving)" 
        [imageURL]="Set the image URL here after image upload"
        (imageFile)="The function that should run when uploading a image">
      </mat-editor>
```

4.  Example code

``` 
<mat-editor [spellcheck]="true" [(ngModel)]="editorContent"
        (ngModelChange)="contentChanged()" [imageURL]="this.imageURL"
        (imageFile)="uploadImageToS3($event)">
      </mat-editor>
```

5.  Advance configuration

Use the directive `[config]="editorConfig" ` and pass a configuration object. The default configuration is shown below

``` 
const matEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '0',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  toolbarColor: '',
  placeholder: 'Enter text here...',
  imageEndPoint: '',
  videoEndPoint: '',
  toolbar: [
    ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
    ['fontName', 'fontSize', 'color'],
    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
    ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
    ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
    ['link', 'unlink', 'image', 'video', 'table']
  ]
};

```

## Contributing

We welcome contributions from everyone. You can help in many ways, including coding, design and documentation. Please note that when creating a pull request select the merging branch as `dev` . Also when you are creating a branch please make sure that the branch is created from the `dev` branch.

## Installation

1. Fork the `maturify-com/mat-editor` repository and set the upstream as `maturify-com/mat-editor` (If you are a member of Maturify development team please skip this step)

2.  Cloning the repository

    -  For a forked repository   > `git clone https://github.com/<Github User Name>/mat-editor.git` 
    -  Maturify member           > `git clone https://github.com/maturify-com/mat-editor.git` 

3.  Installing relevant packages 

    Navigate to project directory and run:

     - `git checkout dev` 
     - `npm i` 

4.  Building the Mat-Editor

* The repository contains two main projects which are the Mat-Editor library and the demo which is used to test the library. Whenever you make a change in the library make sure to build the library before testing. If not, the imported library in the demo will not be updated.
*  Building the library > `ng build mat-editor` 
*  Testing the library in demo > `ng serve` 

## Publishing the Library (Only for Maturify members)

Please follow the steps in order:

* Sign in using > `npm login` 
* Check the current user > `npm whoami` 
* Upgrade the version number in `package.json ` (this is mandatory)
* Run an npm install to upgrade the version in package-lock.json > `npm i`
* Build the library > `ng build mat-editor` 
* Pack the npm package > `npm run build_lib && npm run npm_pack` 
* Publish the library > `npm publish ./dist/mat-editor/mat-editor-x.x.x.tgz` (x.x.x represents the version)
 
From the above commands the packed library in the `dist` folder will be published.
