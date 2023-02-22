# FluxEcoUi
## FluxEcoTree
### Usage
``` javascript
import {FluxEcoUiApi} from "../src/Adapters/Api/FluxEcoUiApi.mjs";

const api = await FluxEcoUiApi.new();

await api.toggleLogStatusEnabled();


const parentElement = document.body;
const treeId = "123";

const treeNodes = [
    {parentId: null, nodeId: "firstNode", nodeData: {"label": "First node"}},
    {parentId: "firstNode", nodeId: "child_node", nodeData: {"label": "A child node"}},
    {parentId: "firstNode", nodeId: "second_child_node", nodeData: {"label": "A second child node"}},
    {parentId: null, nodeId: "topLevelNode", nodeData: {"label": "A second top level node"}}
];
await api.renderTree(parentElement, treeId, treeNodes)
```