import { Component, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { data, graphType } from './data';

@Component({
  selector: 'app-profile-chart',
  templateUrl: './profile-chart.component.html',
  styleUrls: ['./profile-chart.component.scss'],
})
export class ProfileChartComponent implements OnChanges {
  @Input() checkedStyle: string;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = [];

  barChartType: ChartType = 'bar';

  barChartLegend = false;

  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    {
      data: [],
      label: '',
    },
  ];

  constructor() {
    data.forEach((el) => {
      this.barChartLabels.push(el.date);
    });
  }

  ngOnChanges() {
    this.barChartData[0].data = [];
    if (this.checkedStyle === graphType.daily) {
      data.forEach((el) => {
        this.barChartData[0].data.push(el.count);
      });
    }
    if (this.checkedStyle === graphType.total) {
      data.reduce((acc, el) => {
        this.barChartData[0].data.push(el.count + acc);
        return acc + el.count;
      }, 0);
    }
  }
}
