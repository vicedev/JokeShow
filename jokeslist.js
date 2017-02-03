import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Navigator,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ListView,
  ProgressBarAndroid,
  RefreshControl,
  View
} from 'react-native';

var JokeContent=require('./jokecontent');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const BASE_URL='http://api.1-blog.com/biz/bizserver/xiaohua/list.do';

var currentPage=0;
var JokesList=React.createClass({
  getInitialState:function(){
    return{
      size:10,
      page:0,
      jokes:[],
      firstLoad:true,
      loadMore:false,
      isRefreshing:false,
      pullToRefresh:false,
};
  },
  _onFetch:function(){
    fetch(BASE_URL+'?size='+this.state.size+'&page='+currentPage)
    .then((response)=>response.json())
    .then((responseData)=>{
      if (this.state.pullToRefresh==true) {
        var newJokes=responseData.detail;
        this.setState({
          jokes:newJokes,
          pullToRefresh:false,
        });
      }else{
        this.setState({
          jokes:this.state.jokes.concat(responseData.detail),
          firstLoad:false,
          loadMore:false,
        });
      }
    })
    .done();
  },
  //点击列表中的一个条目
  clickItem(joke){
  this.props.navigator.push({component:JokeContent,
                sceneConfig: Navigator.SceneConfigs.FloatFromRight,
                params:{
                  joke:joke,
                }
            });
  },
  loadMore:function(){
    ++currentPage;
    this.setState({
      page:currentPage+1,
      loadMore:true,
    });
    this._onFetch(currentPage+1);
  },
  renderLoadMore:function(){
    return(
      <View style={{flex:1,justifyContent:'center'}}>
      <TouchableHighlight
        underlayColor="rgb(210, 230, 255)"
        activeOpacity={0.5}
        style={{ borderRadius: 8,padding: 10}}
        onPress={this.loadMore}
        >
           <Text style={{fontSize:16,textAlign:'center'}} numberOfLines ={2}>{this.state.loadMore?'Loading...':'LoadMore'}</Text>
      </TouchableHighlight>
      </View>
    );
  },
  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
  return (
    <View style={{flex:1,borderBottomWidth:1/PixelRatio.get(),borderBottomColor:'grey'}}>
    <TouchableHighlight
      underlayColor="rgb(210, 230, 255)"
      activeOpacity={0.5}
      style={{ borderRadius: 8,padding: 6}}
      onPress={this.clickItem.bind(this,rowData)}
      >
      {this.renderDifferentRow(rowData)}

    </TouchableHighlight>
    </View>
  );
 },
//根据有没有图片render不同的ror
 renderDifferentRow:function(rowData){
   if (rowData.picUrl!='') {
     return(
       <View style={{flex:1,flexDirection:'row'}}>
       <Text style={{fontSize:16,marginLeft:10,flex:2}} numberOfLines ={2}>{rowData.content}</Text>

      <Image source={{uri: rowData.picUrl}} style={{height:40,resizeMode:'cover',flex:1}}></Image>
       </View>
     );
   }else{
     return(
       <View style={{flex:1}}>
       <Text style={{fontSize:16,marginLeft:10}} numberOfLines ={2}>{rowData.content}</Text>
       </View>
     );
   }},
componentDidMount() {
  this._onFetch();
},
_onRefresh:function(){
  currentPage=0;
  this.setState({
    page:0,
    pullToRefresh:true,
  });
  this._onFetch(currentPage);
},
renderView:function(){
  if(this.state.jokes.length==0){
   return (
     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ProgressBarAndroid styleAttr='Inverse'/>
     </View>
   );
 }else{
   return(
<ListView
refreshControl={
  <RefreshControl
    refreshing={this.state.isRefreshing}
    onRefresh={this._onRefresh}
    tintColor="#ff0000"
    title="Loading..."
    titleColor="#00ff00"
    colors={['#ff0000', '#00ff00', '#0000ff']}
    progressBackgroundColor="#B0E2FF"
  />
}

  pageSize={10}
  dataSource={ds.cloneWithRows(this.state.jokes)}
  renderRow={this._renderRow}
  enableEmptySections={true}
  renderFooter={this.renderLoadMore}
/>
   );
 }
},
  render(){

    return(
      <View style={{flex:1}}>
      {this.renderView()}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyTxt: {
    fontSize: 23,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  row: {
    padding: 10,
    height: 40,
    backgroundColor: 'yellow',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
});

module.exports=JokesList;
