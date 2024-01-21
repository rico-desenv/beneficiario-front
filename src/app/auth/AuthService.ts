import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastService } from '../services/toast.service';
import { NgbdToastGlobal } from '../components/toaster/toast-global.component';
import { environment  } from '../../environments/environment';

@Injectable()
export class AuthService {

  toast = new NgbdToastGlobal(this.toastService);
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService) { 
    }

  public login(email: string, pass: string) {
    let credentials = { user: email, pass: pass };
    var url = environment.apiUrl + "/api/auth";
    this.http.post(url, credentials).subscribe({
      next: (r: any) => {
        localStorage.setItem('token', r.token);
        localStorage.setItem('usuario', email);
        this.router.navigate(['/cadastro']);
      },
      error: (err: any) => { this.toast.showDanger("Falha. Email ou senha inválido!");  },
      complete: () => {  }
    });
  }

  public clean() {
    this.toast.ngOnDestroy();
  }

  public getToken() {
    let token = localStorage.getItem('token')
    if (token)
      return token;

    return null;
  }

  private tokenNotExpired() {
    const jwtService: JwtHelperService = new JwtHelperService();
    const item: string | undefined = this.getToken()?.toString();
    return item != null && !jwtService.isTokenExpired(item, 50000);
  }

  public isAuthenticated(): boolean {
    return this.tokenNotExpired();
  }

}