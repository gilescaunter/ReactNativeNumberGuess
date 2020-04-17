import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text, Button, Alert} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min,max,exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = props => {
    const [currGuess, setCurrGuess] = useState(
        generateRandomBetween(1,100,props.userChoice)
        );

    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if (currGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currGuess < props.userChoice)||( direction ==='higher' && currGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know this is wrong ...', [{text: 'Sorry', style:'cancel'}])
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currGuess;

        } else {
            currentLow.current = currGuess;
        };
        const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current,currGuess);
        setCurrGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    };

    return(
        <View style = {styles.screen}>
            <Text>
                Opponents' Guess

            </Text>
            <NumberContainer>{currGuess}</NumberContainer>
            <Card style = {styles.buttonContainer}>
                <Button title = "LOWER" onPress = {nextGuessHandler.bind(this,'lower')}/>
                <Button title = "HIGHER" onPress = {nextGuessHandler.bind(this,'higher')}/>
            </Card>
        </View>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding:10,
        alignItems:'center'
    },
    buttonContainer: {
        flexDirection:'row',
        justifyContent: 'space-around',
        marginTop:20,
        width:300,
        maxWidth: '80%'
    }
});

export default GameScreen;