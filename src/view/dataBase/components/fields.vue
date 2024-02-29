<template>
  <div>
    <el-form ref="formRef" label-position="top" :model="initInfo" label-width="130px">
      <div v-for="(item, index) in initInfo.keyList" :key="index">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item
              label="Field Name"
              :prop="'keyList.' + index + '.labelInfo'"
              :rules="{
                validator: labelValidate,
                required: true,
                trigger: ['change', 'blur']
              }"
            >
              <el-input v-model="item.labelInfo" placeholder="please input field name"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="5">
            <el-form-item label="Type" :prop="'keyList.' + index + '.nodeType'">
              <el-select class="width-full" clearable v-model="item.nodeType" placeholder="please select type">
                <el-option v-for="item in NODE_TYPE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->

          <el-col :span="4">
            <el-form-item label="Data Type" :prop="'keyList.' + index + '.dataType'">
              <el-input v-model="item.dataType" placeholder="example：string(20)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="PK" :prop="'keyList.' + index + '.pk'">
              <el-checkbox v-model="item.pk" true-label="pk">true</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="Require" :prop="'keyList.' + index + '.require'">
              <el-radio-group v-model="item.require">
                <el-radio :label="true">true</el-radio>
                <el-radio :label="false">false</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="Unique" :prop="'keyList.' + index + '.unique'">
              <el-radio-group v-model="item.unique">
                <el-radio :label="true">true</el-radio>
                <el-radio :label="false">false</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              size="small"
              plain
              :icon="Delete"
              circle
              class="btn-delete"
              @click="removeRow(item)"
            ></el-button>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div class="add-item" @click="addRow">
      <el-icon class="icon-plus"><Plus /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { NODE_TYPE } from '@/constants/addNode.js';
import { Plus, Delete } from '@element-plus/icons-vue';
import { Position } from '@vue-flow/core';
const initInfo = reactive({
  keyList: []
});
const formRef = ref(null);
onBeforeMount(() => {
  // 初始化
});

/**
 * 移除某行
 */
const removeRow = (item) => {
  const index = initInfo.keyList.indexOf(item);
  if (index !== -1) {
    initInfo.keyList.splice(index, 1);
  }
};

/**
 * 新增一行
 */
const addRow = () => {
  initInfo.keyList.push({
    parentNode: '', //父节点id 跟vueFlow保持统一 所以不用parentId
    tableName: '', //表名称
    labelInfo: '', //字段名称
    nodeType: '', //字段类型 vueFlow生成节点默认有type字段 所以这里用 nodeType
    pk: '', //是否主键
    dataType: '', // 类型字段 长度
    require: '', // 字段约束
    unique: '', //字段是否唯一
    id: new Date().getTime(), //节点唯一标识
    widthInfo: '', //节点宽度
    heightInfo: '', //节点高度
    backgroundInfo: '', //节点背景颜色
    xInfo: 25, //节点所在位置 x坐标
    yInfo: 5, //节点所在位置 y坐标
    extent: 'parent',
    type: 'default',
    sourcePosition: Position.Left,
    targetPosition: Position.Right
  });
};

/**
 * 判断field name是否重复
 */
const labelValidate = (rule, value, callback) => {
  const bol = initInfo.keyList.filter((item) => {
    return item.labelInfo === value;
  });
  if (!value) {
    callback(new Error('please input!'));
  } else if (bol.length > 1) {
    callback(new Error('tablename already exists!'));
  } else {
    callback();
  }
};

defineExpose({
  formRef,
  initInfo
});
</script>

<style lang="scss" scoped>
.btn-delete {
  position: relative;
  top: 30px;
}
.add-item {
  border: 1px dashed rgba(64, 158, 255, 0.4);
  text-align: center;
  color: #409eff;
  cursor: pointer;
  .icon-plus {
    position: relative;
    top: 1.5px;
  }
  &:hover {
    border: 1px dashed rgba(64, 158, 255, 1);
  }
}
:deep(.el-row) {
  margin-bottom: 5px;
  border-radius: 10px;
  background: #f9f9f9;
}
:deep(.el-form-item) {
  margin: 10px 0;
}
.width-full {
  width: 100%;
}
</style>
