import React from 'react'
import Home from '../screens/HomeScreen'
import Settings from '../screens/SettingsScreen'
import OrdersScreen from '../screens/OrdersScreen'
import MenuScreen from '../screens/MenuScreen'
import ProductScreen from '../screens/ProductDetailsScreen'
import MappScreen from '../screens/MapScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ChatBoatScreen from '../screens/ChatBoat'
import CurrentOrder from '../screens/CurentOrderScreen'
import LoginWaiterScreen from '../screens/LoginWaiterScreeen'
import WaiterHomeScreen from '../screens/WaiterHomeScreen'
import WaiterTablesScreen from '../screens/WaiterTablesScreen'
import OrderTableScreen from '../screens/TableOrdersScreen'
import PayOrderScreen from '../screens/PayOrderScreeen'
import WelcomePage from '../screens/WelcomPage'
import TestScreen from '../screens/TestScreen'
import GoogleScreen from '../screens/GoogleOauthScreen'
import {Router, Stack, Scene, Tabs } from 'react-native-router-flux'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import HouseOrders from '../screens/HouseOrdersScreen'
import TableViewScreen from '../screens/TableScreen'
//import NewLoginScreen from '../new_screens/Login'

// import EncIcon from 'react-native-vector-icons/Entypo';
// import Icon from 'react-native-vector-icons/AntDesign'
// import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {colors} from '../redux/config/Config'


const AppNavigator = (props) => {
    
    const TabIcon =({focused , useFont, iconName}) =>{
        var col = focused?colors.main:'grey'
        if (useFont){
            return <FontAwesome name={iconName} size={32} color={col}/>
        }
        return <Ionicons name={iconName} size={32} color={col} />;
        
    }
    return(

        <Router>
            <Scene key="root" hideNavBar={true} swipeEnabled={false}>
                <Scene key="welcom_page" component={WelcomePage}/>
               
                
                {/* <Scene key="register" component={RegisterScreen} title="Registration Form" /> */}
                <Scene key="waiter_login" initial={false} component={LoginWaiterScreen}/>
                <Scene key='home'  tabs  activeTintColor="#D7DB46" >
                   {/* settings tab */}
                    <Scene  key="settings"  title="settings" iconName="ios-settings" icon={TabIcon} hideNavBar={true} >

                            <Scene key = "home_settings"  component={Settings}  title='settings'/>
                            <Scene key = "map_settings"  component={MappScreen}   title='On The Mapp'/>
                            <Scene key = "profile_settings"  component={ProfileScreen} title="profile"/>
                            <Scene key = "chat_settings"  component={ChatBoatScreen} title="Wewe"/>
                            
                    </Scene>
                    {/* home tab */}
                    <Scene key="home_screen" iconName="md-qr-scanner" title="scan" initial icon= {TabIcon } hideNavBar={true} >
                         <Scene key = "home_scan" component={Home} title='scan'  />
                         <Scene key = "home_menu"  component={MenuScreen}  title='Menu'  hideNavBar={true}/>
                         <Scene key = "home_order" component={CurrentOrder} title="orders" hideNavBar={true}/>
                         <Scene key = "home_product"  component={ProductScreen}  title='Product'   hideNavBar={true}/>
                         <Scene key = "pay_screen" component={PayOrderScreen} title="PAYMENT"/>
                    </Scene>
                    {/* oreders screen */}
                    <Scene key="orders_screen"  iconName="ios-notifications" title="Orders" icon={TabIcon}  >
                         <Scene key = "orders" component={OrdersScreen} title='Orders' hideNavBar={true} />
                    </Scene>                    

                </Scene>
                 {/* waiter tabls */}
                <Scene key="waiter_screens" tabs  activeTintColor="#D7DB46" hideNavBar>
                        <Scene  key="waiter_home"  title="House Tables" iconName="ios-list" icon={TabIcon} hideNavBar>
                            <Scene key = "house_tables"  component={WaiterHomeScreen}  title='Home'/>
                            <Scene key="orders_table" component={TableViewScreen} title="ORDERS" />
                        </Scene>
                        <Scene key="waiter_tables" title="On Your List" iconName="spinner" useFont={true} icon={TabIcon} hideNavBar>
                            <Scene key="waiter_tables_screen" component={HouseOrders} />
                        </Scene>
                </Scene>
            </Scene>
            
        </Router>
    )
}

export default AppNavigator