import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { settingsFeatureKey, settingsReducer } from './reducers/settings.reducer';
import { statsFeatureKey, statsReducer } from './reducers/stats.reducer';
import { wordsFeatureKey, booksReducer } from './reducers/words.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(wordsFeatureKey, booksReducer),
    StoreModule.forFeature(settingsFeatureKey, settingsReducer),
    StoreModule.forFeature(statsFeatureKey, statsReducer),
  ],
})
export class StateModule {}
