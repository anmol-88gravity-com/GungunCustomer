import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { FAB } from 'react-native-paper';

const NewPage = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { width, height } = Dimensions.get('window');


    const handleLogin = () => {
        // Logic for handling login
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                label="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button mode="contained" onPress={handleLogin}>
                Login
            </Button>
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => console.log('Pressed')}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default NewPage;
