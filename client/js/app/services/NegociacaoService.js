class NegociacaoService {

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

}