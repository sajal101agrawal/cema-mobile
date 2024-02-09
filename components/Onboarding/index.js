import SliderComponent from './SliderComponent';
import { StyleSheet, StatusBar, View } from 'react-native';

export default OnboardingScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
            <SliderComponent />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
});