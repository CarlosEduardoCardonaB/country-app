import { Component } from '@angular/core';

@Component({
  selector: 'shared-loading-spinner',
  standalone: false,
  templateUrl: './loadingSpinner.component.html',
  styles: `
    :host {
      display: block;
    }
    .spinner-container{
      align-items: center;
      background-color: black;
      border-radius: 20px;
      bottom: 15px;
      color: white;
      display: flex;
      padding: 5px 10px;
      position: fixed;
      right: 15px;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
    }
    span{
      margin-left: 5px;
      margin-right: 10px;
    }
  `,
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent { }
