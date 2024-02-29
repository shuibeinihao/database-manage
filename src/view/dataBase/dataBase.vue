<template>
  <VueFlow
    v-model="nodes"
    @nodeDoubleClick="nodeDoubleClickHandler"
    @edgeDoubleClick="edgeDoubleClickHandler"
    class="vue-flow-info"
    elevate-edges-on-select
    @edgesChange="edgesChange"
    @nodesChange="nodesChange"
  >
    <!-- fit-view-on-init -->
    <!-- :default-zoom="1" -->
    <MiniMap />
    <Controls />
    <Background :variant="BackgroundVariant.Lines" />
    <Panel :position="PanelPosition.TopLeft">
      <ElButton @click="addRandomNode" plain type="primary">add node</ElButton>
      <!-- <ElButton @click="updateNode" type="warning" plain>update node</ElButton>
      <ElButton @click="removeNode" type="danger" plain>remove node</ElButton>
      <ElButton type="warning" plain @click="editEdge">edit edge</ElButton>
      <ElButton type="danger" plain @click="removeNode">remove edge</ElButton> -->
      <ElButton @click="saveNode" plain type="success">convert</ElButton>
      <ElButton @click="clearNode" plain type="warning">clear</ElButton>
      <ElButton @click="saveNode" plain type="success">save</ElButton>
    </Panel>
    <Panel :position="PanelPosition.TopRight">
      <NodeFields ref="nodeFieldsRef" :currentNode="currentNodeProps"></NodeFields>
    </Panel>
  </VueFlow>
  <AddNode ref="addNodeInfoRef" :currentNodeId="currentId"></AddNode>
  <EditEdge ref="editEdgeInfoRef"></EditEdge>
</template>

<script setup>
import initJsonInfo from '@/hooks/initData.js';
import analysisData from '@/hooks/analysisData.js';
import initJson from '@/staticData/initJson.js';
import AddNode from './components/AddNode.vue';
import EditEdge from './components/EditEdge.vue';
import NodeFields from './components/NodeFields.vue';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { Panel, PanelPosition, VueFlow, useVueFlow } from '@vue-flow/core';
import { Background, BackgroundVariant } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import { dataBaseNodes } from '@/store/dataBaseNodes';
const stateNodes = dataBaseNodes();
const { nodes, allData, edges, codes } = storeToRefs(stateNodes);
const { addEdges, onConnect, toObject } = useVueFlow();

onMounted(() => {
  // nodes.value = initJsonInfo(initJson);
});

const addNodeInfoRef = ref();
const editEdgeInfoRef = ref();
const nodeFieldsRef = ref();
const currentNodeProps = ref({});
let currentId = ref(); //选中的当前节点id
onConnect((params) => addEdges([params]));

// add new node
const addRandomNode = () => {
  addNodeInfoRef.value.init();
};

const edgeDoubleClickHandler = () => {
  editEdgeInfoRef.value.editEdge(getIndex());
};
// save node and edges
const saveNode = () => {
  let aa = toObject();
  allData.value = {};
  allData.value = aa;
  edges.value = aa.edges;
  console.log(nodes.value);
  let obj = analysisData(nodes.value);
  codes.value = JSON.stringify(obj, null, '\t');
};

const clearNode = () => {
  nodes.value = [];
  codes.value = '';
};

// remove node
// const removeNode = () => {
//   if (currentId.value) {
//     nodes.value.splice(getIndex(), 1);
//   } else {
//     ElMessage({
//       message: 'Please select a node',
//       type: 'warning'
//     });
//   }
// };

const nodesChange = (props) => {
  if (props.length > 0 && props[0].type === 'select') {
    const bol = props.some((item) => {
      return item.selected === true;
    });
    if (bol) {
      const arr = props.filter((item) => {
        return item.selected === true;
      });
      currentId.value = arr[0].id;
    } else {
      currentId.value = '';
    }
  }
};

const nodeDoubleClickHandler = () => {
  addNodeInfoRef.value.updateNode(getIndex());
};

// const updateNode = () => {
//   if (currentId.value) {
//     addNodeInfoRef.value.updateNode(getIndex());
//   } else {
//     ElMessage({
//       message: 'Please select a node',
//       type: 'warning'
//     });
//   }
// };

const edgesChange = (props) => {
  const bol = props.some((item) => {
    return item.selected === true;
  });
  console.log('props', props);
  if (bol) {
    const arr = props.filter((item) => {
      return item.selected === true;
    });
    currentId.value = arr[0].id;
  } else {
    currentId.value = '';
  }
  console.log('currentId.value', currentId.value);
};

// const editEdge = () => {
//   if (currentId.value) {
//     editEdgeInfoRef.value.editEdge(getIndex());
//   } else {
//     ElMessage({
//       message: 'Please select a node',
//       type: 'warning'
//     });
//   }
// };

const getIndex = () => {
  let index = nodes.value.findIndex((item) => {
    return item.id === currentId.value;
  });
  return index;
};
</script>

<style lang="scss" scoped>
.vue-flow-info {
  width: calc(100% - 200px);
  height: calc(100% - 64px);
}
:deep(.vue-flow__node-default, .vue-flow__node-input, .vue-flow__node-output) {
  padding: 2px 10px;
}
:deep(.vue-flow__node-default.selected) {
  border: 1px solid #00f;
}
:deep(.vue-flow__arrowhead) {
  polyline {
    stroke-width: 2;
  }
}
:deep(.vue-flow__node-input .vue-flow__handle) {
  display: none;
}
</style>
