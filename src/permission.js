export class AuthGuard {
  static beforeEach(to, from, next) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // 判断是否需要登录才能访问页面
      if ('是否登陆') {
        // 未登录，跳转到登录页
        next({
          name: 'login',
          query: {
            redirect: to.fullPath
          }
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
}
