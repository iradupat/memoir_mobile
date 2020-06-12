import React from 'react'
import {View} from 'native-base'
import { Button,  Fab } from 'native-base';
import { FontAwesome as Icon} from '@expo/vector-icons';
//import Icon from 'react-native-vector-icons/AntDesign'
import { MaterialCommunityIcons as MatIcon } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {colors} from '../redux/config/Config'

const MyFab =(props)=>{

    return(
      //<View>
            <Fab
            active={props.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: colors.main }}
            position="bottomRight"
            onPress={props.fabFunc}>
            <AntDesign name="pushpino"  />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <MatIcon name="robot" size={23} color="#fff" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }} onPress={props.useCodeFanc}>
              <Icon name="code" size={23} color="#fff" />
            </Button>
            <Button  style={{ backgroundColor: '#DD5144' }} onPress={props.onTheMap}>
              <Icon name="map" size={23} color="#fff" />
            </Button>
          </Fab>
      //</View>
        
    )
}

export default MyFab