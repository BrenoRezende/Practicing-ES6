class NegociacaoService {

    constructor() {
        this._httpService = new HttpService();
    }

    obterNegociacoesSemana() {

        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/semana')
            .then(negociacoes => {
                resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)));
            })
            .catch(error => {
                console.log(error);
                reject('Não foi possível obter as negociações da semana.');
            });
        });
    }

    obterNegociacoesSemanaAnterior() {

        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)));
                })
                .catch(error => {
                    console.log(error);
                    reject('Não foi possível obter as negociações da semana anterior.');
                });
        });
    }

    obterNegociacoesSemanaRetrasada() {

        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)));
                })
                .catch(error => {
                    console.log(error);
                    reject('Não foi possível obter as negociações da semana retrasada.');
                });
        });
    }

}