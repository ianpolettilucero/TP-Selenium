import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error: string

  constructor(private router: Router) {
    this.error = ""
  }

  public login(username: string, password: string){
    if(username == "juan" && password == "1234"){
      this.router.navigate(['/menu'])
    }else{
      this.error = "Usuario o contraseña incorrectos"
    }
    
  }
}
