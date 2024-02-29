<template>
  <div class="card">
    <ElButton type="primary" @click="updateName">count is {{ props.msg }}</ElButton>
    <p>{{ mainStore.name }}{{ mainStore.nameLength }} {{ wdyStore.name }}{{ wdyStore.nameLength }}</p>
    <div>computed:{{ wdy }}</div>
  </div>
</template>

<script setup>
import { useMainStore } from '@/store/demo1';
import { useWdyStore } from '@/store/demo2';
// const internalInstance = getCurrentInstance();
// const internal = internalInstance.appContext.config.globalProperties;
const mainStore = useMainStore();
const wdyStore = useWdyStore();
const emits = defineEmits([]);
defineOptions({
  name: 'HelloWorld'
});
const props = defineProps({
  msg: {
    type: String,
    default: ''
  }
});

let num = ref(1);
let num2 = ref(2);
const updateName = () => {
  num.value++;
  num2.value++;
  emits('add', num2.value);
  // $patch 修改 store 中的数据
  mainStore.$patch({
    name: '名称被修改了,nameLength也随之改变了'
  });
  wdyStore.$patch({
    name: '哈哈哈哈'
  });
  wdyStore.wdyInfo('aaa');
};

// onBeforeMount( async () => {
//   let params = {
//     aesKey: "YaGMd3+aXXkVOsc08fTu5LSPrPOoiL6zKq2cb38jpRa5NMAhVCjhPOx3pC53H28/Uvoea1d7Lz9rxPyN9gVWRHXS27mgawfQh7ZMai3OXwlKPcv9zHp54dJacVp1qkHmf5k/I4mSkQSTUE5r7qKCJdYuyK2zwMF/5gEJ5Jn9bZU=",
//     data: "ImEA+b9Qa9NhRlU98XGHrc6p3fRjq6e0ugw6ZFvtarGCcH7bCCZgs2IUnO8AuwmwtYEUK1eQZIOfKiQVR5hT6w==",
//     originData: "{\"template\":{\"hideCurrentCPage\":false,\"cPage\":13}}"
//   }
//   const data = await internal.$demo.getPage(params);
//   const data2 = await internal.$demo2.getDetails();
//   console.log(data);
//   console.log(data2);
// });
let wdy = computed(() => {
  return num.value;
});
watch(num, (old, newV) => {
  console.log('watch:', old, newV);
});
watchEffect(() => {
  console.log('watchEffect:', num.value, num2.value);
});
defineExpose({
  updateName
});
</script>

<style scoped lang="scss">
.read-the-docs {
  color: #888;
}
</style>
