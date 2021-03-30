import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-profile-chart',
  templateUrl: './profile-chart.component.html',
  styleUrls: ['./profile-chart.component.scss'],
})
export class ProfileChartComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = [
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
    '01.02.21',
  ];

  barChartType: ChartType = 'bar';

  barChartLegend = true;

  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    {
      data: [
        10,
        15,
        25,
        18,
        30,
        1,
        10,
        15,
        25,
        18,
        30,
        1,
        10,
        15,
        25,
        18,
        30,
        1,
        10,
        15,
        25,
        18,
        30,
        1,
      ],
      label: 'Learned Words',
    },
  ];
}
