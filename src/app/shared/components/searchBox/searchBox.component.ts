import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './searchBox.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class SearchBoxComponent {

  // @ViewChild('txtInputSearchBox')
  // public txtInput!: ElementRef<HTMLInputElement>

  @Input()
  public palaceholder: string = '';


  @Output()
  public onValueSearch = new EventEmitter<string>();

  searchInput(value: string): void{
    //const searchValue = this.txtInput.nativeElement.value;
    //this.InputSearchBox.emit(searchValue);
    this.onValueSearch.emit(value);
  }


}
