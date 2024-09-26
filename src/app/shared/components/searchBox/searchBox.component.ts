import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './searchBox.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  //la palabra debouncer no es reservada de angular, es solo una variable, y el tipo de dato Subject<string> es un observable de la librería rjxs que nos sirve para escuchar cuando se deja de copiar por parte del usuario
  private debouncer: Subject<string> = new Subject<string>();
  //Ahora declaramos una variable que nos va a servir para dessubscribirnos de la supscripción que hacemos en el ngOninit
  private debouncerSuscription?: Subscription;

  // @ViewChild('txtInputSearchBox')
  // public txtInput!: ElementRef<HTMLInputElement>

  @Input()
  public palaceholder: string = '';

  @Input()
  public initialValue: string = ''

  @Output()
  public onValueSearch = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      //Este debounceTime lo que hace es escuchar el evento del teclado, y cuando deja de recibir caracteres, entonces da paso al .subscribe (siguiente paso)
      debounceTime( 500 )
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
      //console.log('debauncer value', value);
    })
  }

  //esta directiva destruye todo lo que le iniquemos cuando cambiemos de componente por medio de cambio de ruta o por algun ngIf
  ngOnDestroy(): void {
    //En este caso terminamos la suscripción del debouncerSuscription que es el que esta suscrito a los ingresos del teclado del usuario y en espera a que termine de copiar para lanzar la busqueda
      this.debouncerSuscription?.unsubscribe();
  }

  searchInput(value: string): void{
    //const searchValue = this.txtInput.nativeElement.value;
    //this.InputSearchBox.emit(searchValue);
    this.onValueSearch.emit(value);
  }

  onKeyPress ( searchTerm: string ): void{
    this.debouncer.next (searchTerm);
    //console.log(searchTerm)
  }


}
