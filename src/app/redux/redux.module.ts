import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { WordsEffects } from './effects/words.effects';
import { authFeatureKey, authReducer } from './reducers/auth.reducers';
import { expectationFeatureKey, expectationReducer } from './reducers/request.reducer';
import { settingsFeatureKey, settingsReducer } from './reducers/settings.reducer';
import { wordsFeatureKey, booksReducer } from './reducers/words.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([WordsEffects]),
    StoreModule.forFeature(wordsFeatureKey, booksReducer),
    StoreModule.forFeature(expectationFeatureKey, expectationReducer),
    StoreModule.forFeature(settingsFeatureKey, settingsReducer),
    StoreModule.forFeature(authFeatureKey, authReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    HttpClientModule,
  ],
})
export class ReduxModule {}
