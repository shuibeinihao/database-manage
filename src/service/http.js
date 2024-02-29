import axios from 'axios';
import { ElMessage, ElLoading } from 'element-plus';
const config = {
  baseURL: '/',
  timeout: 120000
};

let loading;

class Http {
  // service: AxiosInstance;
  service;
  constructor(config) {
    this.service = axios.create(config);

    /* 请求拦截  this.service.interceptors.request.use(config => config, error => Promise.reject(error))*/
    this.service.interceptors.request.use(
      (config) => {
        /* 业务逻辑
            1. 开启全屏loading动画
            2. 数据加密config.data
            3. 请求头加上token，结合vuex或localstorage：
                if(store.getters.token) config.headers['x-token'] = store.getters.token
                else 重定向
            4. ……
            */
        loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        });

        if (localStorage.getItem('token')) {
          config.headers.authorization = localStorage.getItem('token');
        }

        return config;
      },
      (error) => {
        /* 请求错误 
            1. 关闭全屏loading动画
            2. 重定向到错误页
            */
        loading.close();
        return Promise.reject(error); // 为了可以在代码中catch到错误信息
      }
    );

    /* 响应拦截   this.service.interceptors.response.use(response => response.data, error => Promise.reject(error))*/
    this.service.interceptors.response.use(
      (response) => {
        /* 
            1. 关闭全屏loading动画
            2. 数据解密
            3. 根据 response.data.code 做不同的错误处理
            4. ……
            */
        loading.close();

        const data = response.data;
        const { code } = data;

        if (code !== '000000') {
          ElMessage.error(data.message);
          return Promise.reject(data);
        }
        return response.data;
      },
      (error) => {
        loading.close();
        ElMessage.error('请求失败');
        return Promise.reject(error);
      }
    );
  }
  get(url, params, _object = {}) {
    return this.service.get(url, { params, ..._object });
  }
  post(url, params, _object = {}) {
    return this.service.post(url, params, _object);
  }
  put(url, params, _object = {}) {
    return this.service.put(url, params, _object);
  }
  delete(url, params, _object = {}) {
    return this.service.delete(url, { params, ..._object });
  }
}

export default new Http(config);
