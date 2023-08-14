import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  ingreso: boolean
  casa: boolean

  constructor(){
    this.ingreso = false
    this.casa = true
  }
  public ingresar(){
    this.ingreso = true
    this.casa = false
  }
  public home(){
    this.ingreso = false
    this.casa = true
  }


}
