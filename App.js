import React, { Component } from 'react';
import {
  Modal,
  WebView,
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
// import {
//   Header,
// } from 'react-component';
// import 
//   HHeader
//  rom './HHeader.js'
import adminpage from './Admin'
import viewmoneyrequestpage from './Viewmoney'
import viewprojectrequestpage from './Viewproject'
import loginform from './Loginforms'
import options from './opti'
import donation from './Donation'
import {bank,project} from './newprojectfordonation'
import paytm from './paytm.js'
import decker from './decker'
import owndecker from './owndecker'
type Props = {};


export  class signupform extends React.Component {
  constructor(props) {
    super(props);
    this.state = { phoneno: '', password: '', email: '' };
  }
  async newUser(data) {
    try {
      let response = await fetch('http://ec2-3-14-86-69.us-east-2.compute.amazonaws.com/users', {
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
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Sign Up</Text>

        <TextInput
          style={styles.textinput}
          placeholder="Your Phone No."
          underlineColorAndroid={'transparent'}
          onChangeText={phoneno => this.setState({ phoneno })}
        />
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
          onPress={async () => {
            try {
              let status = await this.newUser(this.state);
              if (status.val == 'emailsent') {
                alert('A link has been sent to your mail please verify');
                this.props.navigation.navigate('login');
              } else if (status.val == 'alreadyemail') {
                alert('Email already exists.');
              } else if (status.val == 'dataincomplete') {
                alert('Please fill all fields correct.');
              } 
            } catch (err) {
              console.log(err);
            }
          }}>
          <Text style={styles.btntext}>Sign Up</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    login: {
      screen: loginform,
    },
    signup: {
      screen: signupform,
    },
    admin: {
      screen: adminpage,
    },
    viewmoneyrequest: {
      screen: viewmoneyrequestpage,
    },
    viewprojectrequest: {
      screen: viewprojectrequestpage,
    },
    option: {
      screen: options,
    },
    donate: {
      screen: donation,
    },
    proj: {
      screen : project,
    },
    ban: {
      screen : bank
    },
    pay: {
      screen : paytm
    },
    deck: {
      screen : decker
    },
    owndeck: {
      screen : owndecker
    },
  },

  {
    initialRouteName: 'login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#001f61',
        height:10,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);
export default createAppContainer(AppNavigator);
