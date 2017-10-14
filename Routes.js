import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import LoginCounselorContainer from './src/Containers/LoginCounselorContainer';
import InitialScreen from './src/screens/InitialScreen';
import LoginPresidentContainer from './src/Containers/LoginPresidentContainer';
import ProfileInfoScreenContainer from './src/Containers/ProfileInfoScreenContainer';
import RegisterScreenContainer from './src/Containers/RegisterScreenContainer';

const Routes = () => ({
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="initialScreen" component={InitialScreen} hideNavBar />
          <Scene key="registerScreen" component={RegisterScreenContainer} hideNavBar />
          <Scene key="loginCounselorScreen" component={LoginCounselorContainer} hideNavBar />
          <Scene key="loginPresidentScreen" component={LoginPresidentContainer} hideNavBar />
          <Scene key="profileInfoScreen" component={ProfileInfoScreenContainer} hideNavBar />
        </Scene>
      </Router>
    );
  },
});

export default Routes;
