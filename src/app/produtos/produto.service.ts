import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Produto } from './produto.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProdutoService {

  private produtoUrl = 'http://localhost:3000/api/v1/produtos';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET heroes from the server */
  getProdutos (): Observable<Produto[]> {
    console.log('get em acao');
    return this.http.get<Produto[]>(this.produtoUrl)
      .pipe(
        tap(produtos => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
  }
}

