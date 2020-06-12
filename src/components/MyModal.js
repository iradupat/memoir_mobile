import React from 'react'
import {View,Modal} from 'react-native'
import {Button,Header, Left,Body,Right, Icon} from 'native-base'

const MyModal =props=>{
    const config = props.config
   console.log("Hello")
    return(
        <Modal
            visible={true}
            transparent = {false}
            animationType ={config.animation}

        >
            <Header>
                <Left>
                    <Button transparent>
                            <Icon type="Ionicons" name="ios-close"/>
                    </Button>
                </Left>
            </Header>


        </Modal>
    )
}

export default MyModal