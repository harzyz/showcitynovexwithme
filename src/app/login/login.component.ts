import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required]
    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const user = res.find((exists:any)=>{
        return exists.email === this.loginForm.value.email
        && exists.password === this.loginForm.value.password
      });
      if(user) {
        this.router.navigate(['/body']);
        alert('Login Succesful');
        this.loginForm.reset();
      }else {
        alert('User not Found')
      }
    })
  }
}
