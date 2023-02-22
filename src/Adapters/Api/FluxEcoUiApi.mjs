import {HttpBinding} from "../Core/Domain/ValueObjects/HttpBinding.mjs";

/**
 * @typedef {Object} TreeNode
 * @property {string|null} parentId
 * @property {string} nodeId
 * @property {object} nodeData
 */

/**
 * @type FluxEcoUiApi
 */
export class FluxEcoUiApi {
    name = "flux-eco-ui";
    /**
     * @var {FluxEcoUiStateBroadcasterApi}
     */
    #stateBroadcaster;
    /**
     * @var {FluxEcoUiTreeApi}
     */
    #treeManager;
    /**
     * @var {Map}
     */
    #bindings;

    /**
     * @param {FluxEcoUiStateBroadcasterApi} stateBroadcaster
     * @param {FluxEcoUiTreeApi} treeManager
     */
    constructor(
        stateBroadcaster,
        treeManager
    ) {
        this.#stateBroadcaster = stateBroadcaster;
        this.#treeManager = treeManager;
        this.#bindings = new Map();
    }

    /**
     * @return {Promise<FluxEcoUiApi>}
     */
    static async new() {
        const stateBroadcaster = await (await import("../../../libs/flux-eco-ui-state-broadcaster/src/Adapters/Api/FluxEcoUiStateBroadcasterApi.mjs")).FluxEcoUiStateBroadcasterApi.new();
        const treeStateApi = await (await import("../../../libs/flux-eco-ui-tree-state/src/Adapters/Api/FluxEcoUiTreeStateApi.mjs")).FluxEcoUiTreeStateApi.new(stateBroadcaster);
        const treeElementApi = await (await import("../../../libs/flux-eco-ui-tree-element/src/Adapters/Api/FluxEcoUiTreeElementApi.mjs")).FluxEcoUiTreeElementApi.new(
            (nodeState) => treeStateApi.toggleNodeStatusExpanded(nodeState.treeId.value, nodeState.id.value)
        );
        const treeApi = await (await import("../../../libs/flux-eco-ui-tree/src/Adapters/Api/FluxEcoUiTreeApi.mjs")).FluxEcoUiTreeApi.new(
            stateBroadcaster,
            treeStateApi,
            treeElementApi
        );

        return new FluxEcoUiApi(
            stateBroadcaster,
            treeApi
        )
    }

    /**
     *
     * @param {string} bindingId
     * @param {string} protocol
     * @param {string} host
     * @param {string} port
     * @param {object} security
     * @return  {Promise<void>}
     */
    async registerHttpBinding(bindingId, protocol, host, port, security) {
        this.#bindings.set(bindingId, await HttpBinding.new(
            protocol, host, port, security
        ));
    }

    /**
     *
     * @param {object} parentElement
     * @param {string}treeId
     * @param {TreeNode[]} treeNodes
     */
    async renderTree(
        parentElement,
        treeId,
        treeNodes
    ) {

        const nodeSchema = {"type": "object", "properties": {"label": {"type": "string"}}};
        const renderTreeOnNodesProvidedCallback = await this.#treeManager.createRenderTreeOnNodesProvidedCallback(parentElement, treeId, nodeSchema, false);
        renderTreeOnNodesProvidedCallback(treeNodes);
    }
}