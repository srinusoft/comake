import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeEventComponent } from './subscribe-event.component';

describe('SubscribeEventComponent', () => {
  let component: SubscribeEventComponent;
  let fixture: ComponentFixture<SubscribeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribeEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
