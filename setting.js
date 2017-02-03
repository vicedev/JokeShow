import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Navigator,
  PixelRatio,
  TouchableHighlight,
  Image,
  ToolbarAndroid,
  BackAndroid,
  View
} from 'react-native';

var AboutMe=require('./aboutme');

var Setting=React.createClass({
  getInitialState:function(){
    return{
    }
  },

  componentDidMount:function() {
},

_back:function(){
  this.props.navigator.pop();
},
  render(){
    return(
      <View style={{flex:1,backgroundColor:'#F5F5F5'}}>
      <ToolbarAndroid
      onIconClicked={this._back}
     navIcon={require('./images/back.png')}
     style={styles.toolbar}
     title="设置"></ToolbarAndroid>
     <View style={{flex:1}}>
     <TouchableHighlight
       underlayColor="rgb(210, 230, 255)"
       activeOpacity={0.5}
       onPress={()=>{
         this.props.navigator.push({component:AboutMe,
                       sceneConfig: Navigator.SceneConfigs.FloatFromRight,
                   });
       }}
       style={{padding: 10,backgroundColor:'#fff',marginTop:10}}
       >
       <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={{fontSize:16,marginLeft:5}}>关于我</Text>
       </View>
     </TouchableHighlight>
     </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  toolbar: {
  backgroundColor: '#e9eaed',
  height: 56,
},
});

module.exports=Setting;
