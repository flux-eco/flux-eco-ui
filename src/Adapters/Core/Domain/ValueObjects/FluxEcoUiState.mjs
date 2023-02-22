/**
 * @typedef Status
 * @property {boolean} logEnabled
 */

/**
 * @type FluxEcoUiState
 * @property {Status} status
 */
export class FluxEcoUiState {
    /**
     * Creates a new Flux Eco State object.
     *
     * @param {Status} status - status flags
     */
    static new(status) {
        return {
            status
        };
    }
}