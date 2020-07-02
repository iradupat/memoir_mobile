import React from 'react';

import {StyleSheet, StatusBar, Dimensions} from 'react-native'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import ReduxThunk from 'redux-thunk';
import authReducer from './src/redux/redusers/Auth'
import AppReducer from './src/redux/redusers/AppReducer'
import Navigation from './src/components/navigation'
import MapReducer from './src/redux/redusers/MapReduces'
import UserReducer from './src/redux/redusers/UserReducer'
import OrderReducer from './src/redux/redusers/OrderReducer'
import WaiterReducers from './src/redux/redusers/WaiterReducers'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const rootReducer = combineReducers({
  auth: authReducer,
  app: AppReducer,
  map: MapReducer,
  user: UserReducer,
  order: OrderReducer,
  waiter: WaiterReducers  

});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default class App extends React.Component {

 
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      width  : Dimensions.get('window').width,
      height :Dimensions.get('window').height
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }


  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

   return (
        <Provider store={store}>
              <StatusBar  hidden />
             <Navigation/>
         </Provider> 
     
   )
  
}
}

const styles = StyleSheet.create({
  main:{
    backgroundColor:'white',
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  mainTextColor:{
    color:'#D7DB46'
  }
})
