import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainscreenBodyComponent } from './mainscreen-body.component';

describe('MainscreenBodyComponent', () => {
  let component: MainscreenBodyComponent;
  let fixture: ComponentFixture<MainscreenBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainscreenBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainscreenBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
