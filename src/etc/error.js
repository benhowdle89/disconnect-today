class ApiError extends Error {
    constructor(code, msg) {
        const errorMessage = typeof msg == 'string' ? msg : JSON.stringify(msg)
        super(errorMessage)
        this.code = code
    }
}

export default ApiError
