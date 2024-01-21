import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbdToastGlobal } from '../components/toaster/toast-global.component';
import { ToastService } from './toast.service';
import { Observable } from 'rxjs';
import { environment  } from '../../environments/environment';
import { Beneficiario } from '../models/beneficiario';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  public API = environment.apiUrl;
  public API_BENEFICIARIO = this.API + '/api/beneficiarios';

  toast = new NgbdToastGlobal(this.toastService);

  constructor(private http: HttpClient, private toastService: ToastService) { }

  listar(): Observable<any> {
    return this.http.get(this.API_BENEFICIARIO + '/listar');
  }

  incluir(beneficiario: Beneficiario): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.API_BENEFICIARIO + "/incluir", beneficiario);
    return result;
  }

  salvar(beneficiario: Beneficiario): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.API_BENEFICIARIO + "/salvar", beneficiario);
    return result;
  }

  excluir(id: number) {
    return this.http.delete(this.API_BENEFICIARIO + "/excluir/" + id);
  }
}