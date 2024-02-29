

## adgm-data-base

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### build production

```
npm run build:pro
```
### build development

```
npm run build:dev
```
# 技术栈：vue3+vite+pinia+router@4+axios+elementPlus+vueFlow+lodash+sass
# 代码格式化： eslint+prettier

# 获取环境变量
import.meta.env.VITE_NODE_ENV

在TypeScript文件中使用import.meta时，需要在文件顶部添加以下代码以声明类型：

interface ImportMeta {
  env: {
    [key: string]: string | undefined;
  };
}

# Vue3 变化
1、import.meta.globEager 代替 require.context 自动导入文件

2、app.config.globalProperties 代替 Vue.prototype
获取：
import {getCurrentInstance} from "vue"
const {proxy} = getCurrentInstance()
console.log(proxy.lodash.random(0,10))

3、创建实例 vue3通过内置的createApp(//根组件) 代替 new Vue({ ...选项 }) 构造函数的方式

4、用computed 代替 filters

5、defineOptions({
  name: "HelloWorld"  
})设置组件name


# Todo
Add node  98%
Update node 98%
Remove node  100%
Edit edge 98%
Remove edge 100%
弹窗组件 100%;
Json View 菜单 100%
json解析 100%
数据加工成json 100%；
Parent node id 自动带入 100%
锁定子元素 限制在父级内 100%
新建node 预设 x y坐标 100%
隐藏显示 右侧code编辑区域 100%
一键清除所有 100%
字段类型 枚举 是否需要长度 90% 
tableName 不可重复判断 100%
同一表字段不可重复 100%
表视图位置初始化 100%

一次新建一个表 新建不需要fields 只是展示需要 最外层不需要连接点 可配置 100%
抽屉组件 0%; 暂不需要 后续可扩展
Save 0% 需要对接接口
移动已有内容 点击运行 最外层移动 fields不跟着移动，点击一下才会移动
add sourcePosition 可配置 0%
删除二次确认 0%
需要区分fk、vk 编辑vk的时候 需要给唯一标识 0%
Fields alias
Type ids 1, other

type去掉 加一个 pk的checkbox选择
加一个filter 只展示筛选表对应的关联表
