<template>
  <div class="box">
    <Codemirror
      class="code"
      v-model="code"
      :style="{ height: '100%' }"
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
</template>
<script setup>
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import initJson from '@/staticData/initJson.js';
import { oneDark } from '@codemirror/theme-one-dark';
const code = ref(JSON.stringify(initJson, null, '\t'));
const extensions = [javascript(), oneDark];
const handleClick = (type, val) => {
  console.log(type, val);
};
</script>
<style scoped lang="scss">
.box {
  width: calc(100% - 180px);
  height: 300px;
  background: #fff;
}
.code {
  width: 300px;
  height: 300px;
}
</style>
