import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  principal: {
    flex: 1,
  },

  buttonContainer: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },

  content: {
    backgroundColor: 'white',
    marginBottom: 9,
    flex: 6,
    flexDirection: 'column',
  },

  checkbox: {
    height: 25,
    borderWidth: 2,
    width: 25,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    borderColor: 'black',
    borderRadius: 2,
    flexWrap: 'wrap',
  },
  text: {
    flexDirection: 'row',
  },
  label: {
    paddingTop: 15,
    fontSize: 15,
    flex: 1,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    height: height * 0.25,
    paddingLeft: 10,
    fontSize: width * 0.05,
    textAlignVertical: 'top',
  },
  textBox: {
    paddingLeft: 10,
    paddingTop: 30,
    paddingRight: 10,
  },
});

export default class reportObservationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      observation: this.props.observation,
    };
  }


  concludeReport() {
    this.props.setReportObservation(this.state.observation);
    Actions.pop();
  }

  render() {
    return (
      <ScrollView style={styles.content}>
        <Header
          title={'Relatório'}
          subTitle={'Estoque de Alimentos'}
          backButton
        />

        <View behavior="padding">
          <View style={styles.textBox}>
            <TextInput
              onChangeText={text => this.setState({ observation: text })}
              style={styles.textInput}
              multiline
              value={this.state.observation}
              underlineColorAndroid="transparent"
              placeholder="Observações gerais que gostaria de adicionar ?(opcional)"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            this.concludeReport()
          }
          key="setObservation"
        >
          <Text style={styles.buttonText}>Concluir</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

reportObservationScreen.propTypes = {
  setReportObservation: PropTypes.func.isRequired,
  observation: PropTypes.string.isRequired,
};