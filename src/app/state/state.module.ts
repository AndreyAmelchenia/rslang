import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { wordsFeatureKey, booksReducer } from './reducers/words.reducer';

@NgModule({
  declarations: [],
  imports: [StoreModule.forFeature(wordsFeatureKey, booksReducer)],
})
export class StateModule {}
