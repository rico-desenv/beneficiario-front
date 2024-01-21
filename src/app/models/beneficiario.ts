import { Documento } from "./documento";

export class Beneficiario {
    id!: number;    
    nome!: string;
    telefone!: string;
    dataNascimento!: Date;
    dataInclusao!: Date;
    dataAtualizacao!: Date;
    documentos!: Documento[];
}