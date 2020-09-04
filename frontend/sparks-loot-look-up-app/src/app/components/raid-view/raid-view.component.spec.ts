import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidViewComponent } from './raid-view.component';

describe('RaidViewComponent', () => {
  let component: RaidViewComponent;
  let fixture: ComponentFixture<RaidViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaidViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaidViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
