import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar, TouchableOpacity, Image} from 'react-native';

// import { Container } from './styles';

function Header() {
    return (
        <View>
            <View>
                <TouchableOpacity>
                    <Text>X</Text>
                </TouchableOpacity>
            
                <View
                     style={{
                        flexGrow: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginBottom: 1,
                     }}
                  >

                <View
                     style={{
                        flexGrow: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginBottom: 1,
                     }}
                  >
                     <Title marginTop="0px">{title}</Title>
                  </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Header;
