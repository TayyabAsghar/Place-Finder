class ReactError extends Error {
    readonly statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
};

export default ReactError;