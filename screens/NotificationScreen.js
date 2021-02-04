import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'

export default class NoficiationScreen extends React.Component{
    render(){
        return(
            <View>
                <Text>
                    Notification's Here
                </Text>
            </View>
        )
    }
}