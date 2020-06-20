import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDrivenformComponent } from './template-drivenform.component';

describe('TemplateDrivenformComponent', () => {
  let component: TemplateDrivenformComponent;
  let fixture: ComponentFixture<TemplateDrivenformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDrivenformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDrivenformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
