import http from '@/service/http';

export default {
  getDetails() {
    return http.get(
      '/adgm-gateway/loan/api/v1/statistics/detail?stamp=7047384081302556672&url=%2Fadgm-gateway%2Floan%2Fapi%2Fv1%2Fstatistics%2Fdetail&method=get&id=getHomepageStatistic'
    );
  }
};
