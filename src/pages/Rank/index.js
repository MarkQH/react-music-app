import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRankList } from './store/index'
import Loading from '@/components/loading';
import { filterIndex, filterIdx } from '@/utils';
import Scroll from '@/components/scroll';
import { EnterLoading } from '@/pages/Singers/style';
import { renderRoutes } from 'react-router-config';
import {
  List,
  ListItem,
  SongList,
  Container
} from './style';

function Rank(props) {

  const { rankList: list, loading } = props;
  const { getRankListDataDispatch } = props;

  let rankList = list ? list.toJS() : [];

  useEffect(() => {
    getRankListDataDispatch();
  }, []);

  let globalStartIndex = filterIndex (rankList);
  let officialList = rankList.slice (0, globalStartIndex);
  let globalList = rankList.slice (globalStartIndex);

  const enterDetail = (detail) => {
    props.history.push (`/rank/${detail.id}`)
  }

  // 渲染榜单列表函数， 传入global来区分不同的布局方式
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map(item => {
            return (
              <ListItem
                key={item.coverImgId}
                tracks={item.tracks}
                onClick={() => enterDetail(item)}
              >
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt=""/>
                  <div className="decorate"></div>
                  <span className="update_frequecy">
                    {item.updateFrequency}
                  </span>
                </div>
                { renderSongList(item.tracks) }
              </ListItem>
            )
          })
        }
      </List>
    )
  }
  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>
              {index+1}.{item.frist}-{item.second}
            </li>
          })
        }
      </SongList>
    ) : null
  }

  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = loading ? {"display": "none"} : {"display": ""};

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}> 官方榜 </h1>
            { renderRankList (officialList) }
          <h1 className="global" style={displayStyle}> 全球榜 </h1>
            { renderRankList (globalList, true) }
          { loading ? <EnterLoading><Loading></Loading></EnterLoading> : null }
        </div>
      </Scroll>
      {renderRoutes (props.route.routes)}
    </Container>
  )
};

const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading'])
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch(){
      dispatch(getRankList());
    }
  }
};

export default connect (mapStateToProps, mapDispatchToProps)(React.memo(Rank));
