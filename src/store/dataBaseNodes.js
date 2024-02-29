import { defineStore } from 'pinia';

export const dataBaseNodes = defineStore({
  id: 'nodes',
  state() {
    return {
      nodes: [], //字段
      edges: [], //关联关系线
      allData: {}, // 包括 nodes edges
      codes: '' // 右侧代码编辑器代码
    };
  },
  actions: {
    addNode(val) {
      this.nodes.push(val);
    },
    removeNode(val) {
      this.nodes.splice(val, 1);
    },
    removeEdges(val) {
      this.edges.splice(val, 1);
    },
    addEdges(val) {
      this.edges.push(val);
    },
    removeCodes() {
      this.codes = '';
    },
    addCodes(val) {
      this.codes = val;
    }
  }
});
