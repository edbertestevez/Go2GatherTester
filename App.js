/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import{
  Container, Header, Content, Label, Footer, StyleProvider, Left, Right, Button, Body, Title, Icon, Picker, Form, Item as FormItem
} from 'native-base'
import firebaseApp from './config/firebase';
import * as firebase from 'firebase';

const Item = Picker.Item;

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
  
    this.state = {
      selectedUser: null,
      userList:[]
    };
    this.listNew=[];
    this.buttons=[
      {name:"Plaza Mart", latitude:10.668925, longitude:122.945472},
      {name:"SM City Bacolod Northwing", latitude:10.672842, longitude:122.944428},
      {name:"Mayfair Plaza", latitude:10.678546, longitude: 122.954418},
      {name:"Stratium Software Group", latitude:10.697021, longitude:122.961264},
      {name:"Ikthus Bacolod", latitude:10.688487, longitude:122.957663},
      {name:"Robinsons Place Bacolod", latitude:10.691062, longitude:122.958627},
      {name:"Jollibee Lacson", latitude:10.675168, longitude:122.952799},
    ]
  }

  componentWillMount(){
    firebase.database().ref("/users/").on('child_added',(snapshot)=>{
      console.log(snapshot.key);
      var newUser = snapshot.key;
      
      this.listNew.push(newUser);
      this.setState({
        userList: this.listNew
      })
      console.log("USER LIST: ",this.listNew)
    });
  }

  updateLocation(lat,long){
    //alert("Latitude:"+lat+", Longitude"+long)
    firebase.database().ref("/users/"+this.state.selectedUser+"/location").set({
      latitude: lat,
      longitude: long,
    })
  }

  render() {
    return (
      <Container style={{backgroundColor:'#1b5454',alignItems:'center', width:'100%'}}>
        <Image source={require('./img/logo.png')} style={styles.logoIcon}/>
        <Text style={{fontSize:20, color:'white'}}>Selected User:</Text>
        {/*<Text style={{fontSize:20, color:'white', marginBottom: 10, fontWeight:'bold'}}>{this.state.selectedUser}</Text>*/}
        <Form style={{width:"90%", backgroundColor: "#fafafa", marginBottom:22, marginTop:20}}>
          <Picker
              mode="dropdown"
              placeholder="Select User"
              onValueChange={(value)=>this.setState({selectedUser:value})}
              selectedValue={this.state.selectedUser}
            >
              {this.state.userList.map((item, index) => {
                return(<Picker.Item label={item} value={item} key={index}/>);
              })}
            </Picker>
          </Form>
        <Content style={{backgroundColor:'#1b5454', width:'100%', marginBottom:70}}>
        {this.buttons.map((record,index)=>{
          return(
            <Button 
              key={index}
              danger rounded block style={styles.buttonMain}
              onPress={()=>this.updateLocation(record.latitude, record.longitude)}>
              <Text style={styles.buttonText}>{record.name}</Text>
            </Button>
          )
          })
        }
          </Content>

         <View style={styles.footerContainer}>
            <Text style={styles.footerText}> &#9400; All Rights Reserved</Text>
            <Text style={styles.footerText}> DecypherApps</Text>
          </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText:{
    color:'white',
    fontSize: 16
  },
  buttonMain:{
    marginTop:5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
    padding: 20
  },
  footerText:{
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  footerName:{
    fontSize: 14,
    color: 'white',
    fontWeight:'bold',
    textAlign: 'center',
  },
  footerContainer:{
    width:'100%',
    position: 'absolute',
    bottom: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  logoIcon:{
    width: 200,
    height: 200,
    marginBottom:-15
  }
});
