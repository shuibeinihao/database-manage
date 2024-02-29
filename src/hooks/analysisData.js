const analysisData = (_nodes) => {
  console.log('_nodes', _nodes[0].label);
  let resultJson = {};
  const parentArr = _nodes.filter((item) => {
    return item.isParent;
  });

  parentArr.forEach((item) => {
    resultJson[item.label] = {};
    resultJson[item.label].fields = [];
  });

  // children fields
  const childArr = _nodes.filter((ite) => {
    return ite.parentNode;
  });

  childArr.forEach((info) => {
    const currentFields = parentArr.find((item) => {
      return item.id === info.parentNode;
    });
    const tableName = currentFields.label;
    let obj = {};
    obj.name = info.label;
    obj.id = info.id;
    if (info.parentNode) {
      obj.parentNode = info.parentNode;
    }
    if (info.data.nodeType) {
      obj.type = info.data.nodeType;
    }
    if (info.data.dataType) {
      obj.dataType = info.data.dataType;
    }
    if (info.data.require) {
      obj.require = info.data.require;
    }
    if (info.data.unique) {
      obj.unique = info.data.unique;
    }
    resultJson[tableName].fields.push(obj);
  });

  // fk all nodes
  const arrEdgeFk = _nodes.filter((edge) => {
    return edge.marker === '' || (edge.marker && edge.style.stroke === ''); //TODO 这里判断有问题 后续需要vk唯一识别字段设置
  });

  //vk all nodes
  const arrEdgeVk = _nodes.filter((edge) => {
    return edge.marker === '' || (edge.marker && edge.style.stroke !== ''); //TODO 这里判断有问题 后续需要vk唯一识别字段设置
  });
  utilsFun(arrEdgeFk, 'fk', resultJson, parentArr);
  utilsFun(arrEdgeVk, 'vk', resultJson, parentArr);
  console.log(resultJson);

  return resultJson;
};

const utilsFun = (_arr, _nk, _resultJson, _parentArr) => {
  _arr.forEach((edge) => {
    // edge source
    const sourceItem = _parentArr.find((item) => {
      return item.id === edge.sourceNode.parentNode;
    });
    const sourceTableName = sourceItem.label;

    // edge target
    const targetItem = _parentArr.find((item) => {
      return item.id === edge.targetNode.parentNode;
    });
    const targetTableName = targetItem.label;

    let itemInfo = '';
    let nk = '';
    let targetName = '';
    // 箭头方向
    if (edge.marker === 'arrow') {
      // fk、vk所在位置
      itemInfo = _resultJson[sourceTableName].fields.find((item) => {
        return item.id === edge.sourceNode.id;
      });
      targetName = edge.targetNode.label;
      nk = targetTableName + '.' + targetName;
    } else {
      // fk、vk所在位置
      itemInfo = _resultJson[targetTableName].fields.find((item) => {
        return item.id === edge.targetNode.id;
      });
      targetName = edge.sourceNode.label;
      nk = sourceTableName + '.' + targetName;
    }

    itemInfo[_nk] = nk;
  });
};
export default analysisData;
