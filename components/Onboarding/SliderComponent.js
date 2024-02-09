import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import OnboardingOne from './OnboardingOne';
import OnboardingTwo from './OnboardingTwo';
import OnboardingThree from './OnboardingThree';

const SliderComponent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const windowWidth = Dimensions.get('window').width;

    const handleIndexChanged = (index) => {
        setActiveIndex(index);
    };

    const DOT = <View style={{ backgroundColor: '#e4e6ec', width: 32, height: 4, borderRadius: 6, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />
    const ACTIVE_DOT = <View style={{ backgroundColor: '#ffffff', width: 32, height: 10, borderRadius: 6, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />
    return (
        <View style={styles.container}>
            <Swiper
                style={styles.swiperWrapper}
                loop={false}
                dot={DOT}
                activeDot={ACTIVE_DOT}
                onIndexChanged={handleIndexChanged}
                renderPagination={() => {
                    return (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: '34%',
                                width: windowWidth,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {activeIndex === 0 ? ACTIVE_DOT : DOT}
                            {activeIndex === 1 ? ACTIVE_DOT : DOT}
                            {activeIndex === 2 ? ACTIVE_DOT : DOT}
                        </View>
                    );
                }}
            >
                <View style={styles.slide}>
                    <OnboardingOne />
                </View>
                <View style={styles.slide}>
                    <OnboardingTwo />
                </View>
                <View style={styles.slide}>
                    <OnboardingThree />
                </View>
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SliderComponent;













//////67890-

// loop={false}
// showsButtons={true}
// renderPagination={(index, total = 3) => (<
//     SlantPagination index={index} total={total} activeIndex={activeIndex} />
// )}
// onIndexChanged={handleIndexChanged}




