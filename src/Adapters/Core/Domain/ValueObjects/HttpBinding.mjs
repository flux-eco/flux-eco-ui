/**
 * The nested set for a tree node.
 * @type {HttpBinding}
 * @property {string} protocol
 * @property {string} host
 * @property {string} port
 * @property {object} security
 */
export class HttpBinding {

    constructor(bindingId, protocol, host, port, security) {
        this.protocol = protocol;
        this.host = host;
        this.port = port;
        this.security = security;
    }

    /**
     * @param {string} protocol
     * @param {string} host
     * @param {string} port
     * @param {object} security
     * @return {HttpBinding}
     */
    static async new(protocol, host, port, security) {
        return new HttpBinding(
            protocol, host, port, security
        );
    }

    /**
     * @return {string}
     */
    get baseUrl() {
        return this.protocol + "://" + this.host + ":" + this.port
    }
}