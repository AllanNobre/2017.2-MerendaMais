import React from 'react';
import { Router, Scene, Drawer } from 'react-native-router-flux';

import InitialScreen from './src/screens/InitialScreen';
import LoginContainer from './src/Containers/LoginContainer';
import ProfileInfoScreenContainer from './src/Containers/ProfileInfoScreenContainer';
import RegisterScreenContainer from './src/Containers/RegisterScreenContainer';
import MainScreen from './src/screens/MainScreen';
import SearchSchoolContainer from './src/Containers/SearchSchoolContainer';
import UpdateInfoScreenContainer from './src/Containers/UpdateInfoScreenContainer';
import StockFoodCheckoutScreenContainer from './src/Containers/StockFoodCheckoutContainer';
import SchedulingVisitContainer from './src/Containers/SchedulingVisitContainer';
import SchoolInfoContainer from './src/Containers/SchoolInfoContainer';
import MainReportsScreen from './src/screens/MainReportsScreen';
import RefectoryCheckoutContainer from './src/Containers/RefectoryCheckoutContainer';
import ManageRegistersScreenContainer from './src/Containers/ManageRegistersScreenContainer';
import Menu from './src/components/Menu';
import KitchenCheckoutContainer from './src/Containers/KitchenCheckoutContainer';
import FoodQualityCheckoutContainer from './src/Containers/FoodQualityCheckoutContainer';
import DocCheckoutContainer from './src/Containers/DocCheckoutContainer';
import ReportObservationContainer from './src/Containers/ReportObservationContainer';
import SchoolSurroundingsCheckoutContainer from './src/Containers/SchoolSurroundingsCheckoutContainer';
import AccessBooklet from './src/screens/AccessBooklet';

const Routes = () => ({
  render() {
    return (
      <Router>
        <Drawer
          hideNavBar
          key="drawer"
          drawerLockMode="locked-closed"
          contentComponent={Menu}
          drawerWidth={270}
          drawerPosition="right"
        >
          <Scene key="root">
            <Scene key="initialScreen" component={InitialScreen} type="reset" hideNavBar />
            <Scene key="manageRegisters" component={ManageRegistersScreenContainer} hideNavBar />
            <Scene key="mainScreen" component={MainScreen} type="reset" hideNavBar />
            <Scene key="searchSchool" component={SearchSchoolContainer} hideNavBar />
            <Scene key="registerScreen" component={RegisterScreenContainer} hideNavBar />
            <Scene key="loginScreen" component={LoginContainer} hideNavBar />
            <Scene key="profileInfoScreen" component={ProfileInfoScreenContainer} hideNavBar />
            <Scene key="updateInfoScreen" component={UpdateInfoScreenContainer} hideNavBar />
            <Scene key="schedulingVisit" component={SchedulingVisitContainer} hideNavBar />
            <Scene key="mainReportsScreen" component={MainReportsScreen} hideNavBar />
            <Scene key="kitchenCheckoutScreen" component={KitchenCheckoutContainer} hideNavBar />
            <Scene key="DocCheckoutScreen" component={DocCheckoutContainer} hideNavBar />
            <Scene
              key="ReportObservationScreen"
              component={ReportObservationContainer}
              hideNavBar
            />
            <Scene
              key="stockFoodCheckoutScreen"
              component={StockFoodCheckoutScreenContainer}
              hideNavBar
            />
            <Scene
              key="refectoryCheckoutScreen"
              component={RefectoryCheckoutContainer}
              hideNavBar
            />
            <Scene
              key="foodQualityCheckoutScreen"
              component={FoodQualityCheckoutContainer}
              hideNavBar
            />
            <Scene
              key="schoolSurroundingsCheckoutScreen"
              component={SchoolSurroundingsCheckoutContainer}
              hideNavBar
            />
            <Scene key="schoolInfoScreen" component={SchoolInfoContainer} hideNavBar />
            <Scene key="accessBooklet" component={AccessBooklet} hideNavBar />
          </Scene>
        </Drawer>
      </Router>
    );
  },
});

export default Routes;
