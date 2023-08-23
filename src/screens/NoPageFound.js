import React from 'react';

import { SafeAreaView,View,Text } from 'react-native';
import Header from '../components/header/Header';


const NoPageFound = ()=>{
    return(
        <SafeAreaView style={{flex:1,justifyContent:'center',alignSelf:'center'}}>
            {/* <Header/> */}
            <View>
                <Text>
                    No Page Found.....
                </Text>
            </View>
        </SafeAreaView>
    )
}
export default NoPageFound;