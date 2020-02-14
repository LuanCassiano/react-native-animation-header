/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    Animated,
    Platform,
} from 'react-native';

import champions from './champion.json';

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const App = () => {
    const scrollOffset = new Animated.Value(
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
    );

    const _renderItem = () => {
        return (
            <View style={styles.scrollViewContent}>
                {champions.map(champ => (
                    <View key={champ.id} style={styles.row}>
                        <Text>{champ.name}</Text>
                    </View>
                ))}
            </View>
        );
    };

    const scrollY = Animated.add(
        scrollOffset,
        Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );

    const headerTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
    });

    const imageTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 100],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.fill}>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="rgba(0, 0, 0, 0.251)"
            />
            <Animated.ScrollView
                style={styles.fill}
                scrollEventThrottle={1}
                contentInset={{top: HEADER_MAX_HEIGHT}}
                contentOffset={{y: -HEADER_MAX_HEIGHT}}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollOffset}}}],
                    {useNativeDriver: true},
                )}>
                {_renderItem()}
            </Animated.ScrollView>
            <Animated.View
                pointerEvents="none"
                style={[
                    styles.header,
                    {transform: [{translateY: headerTranslate}]},
                ]}>
                <Animated.Image
                    style={[
                        styles.backgroundImage,
                        {
                            opacity: imageOpacity,
                            transform: [{translateY: imageTranslate}],
                        },
                    ]}
                    source={{
                        uri:
                            'https://i.pinimg.com/originals/11/1a/03/111a03133d14214539c96e0f657dff1a.png',
                    }}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#03A9F4',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 28 : 38,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
