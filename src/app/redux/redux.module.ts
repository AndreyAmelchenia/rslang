import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { expectationFeatureKey, expectationReducer } from './reducers/request.reducer';
import { wordsFeatureKey, booksReducer } from './reducers/words.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(wordsFeatureKey, booksReducer),
    StoreModule.forFeature(expectationFeatureKey, expectationReducer),
  ],
})
export class ReduxModule {}
