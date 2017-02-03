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

var AboutMe=React.createClass({
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
     title="关于我"></ToolbarAndroid>
     <View style={{flex:1,justifyContent:'center'}}>
     <Text style={styles.content}>
      这是一个React Native练手作品
     </Text>
     <Text style={styles.content}>
      by:vice
     </Text>
     <Text style={styles.content}>
      邮箱：qiu951001@live.com
     </Text>

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
  content:{
    fontSize:16,
    textAlign:'center'
  }
});

module.exports=AboutMe;
