class ExpressError extends Error {
    constructor(status,message) {
        super()
        // importante que la propiedad message se llame así (no msg u otra cosa)
        // ya que es el nombre por defecto de la clase Error para el mensaje.
        this.message = message
        this.status = status
    }
}

module.exports = ExpressError