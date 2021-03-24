import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { AboutUs } from '../about-us.model';
import { AboutUsService } from '../service/about-us.service';

@Component({
  selector: 'app-about-us-list',
  templateUrl: './about-us-list.component.html',
  styleUrls: ['./about-us-list.component.scss'],
})
export class AboutUsListComponent implements OnInit {
  aboutUs: Observable<AboutUs[]>;

  cols = 2;

  constructor(
    private aboutUsService: AboutUsService,
    public breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.getAboutUsTeam();
    this.colsChange();
  }

  getAboutUsTeam() {
    this.aboutUs = this.aboutUsService.getTeam();
  }

  colsChange() {
    this.breakpointObserver.observe(['(max-width: 600px)']).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.cols = 1;
      } else {
        this.cols = 2;
      }
    });
  }
}
