import { MarkerType } from '@vue-flow/core';
/*
 * _label: 节点名称｜字段名称｜表名
 * _id: 节点id
 * _x: 节点x轴
 * —y: 节点y轴
 * _isParent: 是否父级
 * _parentNode: 父节点 id
 * _width: 节点宽度
 * _height: 节点高度
 * _item:（type-字段类型, dataType-类型长度, require-字段是否必须, unique-字段是否为一） 字段携带信息
 */
// 基础vueFlow node element
const baseObjInfo = (_label, _id, _x, _y, _isParent, _parentNode, _width, _height, _item = {}) => {
  const { type, dataType, require, unique } = _item;
  return {
    parentNode: _parentNode,
    data: { nodeType: type, dataType: dataType, require: require, unique: unique },
    id: _id,
    extent: 'parent',
    label: _label,
    position: { x: _x, y: _y },
    style: { width: _width + 'px', height: _height + 'px', background: '' },
    sourcePosition: 'right',
    targetPosition: 'left',
    isParent: _isParent
  };
};

// 基础 vueFlow edge element
const baseEdges = (_id, _label, _source, _target, _color = '') => {
  return {
    id: _id,
    label: _label,
    source: _source,
    target: _target,
    style: { stroke: _color },
    markerEnd: MarkerType.ArrowClosed
  };
};

// 解析外来json
const initJsonInfo = (_initJson) => {
  const initData = _initJson;
  let arr = [];
  let x = 20;
  let y = 80;

  Object.keys(initData).forEach((key) => {
    const tableInfo = baseObjInfo(key, key, x, y, true, '', 200, 300);
    tableInfo.type = 'input';

    x = x + 210;
    y = y + 0;
    let x_1 = 25;
    let y_1 = 33;
    if (initData[key].fields) {
      initData[key].fields.forEach((item) => {
        const { fk, vk } = item;
        if (fk) {
          const name = fk.split('.')[0];
          const val = fk.split('.')[1];
          const edge_fk = baseEdges(key + '_' + item.name + '_fk', '1:1', name + '_' + val, key + '_' + item.name);
          arr.push(edge_fk);
        }
        if (vk) {
          const name = vk.split('.')[0];
          const val = vk.split('.')[1];
          const edge_vk = baseEdges(
            key + '_' + item.name + '_vk',
            '1:1 vk',
            name + '_' + val,
            key + '_' + item.name,
            '#f00'
          );
          arr.push(edge_vk);
        }
        const itemInfo = baseObjInfo(item.name, key + '_' + item.name, x_1, y_1, false, key, 150, 24, item);
        arr.push(itemInfo);
        y_1 = y_1 + 30;
      });
    }
    arr.push(tableInfo);
  });

  return arr;
};

export default initJsonInfo;
