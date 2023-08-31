import React, { StyleSheet } from 'react-native';
import { SafeAreaView, View, Text, TouchableOpacity,FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../utils/Colors';
import { Font_Family } from '../../utils/Fontfamily';
import { FONT_SIZES } from '../../utils/FontSize';

const RowItem = ({ onPressHandler, heading, icon }) => {
    return (
        <TouchableOpacity style={styles.rowStyles} onPress={onPressHandler}>
            {icon}
            <Text style={styles.customerText}>{heading}</Text>
        </TouchableOpacity>

    );
};

const data = [1,2,3,4,5,6,7,8]

const notificationLists = ()=>{
    return(
        <View style={[styles.mainView,]}>
        <RowItem
            heading={'Payment received of Rs.1035, Lorem ispum dolor sit amet, consectetur adipiscing elit'}
            onPressHandler={() => { }}
            icon={
                <FontAwesome
                    name="circle"
                    size={10}
                    color={Colors.primary}
                />
            }
        />
        <Text style={styles.timeText}>1:40 PM, 10 Aug 2023.</Text>
    </View>
    )
}

export const Notification = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff'}}>
               <FlatList data={data} renderItem={notificationLists}/>
               <View style={{marginBottom:30}}/>
         </View>
    )
}
const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#ffffff',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
        marginBottom:10

    },
    customerText: {
        fontFamily: Font_Family.medium,
        color: '#000000',
        padding: 15,

    },
    rowStyles: {
        flexDirection: 'row',
        marginTop: 15,
        paddingLeft: 20,
        alignItems: 'center',
    },
    timeText: {
        alignSelf: 'flex-end', paddingRight: 10, paddingBottom: 10,
        fontFamily: Font_Family.regular,
        fontSize: FONT_SIZES.tweleve,
        color: '#7a7a7a',

    },
})