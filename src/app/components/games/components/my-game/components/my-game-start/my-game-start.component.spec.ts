import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGameStartComponent } from './my-game-start.component';

describe('MyGameStartComponent', () => {
  let component: MyGameStartComponent;
  let fixture: ComponentFixture<MyGameStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyGameStartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGameStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
