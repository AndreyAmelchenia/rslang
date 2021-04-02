import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Path } from '../../../shared/models/router.model';
import { isAuth, logout } from '../../../redux/actions/auth.actions';
import { IUser } from '../../../redux/models/user.modele';
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

  isAuth$: Observable<boolean>;

  user$: Observable<IUser>;

  constructor(private breakpointObserver: BreakpointObserver, private store: Store) {}

  path = null;

  onLogout() {
    this.store.dispatch(logout());
  }

  ngOnInit() {
    this.path = Path;
    this.isAuth$ = this.store.select(isLoginSelector);
    this.user$ = this.store.select(userSelector);
    this.store.dispatch(isAuth());
  }
}
