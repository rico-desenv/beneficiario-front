import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../../services/cadastro.service';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ToastService } from 'src/app/services/toast.service';
import { NgbdToastGlobal } from '../../components/toaster/toast-global.component';
import { Beneficiario } from 'src/app/models/beneficiario';
import { Documento } from 'src/app/models/documento';

export class NomeBeneficiario {
  id!: number;
  name!: String;
};

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  keywordNome = 'name';
  notFoundText = '';  
  beneficiarios: any;
  itemSelecionado: number = 0;
  showDetalhe: boolean = false;  
  showDetalheDoc: boolean = false;  
  loading: boolean = false;  

  beneficiario: Beneficiario = new Beneficiario;
  documento: Documento = new Documento;
  listNomeBeneficiario: NomeBeneficiario[] = [];

  nome: String = '';
  telefone: String = '';

  dataNascimento!: Date;

  toast = new NgbdToastGlobal(this.toastService);

  constructor(
    private service: CadastroService,
    private confirmationDialogService: ConfirmationDialogService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.listBeneficiarios();    
  }

  async listBeneficiarios() {
    this.beneficiarios = [];
    let resp = await this.service.listar();
    resp.subscribe((data: any) => {
        this.beneficiarios = data.resposta; 
      }
    );
  }

  editar(beneficiario: Beneficiario) {
    this.showDetalhe = true;
    this.itemSelecionado = beneficiario.id;
    this.beneficiario = beneficiario;
  }

  incluir() {
    this.showDetalhe = true;
    this.itemSelecionado = 0;
    this.beneficiario = new Beneficiario;
  }

  incluirDoc() {
    this.showDetalheDoc = true;
    this.documento = new Documento;
  }

  excluir(id: number, nome: String) {
    this.confirmationDialogService.confirm('Beneficiarios', 'Confirma exclusão do Beneficiario ' + nome + ' ?')
      .then((confirmed) => {
        if (confirmed) {
          this.loading = true;
          this.service.excluir(id).subscribe(result => {
            this.itemSelecionado = 0;
            this.listBeneficiarios();
            this.loading = false;
            this.toast.showSuccess("Sucesso. Beneficiario removido!")
          }, error => console.error(error));
        }
      })
  }

  pesquisa() {

  }

  closeDetalhe() {
    this.showDetalhe = false;
    this.itemSelecionado = 0;
  }

  showLoading() {
    this.loading = true;
  }

  closeLoading() {
    this.loading = false;
  }

  selectEvent(item: any) {
    this.beneficiarios.forEach((element: Beneficiario) => {
      if (element.id == item.id) {
        this.editar(element);
      }
    });        
  }

  onChangeSearch(val: string) {

  }

  onFocused(e: any) {

  }

  selecionada(id: number) {
    if (this.itemSelecionado == id) 
      return "linhaSelecionada";

    return "";
  }

  salvar() {
    this.service.salvar(this.beneficiario).subscribe(result => {
        this.listBeneficiarios();    
    }, error => console.error(error));
  }

  salvarDoc() {
    this.beneficiario.documentos.push(this.documento);
    this.salvar();
  }

}