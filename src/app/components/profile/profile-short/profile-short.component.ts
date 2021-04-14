import { Component, Input } from '@angular/core';
import { IDailyStats } from 'src/app/common/models/stats.model';

@Component({
  selector: 'app-profile-short',
  templateUrl: './profile-short.component.html',
  styleUrls: ['./profile-short.component.scss'],
})
export class ProfileShortComponent {
  @Input() shortData: IDailyStats;
}
