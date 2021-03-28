import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Path } from '../../shared/router/roter.modele';
import { logout } from '../store/actions/auth.actions';
import { IUser } from '../store/models/user.modele';
import { isLogin, user } from '../store/selectors';

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
    this.isAuth$ = this.store.select(isLogin);
    this.user$ = this.store.select(user);
  }
}
