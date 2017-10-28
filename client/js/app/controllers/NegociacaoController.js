class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new ListaNegociacoes(model =>
            this._negociacaoView.update(model));
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._negociacaoView = new NegociacaoView($('#negociacaoView'));
    }

    adiciona(event) {
        event.preventDefault();
        
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();

        this._mensagemView.update(new Mensagem('Negociação adicionada com sucesso!'));
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagemView.update(new Mensagem('Negociações removidas com sucesso!'));
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