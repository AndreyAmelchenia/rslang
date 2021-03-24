import { Component } from '@angular/core';
import { AboutUsService } from '../service/about-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  providers: [AboutUsService],
})
export class AboutUsComponent {}
