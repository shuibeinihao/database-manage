<template>
  <div class="code-wrap">
    <div class="toggle" @click="triangleHandle">
      <el-icon v-if="isShow"><CaretLeft /></el-icon>
      <el-icon v-else><CaretRight /></el-icon>
    </div>
    <div class="box" :class="{ 'is-hide': !isShow }">
      <div class="run" v-if="isShow">
        <ElButton @click="setJson" size="small" plain type="success">RUN</ElButton>
        <ElButton @click="clearJson" size="small" plain type="warning">CLEAR</ElButton>
      </div>
      <Codemirror
        class="code"
        v-model="codes"
        :style="{ height: '100%', width: '400px' }"
        :extensions="extensions"
        :options="{ mode: 'application/json' }"
        :autofocus="true"
        :disabled="false"
        @ready="handleClick('ready', $event)"
        @change="handleClick('change', $event)"
        @focus="handleClick('focus', $event)"
        @blur="handleClick('blur', $event)"
      />
    </div>
  </div>
</template>
<script setup>
import { CaretLeft, CaretRight } from '@element-plus/icons-vue';
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { ElMessage } from 'element-plus';
import initJsonInfo from '@/hooks/initData.js';
import { isJson } from '@/utils/common.js';
import { oneDark } from '@codemirror/theme-one-dark';
import { storeToRefs } from 'pinia';
import { dataBaseNodes } from '@/store/dataBaseNodes';
import { nextTick } from 'vue';
const stateNodes = dataBaseNodes();
const { nodes, codes } = storeToRefs(stateNodes);
const extensions = [javascript()];
const handleClick = (type, val) => {
  console.log(type, val);
};
const isShow = ref(true);
// JSON.stringify(initJson, null, '\t')
const setJson = () => {
  if (codes.value) {
    if (!isJson(codes.value)) {
      ElMessage({
        message: 'json格式有误！',
        type: 'warning'
      });
      return false;
    }
    let data = eval('(' + codes.value + ')');
    nextTick(() => {
      let obj = initJsonInfo(data);
      nodes.value = obj;
    });
  } else {
    nextTick(() => {
      nodes.value = [];
    });
  }
};
const clearJson = () => {
  stateNodes.removeCodes();
  nodes.value = [];
};
const triangleHandle = () => {
  isShow.value = !isShow.value;
};
</script>
<style scoped lang="scss">
.code-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  .toggle {
    cursor: pointer;
  }
}
.box {
  height: 100%;
  transition: all 0.3s;
  .run {
    padding: 0 0px 10px 10px;
    text-align: right;
  }
}

:deep(.cm-editor) {
  height: 400px;
  overflow: hidden;
  transition: all 0.3s;
}
.is-hide :deep(.cm-editor) {
  width: 32px;
  transition: all 0.3s;
}
:deep(.ͼ1 .cm-scroller) {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
:deep(.ͼ2 .cm-gutters) {
  border-left: 1px solid #ddd;
}
</style>
