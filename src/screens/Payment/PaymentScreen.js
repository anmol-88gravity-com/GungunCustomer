import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './PaymentScreen.styles';
import { images } from '../../utils/Images';
import * as Progress from 'react-native-progress';
import { Colors } from '../../utils/Colors';
import { Button } from 'react-native-paper';

export const PaymentScreen = () => {
    const [progress, setProgress] = useState(0);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);

    const handleProgressComplete = () => {
        setPaymentSuccessful(true);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 1) {
                    clearInterval(timer);
                    handleProgressComplete();
                    return 1;
                }
                return prevProgress + 0.1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.successImg}>
                <Image source={images.success} style={{ height: '100%', width: '100%' }} />
            </View>
            {paymentSuccessful && <Text style={styles.paymentText}>Payment Successful</Text>}
            <Text style={styles.orderIdText}>Order Id: 123456 {'\n'} has been delivered</Text>

            <View style={{ marginTop: '5%', alignSelf: 'center' }}>
                <Progress.Bar
                    progress={progress}
                    width={300}
                    animated={true}
                    color={Colors.primary}
                    height={10}
                    onComplete={handleProgressComplete}
                />
            </View>

            <Button
                buttonColor={Colors.primary}
                theme={{ roundness: 0 }}
                style={styles.buttonStyles}
                contentStyle={{ height: 50 }}
                labelStyle={styles.buttonlabel}
                mode={'contained'}>
                Cancel
            </Button>
            
        </View>
    )
}