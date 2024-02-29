<template>
  <div>
    <el-dialog v-model="globalProperties.dialogVisible" title="ADD NODE" width="50%">
      <el-form ref="formRef" :model="ruleForm" label-width="130px">
        <el-form-item label="Line Label" prop="label">
          <el-input v-model="ruleForm.label" placeholder="please input"></el-input>
        </el-form-item>
        <el-form-item label="Arrow Position" prop="marker">
          <el-radio-group v-model="ruleForm.marker">
            <el-radio :label="'arrow'">arrowLeft</el-radio>
            <el-radio :label="'arrowclosed'">arrowRight</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Line Color" prop="stroke">
          <el-input v-model="ruleForm.stroke" placeholder="please input"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="globalProperties.dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitInfo"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { dataBaseNodes } from '@/store/dataBaseNodes';
import { storeToRefs } from 'pinia';
import { MarkerType } from '@vue-flow/core';
const stateNodes = dataBaseNodes();
const { nodes } = storeToRefs(stateNodes);
const globalProperties = reactive({
  dialogVisible: false,
  currentNodeIndex: ''
});
const editEdge = (_index) => {
  globalProperties.dialogVisible = true;
  globalProperties.currentNodeIndex = _index;
  const data = nodes.value[globalProperties.currentNodeIndex];
  ruleForm.label = data.label || '';
  ruleForm.marker = data.markerStart || data.markerEnd || '';
  if (data.style) {
    ruleForm.stroke = data.style.stroke || '';
  }
};
const ruleForm = reactive({
  label: '', //edge text
  marker: '', // 指向
  markerEnd: '', // 指向 source
  markerStart: '', // 指向 target
  stroke: '' // edge border 颜色
});
const submitInfo = () => {
  const data = nodes.value[globalProperties.currentNodeIndex];
  data.label = ruleForm.label;
  data.marker = ruleForm.marker;
  data.style = {};
  data.style.stroke = ruleForm.stroke;
  if (ruleForm.marker === 'arrow') {
    data.markerStart = MarkerType.Arrow;
    data.markerEnd = '';
  } else {
    data.markerEnd = MarkerType.ArrowClosed;
    data.markerStart = '';
  }

  globalProperties.dialogVisible = false;
};
defineExpose({
  globalProperties,
  editEdge
});
</script>

<style lang="scss" scoped></style>
