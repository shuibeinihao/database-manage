import http from '@/service/http';

export default {
  getPage(params) {
    return http.post('/adgm-gateway/system/api/v1/articles/sme/page', params);
  }
};
