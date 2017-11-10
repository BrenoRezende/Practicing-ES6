const dbName = 'negotiationDB';
const version = 1;
const stores = ['negociacoes'];
var connection = null;
var close = null;

export class ConnectionFactory {

    constructor() {
        throw new Error('Não é possível instanciar essa classe');
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let openDBRequest = window.indexedDB.open(dbName, version);

            openDBRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);
            };

            openDBRequest.onsuccess = e => {

                if (!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = () => {
                        throw new Error('Você não pode fechar diretamente a conexão.');
                    };
                }

                resolve(connection);
            };

            openDBRequest.onerror = e => {
                console.log(e.target.error);
                reject(e.target.error.name);
            };
        });

    }

    static _createStores(connection) {

        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }

            connection.createObjectStore(store, { autoIncrement: true });
        });

    }

    static closeConnection() {
        if (connection) {
            close();
            connection = null;
        }
    }
}


