import { Component } from '@angular/core';
import { mockData } from './weather-data';

@Component({
  selector: 'my-app',
  template: `
      <div class="example-config">
        <label for="bu">Base Unit</label>
        <select id="bu" [(ngModel)]="baseUnit">
          <option value="hours">hours</option>
          <option value="minutes">minutes</option>
          <option value="days">days</option>
          <option value="weeks" selected>weeks</option>
          <option value="months">months</option>
        </select>
      </div>

      <label for="baseUnitStep" >baseUnitStep</label>
      <input type="number" min="1" [(ngModel)]="baseUnitStep"  /><br/>

      <label for="maxDivisions" >Max divisions</label>
      <input type="number" min="0" [(ngModel)]="maxDivisions"  /><br/>

      Min: {{min}}<br/>
      Max: {{max}}<br/>

      <kendo-chart>
        <kendo-chart-series>
          <kendo-chart-title text="Daily Max (&deg;C)"></kendo-chart-title>
          <kendo-chart-series-item type="column" [data]="data"
                                   field="TMax" [tooltip]="{visible:true}" categoryField="Date"
                                   [aggregate]="aggregate">
            <kendo-chart-series-item-tooltip >
            <ng-template let-value="value" let-dataItem="dataItem">
            {{ dataItem.Date.getHours() }}:{{dataItem.Date.getMinutes()}} -- {{value}}
          </ng-template>
                   </kendo-chart-series-item-tooltip>
          </kendo-chart-series-item>
        </kendo-chart-series>

        <kendo-chart-category-axis>
            <kendo-chart-category-axis-item [baseUnit]="baseUnit" [maxDivisions]="maxDivisions" [baseUnitStep]="baseUnitStep">
            </kendo-chart-category-axis-item>
        </kendo-chart-category-axis>
      </kendo-chart>
    `,
})
export class AppComponent {
  public data: any[] = mockData();
  public baseUnit = 'minutes';
  public baseUnitStep = 5;
  public maxDivisions = 8;
  public aggregate = 'first';
  min = new Date(
    Math.min.apply(
      Math,
      mockData().map((d) => d.Date.getTime())
    )
  );
  max = new Date(
    Math.max.apply(
      Math,
      mockData().map((d) => d.Date.getTime())
    )
  );

  constructor() {
    console.log('min', this.min);
    console.log('max', this.max);
    this.getMaxDivisions();
  }

  private getMaxDivisions() {
    let diff = (this.max - this.min) / 3600000;
    let interval = 2; // every 2h
    this.maxDivisions = Math.ceil(diff / interval) + 1;
  }
}
