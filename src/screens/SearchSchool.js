import axios from 'axios';
import React from 'react';
import { StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
  Picker } from 'react-native';
import PropTypes from 'prop-types';
import { SideMenu } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Menu from '../components/Menu';
import { logInfo, logWarn } from '../../logConfig/loggers';


import { SCHOOL_ENDPOINT } from '../constants';

const sideMenuIcon = require('../images/ic_menu_black_48dp_1x.png');
const CityIcon = require('../images/ic_location_city_48pt.png');
const SearchIcon = require('../images/ic_search_48pt.png');
const BackIcon = require('../images/ic_keyboard_arrow_left_48pt.png');
const GoIcon = require('../images/ic_keyboard_arrow_right_48pt.png');

const FILE_NAME = 'SearchSchool.js';

const styles = StyleSheet.create({
  headerBox: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FF9500',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyBox: {
    flex: 10,
    alignItems: 'center',
  },
  textLogo: {
    flex: 1,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    margin: 5,
  },
  buttonSearchAnabled: {
    paddingHorizontal: 117,
    paddingVertical: 15,
    marginTop: 50,
    marginBottom: 0,
    backgroundColor: '#FF9500',
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonSearchDisabled: {
    paddingHorizontal: 117,
    paddingVertical: 15,
    marginTop: 50,
    marginBottom: 0,
    backgroundColor: '#DEDEDE',
    borderRadius: 8,
    borderWidth: 1,
  },
  listSchools: {
    flex: 4,
    justifyContent: 'center',
    width: 320,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
  },
  item: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    borderRadius: 7,
  },
  buttonSelectSchool: { padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonArea: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  InputDropdown: {
    marginTop: 15,
    paddingLeft: 2,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,

  },
  Input: {
    marginTop: 20,
    paddingLeft: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 7,
  },
});

console.disableYellowBox = true;

class SearchSchool extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isLoading: false,
      city: '',
      name: '',
      uf: '',
      schoolList: [],
    };

    this.validateName = this.validateName.bind(this);
    this.validateCity = this.validateCity.bind(this);
  }
  validateName(name) {
    const validName = name.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]/g, '');
    this.setState({ name: validName });
  }

  validateCity(city) {
    const validCity = city.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g, '');
    this.setState({ city: validCity });
  }

  register() {
    const nameRegex = /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]/g;
    const cityRegex = /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g;
    let error = false;
    let errorMessage = '';

    if (!cityRegex.test(this.state.city) && !nameRegex.test(this.state.name) && !(this.state.uf > '')) {
      error = true;
      errorMessage += 'Estado/Município e Escola com dados inválidos.';
    }
    if (this.state.city.trim() === '' && this.state.name.trim() === '' && this.state.uf.trim() === '') {
      error = true;
      errorMessage += 'Estado/Município e Escola não preenchidos. Preencha no mínimo um dos campos.\n';
    }
    if (error === false) {
      this.searchSchools();
    } else {
      Alert.alert('FALHA NA PESQUISA', errorMessage);
    }
  }

  searchSchools() {
    this.setState({ isLoading: true });
    axios.get(SCHOOL_ENDPOINT, {
      params: {
        nome: this.state.name,
        municipio: this.state.city,
        campos: 'nome',
        uf: this.state.uf,
      },
    })
      .then((response) => {
        logInfo(FILE_NAME, 'searchSchools', 'Successfully searched school lists.');
        logInfo(FILE_NAME, 'searchSchools', `School List: ${JSON.stringify(response.data, null, 2)}`);

        this.setState({ schoolList: response.data, isLoading: false });

        // If response is an empty array, no schools could be found.
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        logWarn(FILE_NAME, 'searchSchools', error);
      });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  buttonActivation() {
    if (this.state.city > '' || this.state.name > '' || this.state.uf > '') {
      if (this.state.isLoading) {
        return (
          <ActivityIndicator
            style={{ paddingBottom: 10 }}
            size="large"
            color="#FF9500"
          />
        );
      }
      return (
        <TouchableOpacity
          style={styles.buttonSearchAnabled}
          activeOpacity={0.7}
          onPress={() => this.register()}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>Pesquisar</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.buttonSearchDisabled}
        disabled
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Pesquisar</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const menu = <Menu />;

    return (
      <SideMenu
        menu={menu}
        menuPosition="right"
        isOpen={this.state.isOpen}
        disableGestures
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={styles.headerBox}>
            <TouchableOpacity
              onPress={() => Actions.pop()}
            >
              <Image source={BackIcon} />
            </TouchableOpacity>
            <Text style={styles.textLogo}>Pesquisar Escola</Text>

            <TouchableOpacity
              onPress={() => this.updateMenuState(true)}
            >
              <Image source={sideMenuIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.bodyBox}>
            <View style={{ flex: 3 }}>
              <View style={styles.Input}>
                <Image source={CityIcon} style={styles.icon} />
                <TextInput
                  width={280}
                  returnKeyType="go"
                  maxLength={50}
                  keyboardType={'default'}
                  onChangeText={text => this.validateCity(text)}
                  value={this.state.city} // CAE OR CITY ?
                  underlineColorAndroid="transparent"
                  placeholder="Estado/Município"
                />
              </View>

              <View style={styles.Input}>
                <Image source={SearchIcon} style={styles.icon} />
                <TextInput
                  width={280}
                  returnKeyType="go"
                  maxLength={50}
                  keyboardType={'default'}
                  onChangeText={text => this.validateName(text)}
                  value={this.state.name}
                  underlineColorAndroid="transparent"
                  placeholder="Escola a pesquisar"
                />
              </View>

              <View style={styles.InputDropdown}>
                <Picker
                  onValueChange={uf => this.setState({ uf })}
                  selectedValue={this.state.uf}
                >
                  <Picker.Item value="" label="Escolha sua UF" color="#95a5a6" />
                  <Picker.Item value="DF" label="DF" />
                </Picker>
              </View>

            </View>

            <View style={styles.listSchools} >
              <FlatList
                data={this.state.schoolList}
                keyExtractor={item => item.nome}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <TouchableOpacity
                      style={styles.buttonSelectSchool}
                      onPress={() => this.props.setSchoolInfo(item.codEscola)}
                    >
                      <Text style={{ fontSize: 16 }}>{item.nome}</Text>
                      <Image source={GoIcon} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            <View key="renderButton" style={styles.buttonArea} >
              {this.buttonActivation()}
            </View>
          </View>
        </View>
      </SideMenu>
    );
  }
}

SearchSchool.propTypes = {
  setSchoolInfo: PropTypes.func.isRequired,
};

export default SearchSchool;
