import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const GameOver = props => {
    return(
        <View style = {styles.screen}>
            <Text>The Game is Over!</Text>
            <Text>Number of Rounds: {props.roundsNumber}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <Button title = 'Restart' onPress = {props.onRestart}/>
        </View>
    );

};


styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
        
    }
});

export default GameOver;