import * as actionTypes from './constant';
import { fromJS } from 'immutable';
import { getBannerRequest, getRecommendListRequest } from "@/api/request";

export const changeBnannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
});

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
});

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});

export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest()
      .then(d => {
        dispatch(changeBnannerList(d.banners));
      })
      .catch(() => {
        console.log('轮播图数据获取失败');
      });
  }
};

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest()
      .then(d => {
        dispatch(changeRecommendList(d.result));
        dispatch (changeEnterLoading (false));
      })
      .catch(() => {
        console.log('推荐歌单数据获取失败');
      });
  }
};
