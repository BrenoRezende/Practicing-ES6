import { HttpService } from './HttpService';
import { ConnectionFactory } from './ConnectionFactory';
import { Negociacao } from '../models/Negociacao';
import { NegociacaoDao } from '../dao/NegociacaoDao';

export class NegociacaoService {

    constructor() {
        this._httpService = new HttpService();
    }

    obterTodasNegociacoes() {
        return Promise.all([
            this.obterNegociacoesSemana(),
            this.obterNegociacoesSemanaAnterior(),
            this.obterNegociacoesSemanaRetrasada()
        ])
        .then(negociacoes => negociacoes.reduce((arrayConcatenado, array) => arrayConcatenado.concat(array)))
        .catch(error => {
            console.log(error);
            throw new Error(error);
        })
    }

    obterNegociacoesSemana() {

        return this._httpService.get('negociacoes/semana')
            .then(negociacoes =>
                negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível obter as negociações da semana.');
            });
    }

    obterNegociacoesSemanaAnterior() {

        return this._httpService.get('negociacoes/anterior')
            .then(negociacoes =>
                negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível obter as negociações da semana anterior.');
            });
    }

    obterNegociacoesSemanaRetrasada() {

        return this._httpService.get('negociacoes/retrasada')
            .then(negociacoes =>
                negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível obter as negociações da semana retrasada.');
            });
    }

    cadastra(negociacao) {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso!')            
            .catch(error => {
                throw new Error(error);
            });
    }

    lista() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => negociacoes)
            .catch(error => {
                throw new Error(error);
            })
    }

    apaga() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection).apagaTodos())
            .then(() => 'Negociações removidas com sucesso!')
            .catch(error => {
                throw new Error(error);
            });
    }

    importa(listaAtual) {
        return this.obterTodasNegociacoes()
            .then(negociacoes => negociacoes.filter(negociacao =>
                !listaAtual.negociacoes.some(negociacaoExistente =>
                    negociacao.isEquals(negociacaoExistente))))
            .catch(error => {
                throw new Error(error);
            });
    }

}