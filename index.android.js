/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  ToolbarAndroid,
  DrawerLayoutAndroid,
  PixelRatio,
  TouchableHighlight,
  Image,
  View
} from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');

import TabNavigator from 'react-native-tab-navigator';

var JokesList=require('./jokeslist');
var Setting=require('./setting');

class PracticeDemo extends Component {
  render() {
    return (
      <Navigator
    initialRoute={{component:Home}}
    renderScene={(route,navigator)=>{
      let Component=route.component;
      return <Component {...route.params} navigator={navigator}></Component>;
    }}/>

    );
  }
}

var Home=React.createClass({

  getInitialState:function(){
    return{
        selectedTab:'home'
    }
  },

  open:function(){
    this.refs.drawer.openDrawer();
  },
  close:function(){
    this.refs.drawer.closeDrawer();
  },
  _onActionSelected: function() {
    this._toSetting();
},
_toSetting:function(){
  this.props.navigator.push({component:Setting,
                sceneConfig: Navigator.SceneConfigs.FloatFromRight,
            });
},

  clickDrawerItem:function(text){
    alert(text);
  },

  render(){
    var toolbarActions = [
    {title: '设置'},
  ];
  var navigationView = (
      <View style={{flex: 1}}>
        <View style={{backgroundColor:'blue',justifyContent:'center',alignItems:'center',borderBottomWidth:2/PixelRatio.get(),paddingBottom:20}}>
          <Image source={require('./images/icon.png')} style={{width:60,height:60,borderRadius:60,marginTop:20}}/>
          <Text style={{marginTop: 10,color:'#fff',fontSize: 12, textAlign: 'center'}}>Coding。。。</Text>
          <Text style={{marginTop: 10,color:'#fff',fontSize: 12, textAlign: 'center'}}>邮箱：qiu951001@live.com</Text>
        </View>
        <View style={{backgroundColor:'#F5FCFF',flex:1}}>
          <CustomButtom text='收藏' click={this.clickDrawerItem}></CustomButtom>
          <CustomButtom text='下载' click={this.clickDrawerItem}></CustomButtom>
          <CustomButtom text='分享' click={this.clickDrawerItem}></CustomButtom>
        </View>
        <TouchableHighlight
          underlayColor="rgb(210, 230, 255)"
          activeOpacity={0.5}
          onPress={()=>{
            this.props.navigator.push({component:Setting,
                          sceneConfig: Navigator.SceneConfigs.FloatFromRight,
                      });
            this.close();
          }}
          style={{ borderRadius: 8,padding: 6,backgroundColor:'#F5FCFF'}}
          >
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image source={require('./images/setting.png')} style={{width:25,height:25,marginLeft:5}}/>
             <Text style={{fontSize:16,marginLeft:5}}>设置</Text>
          </View>
        </TouchableHighlight>
      </View>
    );


    return(

      <DrawerLayoutAndroid
        ref='drawer'
        drawerWidth={200}
        drawerPosition={DrawerLayoutAndroid.positions.left}
        renderNavigationView={() => navigationView}>

        <View style={{flex:1}} >

        <ToolbarAndroid
        onActionSelected={this._onActionSelected}
        onIconClicked={this.open}
       actions={toolbarActions}
       navIcon={require('./images/menu.png')}
       style={styles.toolbar}
       title="笑话精选"></ToolbarAndroid>
       <TabNavigator>
         <TabNavigator.Item
           selected={this.state.selectedTab === 'home'}
           title="主页"
           renderIcon={() => <Image source={require('./images/home.png')} style={styles.tabimage}/>}
           renderSelectedIcon={() => <Image source={require('./images/home_light.png')} style={styles.tabimage} />}
           onPress={() => this.setState({ selectedTab: 'home' })}>

            <JokesList navigator={this.props.navigator}></JokesList>

         </TabNavigator.Item>
         <TabNavigator.Item
           selected={this.state.selectedTab === 'friendscircle'}
           title="朋友圈"
           renderIcon={() => <Image source={require('./images/friendscircle.png')} style={styles.tabimage}/>}
           renderSelectedIcon={() => <Image source={require('./images/friendscircle_light.png')} style={styles.tabimage}/>}
           onPress={() => this.setState({ selectedTab: 'friendscircle' })}>

           <View style={{flex:1,backgroundColor:'white',justifyContent:'center'}}>
              <Text style={{fontSize:20,textAlign:'center'}}>
                朋友圈
              </Text>
           </View>
         </TabNavigator.Item>
       </TabNavigator>
        </View>
      </DrawerLayoutAndroid>

    );
  }
});

var CustomButtom=React.createClass({
  click:function(text){
    this.props.click(text)
  },
  render(){
    return(
  <TouchableHighlight
  onPress={this.click.bind(this,this.props.text)}
    underlayColor="rgb(210, 230, 255)"
    activeOpacity={0.5}
    style={{ borderRadius: 8,padding: 6,marginTop:5}}
    >
       <Text style={{fontSize:16,marginLeft:10}}>{this.props.text}</Text>
  </TouchableHighlight>
    );
  }
});


const styles = StyleSheet.create({
  toolbar: {
  backgroundColor: '#e9eaed',
  height: 56,
},
tabimage:{
  width:30,
  height:30,
},
});

AppRegistry.registerComponent('PracticeDemo', () => PracticeDemo);
