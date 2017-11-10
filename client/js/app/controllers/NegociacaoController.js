import { Negociacao } from '../models/Negociacao';
import { ListaNegociacoes } from '../models/ListaNegociacoes';
import { Mensagem } from '../models/Mensagem';
import { NegociacaoView } from '../views/NegociacaoView';
import { MensagemView } from '../views/MensagemView';
import { NegociacaoService } from '../services/NegociacaoService';
import { DateHelper } from '../helpers/DateHelper';
import { Bind } from '../helpers/Bind';

class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacaoView($('#negociacaoView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

        this._ordemAtual = '';

        this._negociacaoService = new NegociacaoService();

        this._init();
    }

    _init() {
        this._negociacaoService.lista()
            .then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(error => this._mensagem.texto = error);

        setInterval(() => {
            this.importaNegociacoes();
        }, 3000);
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();
        this._negociacaoService.cadastra(negociacao)
            .then(msg => {
                this._listaNegociacoes.adiciona(negociacao);
                this._limpaFormulario();
                this._mensagem.texto = msg;
            })
            .catch(error => this._mensagem.texto = error);
    }

    apaga() {
        this._negociacaoService.apaga()
            .then(msg => {
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = msg;
            })
            .catch(error => this._mensagem.texto = error);
    }

    importaNegociacoes() {

        this._negociacaoService.importa(this._listaNegociacoes)
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações do período importadas com sucesso';
        })
        .catch(error => this._mensagem.texto = error);
    }

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => b[coluna] - a[coluna]);
        }
        this._ordemAtual = coluna;
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textToDate(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}

let negociacaoController = new NegociacaoController();

export function currentInstance() {
    return negociacaoController;
}
