import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner-loader',
  templateUrl: './spinner-loader.component.html',
  styleUrls: ['./spinner-loader.component.scss']
})
export class SpinnerLoaderComponent implements OnInit {
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 5;

  constructor() { }

  ngOnInit(): void {
  }

}
