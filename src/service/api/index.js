const files = import.meta.globEager('./*.js');
const modules = {};

for (const key in files) {
  if (Object.prototype.hasOwnProperty.call(files, key)) {
    modules[key.replace(/(\.\/|\.ts)/g, '')] = files[key].default;
  }
}

export default {
  install(Vue) {
    Object.keys(modules).forEach((item) => {
      let service = modules[item];
      let name = item.split('.')[0];
      Vue.config.globalProperties['$' + name] = service;
    });
  }
};
