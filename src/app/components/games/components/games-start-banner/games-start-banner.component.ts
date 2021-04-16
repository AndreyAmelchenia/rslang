import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-games-start-banner',
  templateUrl: './games-start-banner.component.html',
  styleUrls: ['./games-start-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesStartBannerComponent {
  @Input() langs: string[] = [];
}
