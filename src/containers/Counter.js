import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Expo from 'expo';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Content, Button, Footer, Icon } from 'native-base';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../actions/counter';

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

@connect(
  state => state,
  dispatch => bindActionCreators(CounterActions, dispatch)
)
export default class Counter extends Component {
  static propTypes = {
    incrementAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired,
  };

  state = {
      isReady: false
  };

  constructor(props) {
    super(props);
    const { incrementAsync } = props;
    this.incrementAsync = () => incrementAsync();
  }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({ isReady: true });
    }


    render() {
    const { increment, decrement, incrementIfOdd, counter } = this.props;
        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }
    return (
        <Container>
            <Header>
                <Left/>
                <Body>
                <Title>Header of counter</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <Text style={styles.text}>Clicked: {counter} times</Text>
                <Button onPress={increment}>
                    <Text>Click Me for add +1!</Text>
                </Button>
                <Button onPress={decrement}>
                    <Text>Click Me for remove -1!</Text>
                </Button>
            </Content>
            <Footer>
                <Text>Some text in footer</Text>
            </Footer>
        </Container>
    );
  }
}
