import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Navigator,
  PixelRatio,
  TouchableHighlight,
  Image,
  ProgressBarAndroid,
  ToolbarAndroid,
  BackAndroid,
  View
} from 'react-native';

var JokeContent=React.createClass({
  getInitialState:function(){
    return{
    }
  },

  componentDidMount:function() {
    BackAndroid.addEventListener('hardwareBackPress',function(){
          return true;
    });
},

renderDifferentView:function(joke){
  if(joke.picUrl==''){
    return(
      <View style={{flex:1,padding:5}}>
        <Text style={{flex:1,fontSize:20}}>
        {joke.content}
        </Text>
      </View>
    );
  }else{
    return(
      <View style={{flex:1,padding:5}}>
        <Text style={{fontSize:20}}>
        {joke.content}
        </Text>
        <Image source={{uri:joke.picUrl}} style={{resizeMode:'contain',flex:1}}/>
      </View>
    );
  }
},

_back:function(){
  this.props.navigator.pop();
},
  render(){
    return(
      <View style={{flex:1,backgroundColor:'#ffffff'}}>
      <ToolbarAndroid
      onIconClicked={this._back}
     navIcon={require('./images/back.png')}
     style={styles.toolbar}
     title="笑话详情"></ToolbarAndroid>
      {this.renderDifferentView(this.props.joke)}
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

module.exports=JokeContent;
