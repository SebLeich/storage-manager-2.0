import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { IContainer } from 'src/app/interfaces/i-container.interface';

@Component({
  selector: 'app-container-preview',
  templateUrl: './container-preview.component.html',
  styleUrls: ['./container-preview.component.css']
})
export class ContainerPreviewComponent implements OnChanges, OnInit {

  @Input() public container!: IContainer;

  public datasets = [
    {
      backgroundColor: ['rgba(101, 166, 90,  0.4)', 'rgba(214, 55, 55,  0.4)'],
      borderColor: ['rgba(101, 166, 90, 1.0)', 'rgba(214, 55, 55, 1.0)'],
      data: [0, 0]
    }
  ];
  public labels = ['used', 'unused'];
  public type = 'doughnut';
  public options: ChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      position: 'bottom'
    }
  }
  public percentage: string = '0';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['container']) this._calculateUsedSpace();
  }

  ngOnInit(): void {
    this._calculateUsedSpace();
  }

  private _calculateUsedSpace() {
    if (!this.container || !Array.isArray(this.container.goods)) return;
    let used = this.container.goods.reduce((x, curr) => x += (curr.length * curr.width * curr.height), 0);
    let total = this.container.height * this.container.length * this.container.width;
    this.datasets[0].data = [used, total - used];
    this.percentage = ((used / total) * 100).toFixed(0);
  }

}
