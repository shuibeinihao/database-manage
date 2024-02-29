import { createRouter, createWebHistory } from 'vue-router';
import index from '@/layout/index.vue';
import demo from '@/view/demo.vue';
import dataBase from '@/view/dataBase/dataBase.vue';
import codeEdit from '@/view/codeEdit/index.vue';

export class RouterConfig {
  constructor() {
    this.options = {
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          name: 'index',
          component: index,
          children: [
            {
              path: '/demo',
              name: 'demo',
              component: demo
            },
            {
              path: '/dataBase',
              name: 'dataBase',
              component: dataBase
            },
            {
              path: '/codeEdit',
              name: 'codeEdit',
              component: codeEdit
            }
          ]
        }
      ]
    };
  }

  getRouter() {
    return createRouter(this.options);
  }
}

const router = new RouterConfig().getRouter();

export default router;

// title: string; 页面标题，通常必选。
// icon ?: string; 图标，一般配合菜单使用。
// auth ?: boolean; 是否需要登录权限。
// ignoreAuth ?: boolean; 是否忽略权限。
// roles ?: RoleEnum[]; 可以访问的角色
// keepAlive ?: boolean; 是否开启页面缓存
// hideMenu ?: boolean; 有些路由我们并不想在菜单中显示，比如某些编辑页面。
// order ?: number; 菜单排序。
// frameUrl ?: string; 嵌套外链。
