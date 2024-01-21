import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login';
import { CadastroComponent } from './components/cadastro/cadastro.component';

const routes: Routes = [
   {path:"cadastro",component:CadastroComponent},
   { path: 'login', component: LoginComponent },
   { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
