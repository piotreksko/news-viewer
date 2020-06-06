import Vue from "vue";
import url from "../constants/urls";

const getNews = params =>
  Vue.axios.get(url.NEWS, {
    params: { "api-key": "test", ...params }
  });

export { getNews };
