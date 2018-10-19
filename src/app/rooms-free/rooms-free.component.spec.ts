import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsFreeComponent } from './rooms-free.component';

describe('RoomsFreeComponent', () => {
  let component: RoomsFreeComponent;
  let fixture: ComponentFixture<RoomsFreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsFreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
