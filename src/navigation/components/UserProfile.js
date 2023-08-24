import { Image, View, Text } from "react-native";
import { Font_Family } from "../../utils/Fontfamily";

export function UserProfile({ imageSource, firstName, lastName }) {
    return (
        <View style={{ alignItems: 'center', padding: 10 }}>
            <Image source={imageSource} style={{ width: 80, height: 80, borderRadius: 50 }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#000000', fontFamily: Font_Family.medium }}>{firstName} {lastName}</Text>
        </View>
    );
}