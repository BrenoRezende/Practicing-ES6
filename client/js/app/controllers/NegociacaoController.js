class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacaoView($('#negociacaoView')),
            'adiciona', 'esvazia');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

        this._negociacaoService = new NegociacaoService();
    }

    adiciona(event) {
        event.preventDefault();
        
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações removidas com sucesso!';
    }

    importaNegociacoes() {
        this._negociacaoService.obterNegociacoesSemana((err, negociacoes) => {

            if(err) {
                this._mensagem.texto = err;
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso.';
        });
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}