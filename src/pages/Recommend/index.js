import React, { useEffect } from 'react';
import Slider from '@/components/slider';
import RecommendList from '@/components/list';
import Scroll from '@/components/scroll';
import Loading from '@/components/loading';
import { Content } from "./style.js";
import { connect } from "react-redux";
import { forceCheck } from "react-lazyload";
import * as actionTypes from './store/actionCreators';
import { renderRoutes } from 'react-router-config';

function Recommend(props) {

  const { bannerList, recommendList, enterLoading, songsCount } = props;
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    if(!bannerList.size){
      getBannerDataDispatch();
    };
    if(!recommendList.size) {
      getRecommendListDataDispatch();
    };
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];

  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content play={songsCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}/>
          <RecommendList
            recommendList={recommendListJS}
          />
        </div>
      </Scroll>
      {enterLoading ? <Loading/> : null}
      { renderRoutes(props.route.routes) }
    </Content>
  );
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading']),
  songsCount: state.getIn(['player', 'playList']).size,
});

// 映射dispatch 到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
