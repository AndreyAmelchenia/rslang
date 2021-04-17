import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, map, shareReplay } from 'rxjs/operators';
import { LoadingService } from 'src/app/common/services/spinner.service';
import { URL_BACK_SERVER } from 'src/app/shared/constants/url-constants';
import { Path } from '../../../shared/models/router.model';
import { isAuth, logout } from '../../../redux/actions/auth.actions';
import { IUser } from '../../../redux/models/user.models';
import { isLoginSelector, userSelector } from '../../../redux/selectors/auth.selectors';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  apiUrl = URL_BACK_SERVER.URL_BACK;

  loading = false;

  isAuth$: Observable<boolean>;

  user$: Observable<IUser>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private loadingService: LoadingService,
  ) {}

  path = null;

  onLogout() {
    this.store.dispatch(logout());
  }

  ngOnInit() {
    this.path = Path;
    this.isAuth$ = this.store.select(isLoginSelector);
    this.user$ = this.store.select(userSelector);
    this.store.dispatch(isAuth());
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
