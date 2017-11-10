'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._httpService = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'obterTodasNegociacoes',
        value: function obterTodasNegociacoes() {
            return Promise.all([this.obterNegociacoesSemana(), this.obterNegociacoesSemanaAnterior(), this.obterNegociacoesSemanaRetrasada()]).then(function (negociacoes) {
                return negociacoes.reduce(function (arrayConcatenado, array) {
                    return arrayConcatenado.concat(array);
                });
            }).catch(function (error) {
                console.log(error);
                throw new Error(error);
            });
        }
    }, {
        key: 'obterNegociacoesSemana',
        value: function obterNegociacoesSemana() {

            return this._httpService.get('negociacoes/semana').then(function (negociacoes) {
                return negociacoes.map(function (negociacao) {
                    return new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor);
                });
            }).catch(function (error) {
                console.log(error);
                throw new Error('Não foi possível obter as negociações da semana.');
            });
        }
    }, {
        key: 'obterNegociacoesSemanaAnterior',
        value: function obterNegociacoesSemanaAnterior() {

            return this._httpService.get('negociacoes/anterior').then(function (negociacoes) {
                return negociacoes.map(function (negociacao) {
                    return new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor);
                });
            }).catch(function (error) {
                console.log(error);
                throw new Error('Não foi possível obter as negociações da semana anterior.');
            });
        }
    }, {
        key: 'obterNegociacoesSemanaRetrasada',
        value: function obterNegociacoesSemanaRetrasada() {

            return this._httpService.get('negociacoes/retrasada').then(function (negociacoes) {
                return negociacoes.map(function (negociacao) {
                    return new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor);
                });
            }).catch(function (error) {
                console.log(error);
                throw new Error('Não foi possível obter as negociações da semana retrasada.');
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return 'Negociação adicionada com sucesso!';
            }).catch(function (error) {
                throw new Error(error);
            });
        }
    }, {
        key: 'lista',
        value: function lista() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).then(function (negociacoes) {
                return negociacoes;
            }).catch(function (error) {
                throw new Error(error);
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection).apagaTodos();
            }).then(function () {
                return 'Negociações removidas com sucesso!';
            }).catch(function (error) {
                throw new Error(error);
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {
            return this.obterTodasNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !listaAtual.negociacoes.some(function (negociacaoExistente) {
                        return negociacao.isEquals(negociacaoExistente);
                    });
                });
            }).catch(function (error) {
                throw new Error(error);
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map