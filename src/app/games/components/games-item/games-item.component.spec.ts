import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GamesItemComponent } from './games-item.component';
import { GameModel } from '../../models/games.model';

const testGame: GameModel = {
  id: 1,
  name: 'test name',
  description: 'test description',
  img: 'test img',
};

describe('GamesItemComponent', () => {
  let component: GamesItemComponent;
  let fixture: ComponentFixture<GamesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesItemComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesItemComponent);
    component = fixture.componentInstance;
    component.game = testGame;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
