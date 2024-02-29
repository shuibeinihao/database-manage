<template>
  <div>
    <el-dialog v-model="globalProperties.dialogVisible" title="ADD NODE" width="75%">
      <el-form ref="formRef" label-position="top" :model="ruleForm" label-width="130px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item
              label="Table Name"
              prop="tableName"
              :rules="{
                validator: labelValidate,
                required: true,
                trigger: ['change', 'blur']
              }"
            >
              <el-input v-model="ruleForm.tableName" placeholder="please input"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="Node Width" prop="widthInfo">
              <el-input v-model="ruleForm.widthInfo" placeholder="example：200px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Node Height" prop="heightInfo">
              <el-input v-model="ruleForm.heightInfo" placeholder="example：300px"></el-input>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="6">
            <el-form-item label="Node Background" prop="backgroundInfo">
              <el-input v-model="ruleForm.backgroundInfo" placeholder="default：#fff"></el-input>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="6">
            <el-form-item label="Node ID" prop="id">
              <el-input v-model="ruleForm.id" disabled placeholder="please input"></el-input>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="6">
            <el-form-item v-if="ruleForm.parentNode" label="Parent Node ID" prop="parentNode">
              <el-input v-model="ruleForm.parentNode" disabled placeholder="please input"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-divider>fields</el-divider>
        <fields ref="fieldsRef"></fields>
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
import fields from './fields.vue';
import { dataBaseNodes } from '@/store/dataBaseNodes';
import { nextTick } from 'vue';
const stateNodes = dataBaseNodes();
const formRef = ref(null);
const fieldsRef = ref();
const props = defineProps({
  //当前选中的节点id
  currentNodeId: {
    type: String,
    default: ''
  }
});

const globalProperties = reactive({
  dialogVisible: false,
  isUpdate: false
});

/**
 * table name 节点属性
 */
const ruleForm = reactive({
  parentNode: '', //父节点id 跟vueFlow保持统一 所以不用parentId
  tableName: '', //表名称
  labelInfo: '', //字段名称
  nodeType: '', //字段类型 vueFlow生成节点默认有type字段 所以这里用 nodeType
  pk: '', //是否主键
  dataType: '', // 类型字段 长度
  require: '', // 字段约束
  unique: '', //字段是否唯一
  id: '', //节点唯一标识
  widthInfo: '200px', //节点宽度
  heightInfo: '300px', //节点高度
  backgroundInfo: '', //节点背景颜色
  xInfo: 100, //节点所在位置 x坐标
  yInfo: 100, //节点所在位置 y坐标
  extent: '',
  type: 'input',
  sourcePosition: '',
  targetPosition: ''
});

/**
 * vueFlow节点属性及数据结构
 */
const newNode = (_obj) => {
  return {
    id: _obj.id,
    parentNode: _obj.parentNode.toString(),
    label: _obj.tableName || _obj.labelInfo,
    extent: _obj.extent,
    type: _obj.type,
    position: {
      x: _obj.xInfo,
      y: _obj.yInfo
    },
    data: {
      nodeType: _obj.pk,
      dataType: _obj.dataType,
      require: _obj.require,
      unique: _obj.unique
    },
    style: {
      width: _obj.widthInfo,
      height: _obj.heightInfo,
      background: _obj.backgroundInfo
    },
    sourcePosition: _obj.sourcePosition,
    targetPosition: _obj.targetPosition
  };
};

/**
 * 判断table name是否重复
 */
const labelValidate = (rule, value, callback) => {
  const bol = stateNodes.nodes.filter((item) => {
    return item.label === value;
  });
  if (!value) {
    callback(new Error('please input!'));
  } else if (bol.length > 1) {
    callback(new Error('tablename already exists!'));
  } else {
    callback();
  }
};

/**
 * 提交
 * 校验必输项
 * 判断是否新增还是更新
 * 初始化节点位置（tableName、fields）
 * 存入pinia
 */
const submitInfo = () => {
  const p1 = new Promise((resolve) => {
    fieldsRef.value.formRef.validate((valid) => {
      if (valid) {
        resolve();
      }
    });
  });
  const p2 = new Promise((resolve) => {
    formRef.value.validate((valid) => {
      if (valid) {
        resolve();
      }
    });
  });

  Promise.all([p1, p2]).then(() => {
    globalProperties.dialogVisible = false;
    addNodeInfo();
  });

  const addNodeInfo = () => {
    const fieldsArr = fieldsRef.value.initInfo.keyList;
    const nodeItem = newNode(ruleForm);
    ruleForm.xInfo = ruleForm.xInfo + 230; //初始化table 位置
    const parentNodeId = ruleForm.id;
    /**
     * 如果是更新 先清空对应表 再新建
     */
    if (globalProperties.isUpdate) {
      const currentNode = stateNodes.nodes.find((item) => {
        return item.id === props.currentNodeId;
      });
      if (currentNode.parentNode) {
        stateNodes.nodes = stateNodes.nodes.filter((item) => {
          return item.parentNode !== currentNode.parentNode;
        });
        stateNodes.nodes = stateNodes.nodes.filter((item) => {
          return item.id !== currentNode.parentNode;
        });
      } else {
        stateNodes.nodes = stateNodes.nodes.filter((item) => {
          return item.id !== currentNode.id;
        });
        stateNodes.nodes = stateNodes.nodes.filter((item) => {
          return item.parentNode !== currentNode.id;
        });
      }
    }
    nextTick(() => {
      let y = 5;
      stateNodes.addNode(nodeItem);
      fieldsArr.forEach((item) => {
        item.parentNode = parentNodeId;
        y = y + 30;
        item.yInfo = y;
        const fieldItem = newNode(item);
        stateNodes.addNode(fieldItem);
      });
    });
  };
};

/**
 * 更新时要判断是点击了field 还是点击了table
 */
const updateNode = () => {
  globalProperties.dialogVisible = true;
  globalProperties.isUpdate = true;

  resetForm();
  const currentNode = stateNodes.nodes.find((item) => {
    return item.id === props.currentNodeId;
  });
  if (!currentNode.parentNode) {
    const fieldNodes = stateNodes.nodes.filter((item) => {
      return item.parentNode === currentNode.id;
    });
    nextTick(() => {
      updateTable(currentNode);
      updateFields(fieldNodes);
    });
  } else {
    const fieldNodes = stateNodes.nodes.filter((item) => {
      return item.parentNode === currentNode.parentNode;
    });
    const parentNode = stateNodes.nodes.find((item) => {
      return item.id === currentNode.parentNode;
    });
    nextTick(() => {
      updateTable(parentNode);
      updateFields(fieldNodes);
    });
  }
};

/**
 * 更新反显table相关参数
 */
const updateTable = (_currentNode) => {
  ruleForm.tableName = _currentNode.label || '';
  ruleForm.id = _currentNode.id || '';
  ruleForm.widthInfo = _currentNode.style.width || '';
  ruleForm.heightInfo = _currentNode.style.height || '';
  ruleForm.backgroundInfo = _currentNode.style.background || '';
  ruleForm.xInfo = _currentNode.position.x || '';
  ruleForm.yInfo = _currentNode.position.y || '';
};

/**
 * 更新反显fields相关参数
 */
const updateFields = (_fieldNodes) => {
  fieldsRef.value.initInfo.keyList = [];
  _fieldNodes.forEach((item) => {
    let fieldItem = {
      parentNode: item.parentNode, //父节点id 跟vueFlow保持统一 所以不用parentId
      tableName: '', //表名称
      labelInfo: item.label, //字段名称
      nodeType: item.data.nodeType, //字段类型 vueFlow生成节点默认有type字段 所以这里用 nodeType
      pk: item.data.nodeType, //是否主键
      dataType: item.data.dataType, // 类型字段 长度
      require: item.data.require, // 字段约束
      unique: item.data.unique, //字段是否唯一
      id: item.id, //节点唯一标识
      widthInfo: item.style.width, //节点宽度
      heightInfo: item.style.height, //节点高度
      backgroundInfo: item.style.background, //节点背景颜色
      xInfo: item.position.x, //节点所在位置 x坐标
      yInfo: item.position.y, //节点所在位置 y坐标
      extent: item.extent,
      type: item.type,
      sourcePosition: item.sourcePosition,
      targetPosition: item.targetPosition
    };
    fieldsRef.value.initInfo.keyList.push(fieldItem);
    console.log('fieldsRef.value.initInfo.keyList', fieldsRef.value.initInfo.keyList);
  });
};

/**
 * 表单reset
 */
const resetForm = () => {
  nextTick(() => {
    formRef.value.resetFields();
  });
};

/**
 * 新建的时候需要初始化
 * id保证唯一性 使用当前时间戳
 * 清空上次新建的fields
 */
const init = () => {
  globalProperties.dialogVisible = true;
  globalProperties.isUpdate = false;
  resetForm();
  nextTick(() => {
    ruleForm.parentNode = props.currentNodeId;
    ruleForm.id = globalProperties.isUpdate ? ruleForm.id : new Date().getTime();
    fieldsRef.value.initInfo.keyList = [];
  });
};

defineExpose({
  init,
  updateNode
});
</script>

<style lang="scss" scoped></style>
