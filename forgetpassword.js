import React, { Component } from 'react';
import {
  Platform,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import {styles} from './styles';
import adminpage from './Admin'
import viewmoneyrequestpage from './Viewmoney'
import viewprojectrequestpage from './Viewproject'
import signupform from './App'
import options from './opti'
export default class forgetpassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '' ,password: ''};
  
}
async checkUser(data) {
    try {
      let response = await fetch('http://172.17.73.189:8080/forgetpassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log(error);
      return;
    }
  }






  render() {
    return (
    
      <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Password Reset</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Your email"
          underlineColorAndroid={'transparent'}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Your Password"
          secureTextEntry={true}
          underlineColorAndroid={'transparent'}
          onChangeText={password => this.setState({ password })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={
            async () => {
                try{  
                    let temp = this.checkUser(this.state)
                    // .then(
                        // console.log(this.state);
                      alert("Password has been sent to your registered email address.")
                      this.props.navigation.navigate('login')
                    //   ); 
                } catch (err) {
                  console.log(err);
                }
          }}>
          <Text style={styles.btntext}>Confirm</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}


