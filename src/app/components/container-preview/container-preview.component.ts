import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
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
      borderColor: ['rgba(101, 166, 90, 1)', 'rgba(214, 55, 55, 1)'],
      data: [0, 0],
      hoverBackgroundColor: ['rgba(101, 166, 90,  0.2)', 'rgba(214, 55, 55,  0.2)'],
      hoverBorderColor: ['rgba(101, 166, 90, .7)', 'rgba(214, 55, 55, .7)'],
    }
  ];
  public labels = ['used', 'unused'];
  public type = 'doughnut';
  public options: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          // @ts-ignore
          label: (tooltipItem) => {
            const dataSets = tooltipItem.dataset.data;
            const index = tooltipItem.dataIndex;
            const data = dataSets[index];
            const total: number = tooltipItem.dataset.data.reduce((previousValue, currentValue) => {
              return (previousValue as number) + (currentValue as number);
            }, 0) as number;
            return `${Math.floor((((data as number) / total) * 100) + 0.5)} %`;
          }
        }
      }
    },
  }
  public percentage: number = 0;

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['container']) this._calculateUsedSpace();
  }

  public ngOnInit(): void {
    this._calculateUsedSpace();
  }

  private _calculateUsedSpace() {
    if (!this.container || !Array.isArray(this.container.goods)) return;
    let used = this.container.goods.reduce((x, curr) => x += (curr.length * curr.width * curr.height), 0);
    let total = this.container.height * this.container.length * this.container.width;
    this.datasets = [...this.datasets.map(dataset => {
      dataset.data = [used, total - used];
      return dataset;
    })];
    this.percentage = ((used / total) * 100);
  }

}
