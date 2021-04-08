import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTotalGameComponent } from './dialog-total-game.component';

describe('DialogTotalGameComponent', () => {
  let component: DialogTotalGameComponent;
  let fixture: ComponentFixture<DialogTotalGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTotalGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTotalGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
