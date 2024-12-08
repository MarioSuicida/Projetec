import { HttpClient } from '@angular/common/http'; // Importa HttpClient para realizar requisições HTTP.
import { Injectable } from '@angular/core'; // Importa Injectable para que o serviço possa ser injetado.
import { Observable } from 'rxjs'; // Importa Observable para lidar com operações assíncronas.

export interface usuarios {
  ID: string; // Identificador único do usuário.
  primeiro_nome: string; // Primeiro nome do usuário.
  segundo_nome: string; // Sobrenome do usuário.
  email: string; // Email do usuário.
  senha: string; // Senha do usuário.
}

export interface UsuarioUpdate {
  ID: string; // Identificador único do usuário.
  primeiro_nome: string; // Primeiro nome do usuário.
  segundo_nome: string; // Sobrenome do usuário.
  email: string; // Email do usuário.
}

export interface transacao {
  [x: string]: any;
  novaCategoriaGasto: any;
  novaCategoriaRenda: any;
  categoriaGasto: any;
  categoriaRenda: any;
  ID: string; // Identificador único da transação.
  ID_usuario: string; // Identificador do usuário associado à transação.
  valor: string; // Valor da transação.
  tipo: string; // Tipo de transação (ex.: crédito, débito).
  recorrente: string; // Indica se a transação é recorrente.
  categoria: string; // Categoria da transação (ex.: alimentação, transporte).
  mes: string; // Mês da transação.
  ano: string; // Ano da transação.
  dia: string; // Dia da transação.
}

export interface planejamento_mensal {
  data: any;
  novaCategoriaGasto: any;
  categoriaGasto: any;
  ID: string; 
  ID_usuario: string; 
  meta_de_despesas: string; 
  gastos: string; 
  recorrente: string; 
  categoria: string; 
  mes: string; 
  ano: string; 
  valor?: string; // Adiciona a propriedade "valor", se necessário
}


export interface categorias {
  ID: string; // Identificador único da categoria.
  ID_usuario: string; // Identificador do usuário associado à categoria.
  Categorias: string; // Nome da categoria.
}

@Injectable({
  providedIn: 'root' // Indica que o serviço pode ser injetado em qualquer parte da aplicação.
})
export class usuariosService {
  private url = "http://localhost"; // URL base da API.

  constructor(private http: HttpClient) { } // Injeta HttpClient para realizar requisições HTTP.

  // Método genérico para listar todos os registros de uma tabela.
  listar<T>(tabela: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/${tabela}`); // Faz uma requisição GET para a tabela especificada.
  }

  // Método genérico para obter todos os registros de uma tabela com base em uma coluna e valor específicos.
  getAll<T>(tabela: string, coluna: string, valor: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/${tabela}/${coluna}/${valor}`);
  }

  // Método genérico para remover um registro de uma tabela com base em uma coluna e valor específicos.
  Remover<T>(tabela: string, coluna: string, valor: string): Observable<T[]> {
    return this.http.delete<T[]>(`${this.url}/${tabela}/${coluna}/${valor}`);
  }

  // Método genérico para criar um novo registro em uma tabela.
  criar<T>(tabela: string, dados: any): Observable<T> {
    return this.http.post<T>(`${this.url}/${tabela}`, dados);  // Ex.: 'transacao' ou 'transacoes'
  }

  // Método genérico para atualizar um registro existente em uma tabela com base em uma coluna e valor específicos.
  atualizar<T>(tabela: string, coluna: string, valor: string, dados: any): Observable<T> {
    return this.http.put<T>(`${this.url}/${tabela}/${coluna}/${valor}`, dados);
  }

  // Método para fazer login de um usuário com email e senha.
  login(email: string, senha: string): Observable<usuarios[]> {
    return this.http.get<usuarios[]>(`${this.url}/usuarios?email=${email}&senha=${senha}`);
  }

  // Método para atualizar informações de um usuário específico.
  atualizarUsuario(userId: string, dados: UsuarioUpdate): Observable<UsuarioUpdate> {
    return this.http.put<UsuarioUpdate>(`${this.url}/usuarios/ID/${userId}`, dados);
  }

  // Método para obter os gastos de um usuário específico.
  getGastos(ID_usuario: string): Observable<transacao[]> {
    return this.http.get<transacao[]>(`${this.url}/transacao`, {
      params: { ID_usuario, tipo: 'gasto' } // Filtra somente transações do tipo "gasto"
    });
  }


  
  
  
}
