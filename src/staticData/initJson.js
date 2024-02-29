export default {
  user: {
    fields: [
      { name: 'id', type: 'pk', dataType: 'string(20)' },
      { name: 'name', dataType: 'string(20)' },
      { name: 'dog_ids', type: 'ids', fk: 'dog.id' } // type ids代表id的集合，只支持逗号分隔（不推荐，支持优先级比较低）
    ]
  },
  userExtra: {
    fields: [
      { name: 'id', type: 'pk', dataType: 'string(20)' },
      { name: 'extra', dataType: 'string(20)' },
      { name: 'user_id', type: '1', fk: 'user.id' } // fk代表逻辑外键，一个user的id，在此表中也只有单条记录，则type为1
    ]
  },
  horse: {
    fields: [
      { name: 'id', type: 'pk', dataType: 'string(20)' },
      { name: 'name', dataType: 'string(20)' },
      { name: 'owner_id', fk: 'user.id' }, // 一个user的id，若在此表中可能有多行记录，此种情况不显式申明type
      { name: 'owner_name', vk: 'user.name' }, // 可通过定义vk（valueKey）方式把对应user的name注入到此字段
      { name: 'rider_id', fk: 'user.id', alias: 'rider' } // fk支持并且推荐配置别名，如果有多个fk指向同一张表，那么必须配置别名
    ] // owner_name其实是冗余字段，如果冗余字段也是在同一微服务表内，不建议定义；跨微服务的话，不建议使用fk，vk
  },
  dog: {
    fields: [
      { name: 'id', type: 'pk', dataType: 'string(20)' },
      { name: 'name', dataType: 'string(20)' },
      { name: 'breed', dataType: 'string(20)' }
    ] // fk不应该循环，user和dog的关联关系只能维护在一张表里，不能user维护一个dog_ids，dog维护一个user_id
  },
  userBank: {
    fields: [
      { name: 'user_id', fk: 'user.id' },
      { name: 'bank_id', fk: 'bank.id' }
    ]
  },
  bank: {
    fields: [
      { name: 'id', type: 'pk', dataType: 'string(20)' },
      { name: 'name', dataType: 'string(20)' },
      { name: 'parent_id', fk: 'bank.id' } // 自我引用
    ]
  }
};
