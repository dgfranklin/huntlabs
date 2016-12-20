/* tslint:disable:no-unused-variable */

import {TestBed, ComponentFixture} from '@angular/core/testing';
import { EditorComponent } from './editor.component';

describe('Component: Editor', () => {
  let comp: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorComponent ],
    });
    fixture = TestBed.createComponent(EditorComponent);
    comp = fixture.componentInstance;
  });
  it('should create an instance', () => {
    expect(comp).toBeTruthy();
  });
});
