import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEditorToolbarComponent } from './mat-editor-toolbar.component';

describe('MatEditorToolbarComponent', () => {
  let component: MatEditorToolbarComponent;
  let fixture: ComponentFixture<MatEditorToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatEditorToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatEditorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
