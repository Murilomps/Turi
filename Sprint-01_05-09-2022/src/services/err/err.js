class InvalidArgumentError extends Error {

    constructor(mensagem) {
        super(mensagem);
        this.name='InvalidArgumentError';
    };
}

class InternalServerError extends Error {

    constructor(mensagem) {
        super(mensagem);
        this.name='InvalidArgumentError';
    }
}

export { InvalidArgumentError, InternalServerError };