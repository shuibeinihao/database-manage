<template>
  <div class="demo-wrap">
    <div @click="homeInfo">home</div>
    <HelloWorld :msg="'wdyMsg'" ref="child" @add="updateName"></HelloWorld>
  </div>
</template>

<script setup>
const child = ref();

const updateName = (value) => {
  console.log('value', value);
};
const homeInfo = () => {
  child.value.updateName();
};
</script>

<style lang="scss">
.demo-wrap {
}
</style>
