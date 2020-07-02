import React, {useState, useEffect} from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import {useSelector,useDispatch} from 'react-redux';
import * as MapActions from '../redux/actions/MapActions'
import { Header, Left, Button, Body, Title, Right } from 'native-base';

//import {Location} from 'expo-location'
//import * as Permissions from 'expo-permissions'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux';
import {colors} from '../redux/config/Config'
import * as Location from 'expo-location';
// import console = require('console');


const MapScreen = props =>{
    var data = useSelector(state => state.map.data)
    var isLoadind = useSelector(state => state.map.isLoadind)
    const error = useSelector(state => state.map.error)
    const initial  = useSelector(state => state.map.initial)
    const dispacher = useDispatch()
    const [mylocation, setMyLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    const [location, setLocation] = useState({
            latitude: -1.944880,
            longitude: 30.062380,
            latitudeDelta: 0.1922,
            longitudeDelta: 0.1421,
    })
   //console.log(initial)

    useEffect(()=>{

            (async () => {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                }
        
                let location = await Location.getCurrentPositionAsync({});
                setMyLocation(location);
                console.log(location)
            })();

            if (mylocation!=null){
                setLocation({
                    latitude: mylocation.coords.latitude,
                    longitude: mylocation.coords.longitude,
                    latitudeDelta: 0.1922,
                    longitudeDelta: 0.1421,
                })
            }
            if(data==null){
            dispacher(MapActions.getRestaurants())

        
            } 
            if(initial!=null){
               // setLocation({latitude:0, longitude:0, latitudeDelta: 0.1922,longitudeDelta: 0.1421 }) 
            }
        
    },[])
   

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (mylocation) {
        text = JSON.stringify(mylocation);

       // console.log(mylocation.coords)
       
    }
    
    //console.log(data)
    const onRegionChange =(region)=> {
        setLocation(region);
      }
      //console.log(location)
      if(isLoadind==true){
          return <View style={{flex:1, justifyContent:'center', alignItemes:'center'}}>
          <ActivityIndicator/>
      </View>
      } else if(error!=null){
            return<View style={{flex:1, justifyContent:'center', alignItemes:'center'}}>
                <Text>{error}</Text>
            </View>

      }else if(data !=null && mylocation!=null) {
        
    return (
        <View style={{flex:1}}>
             <Header style={{backgroundColor:colors.main}}>
                   <Left>
                        <Button transparent onPress={()=>{Actions.pop()}}> 
                            <Ionicons name="ios-arrow-back" size={27} color="#fff"/>
                            <Text style={{color:"#fff", fontSize:17}}> Back</Text>
                         </Button>
                       
                   </Left>
                   <Body style={{width:'70%'}}>
                       <Title style={{color:"#fff"}}>THE MAP</Title>
                   </Body>
                   <Right />
            </Header>


        
        
                 <MapView
                 
           style={{flex:1}}
           initialRegion={{latitude:initial.latitude,longitude: initial.longitude,latitudeDelta: 0.0622,longitudeDelta: 0.0621,}}
        //    provider = {PROVIDER_GOOGLE}
           //customMapStyle = {mapStyle}
           onRegionChange={onRegionChange}
           >
              <Marker
                coordinate = {{latitude:mylocation.coords.latitude, longitude:mylocation.coords.longitude}}
                title="YOU"
              >

              </Marker>
               {data.map(res=>{
                   if(res.house_type == "H"){
                    return(
                       
                        <Marker
                         coordinate={{latitude:res.latitude,longitude:res.longitude}}
                         title={res.name}
                         key={res.id}
                         description={res.slogan+"  "+res.phone}
                         >
                             <MatIcon name = "hotel" size={30} color={colors.P}/>
                             {/* <Text style={{fontSize:10}}>{res.name}</Text> */}
                               </Marker>
                                )

                   }else if(res.house_type=="B"){
                    return(
                       
                        <Marker
                         coordinate={{latitude:res.latitude,longitude:res.longitude}}
                         title={res.name}
                         description={res.slogan+"  "+res.phone}
                         key={res.id}
                         >
                             <Ionicons name = "ios-beer" size={30} color="#d19d49"/>
                             {/* <Text style={{fontSize:10}}>{res.name}</Text> */}
                               </Marker>
                                )

                   }else if(res.house_type=="C"){
                       return(
                       
               <Marker
                coordinate={{latitude:res.latitude,longitude:res.longitude}}
                title={res.name}
                key={res.id}
                description={res.slogan+"  "+res.phone}
                
                >
                    <View style={{justifyContent:'center', alignItemes:'center', flex:1}}>
                    <MatIcon name = "coffee" size={35} color="#8f5003"/>
                    {/* <Text style={{fontSize:10}}>{res.name}</Text> */}
                    </View>
                    
                      </Marker>
                       )
                   } else if(res.house_type=="R") {
                    return(
                       
                        <Marker
                         coordinate={{latitude:res.latitude,longitude:res.longitude}}
                         title={res.name}
                         key={res.id}
                         description={res.slogan+"  "+res.phone}
                         >
                             <Ionicons name = "ios-restaurant" size={30} color="#18a329"/>
                            {/* <Text style={{fontSize:10}}>{res.name}</Text> */}
                               </Marker>
                                )

                   }else{
                    return(
                       
                        <Marker
                         coordinate={{latitude:res.latitude,longitude:res.longitude}}
                         title={res.name}
                         key={res.id}
                         description={res.slogan+"  "+res.phone}
                         >
                             <MatIcon name = "pin-outline" size={30} color="red"/>
                           {/* <Text style={{fontSize:10}}>{res.name}</Text> */}
                               </Marker>
                                )

                   }
                })}



           </MapView>
      
           </View>
    )
    }else{

        return(
            <View style={{flex:1, justifyContent:'center', alignItemes:'center'}}>
            <ActivityIndicator/>
        </View>
        )
      }
    
}

var mapStyle = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#523735"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c9b2a6"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#dcd2be"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ae9e90"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#93817c"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a5b076"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#447530"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f8c967"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#e9bc62"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e98d58"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#db8555"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fdfcf8"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "hue": "#ff6300"
            },
            {
                "lightness": "-25"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ff9c00"
            },
            {
                "gamma": ".9"
            },
            {
                "lightness": "-24"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#806b63"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8f7d77"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b9d3c2"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#92998d"
            }
        ]
    }
]
export default MapScreen