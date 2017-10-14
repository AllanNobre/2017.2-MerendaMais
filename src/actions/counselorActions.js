import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { SET_COUNSELOR,
  LOGIN_SUCCESS, LOGIN_FAIL,
  MODIFY_CPF, LOADING,
  MODIFY_PASSWORD } from './types';

export const modifyCPF = CPF => ({
  type: MODIFY_CPF,
  payload: CPF,
});

export const modifyPassword = password => ({
  type: MODIFY_PASSWORD,
  payload: password,
});

export const setCounselor = counselor => ({
  type: SET_COUNSELOR,
  counselor,
});

export const loading = () => ({
  type: LOADING,
});

export const loginSuccess = counselor => ({
  type: LOGIN_SUCCESS,
  counselor,
});

export const loginFail = () => ({
  type: LOGIN_FAIL,
});
export const asyncCreateCounselor = userData => (dispatch) => {
  console.log(userData);
  type: SET_COUNSELOR;
  axios.post('http://merenda-mais.herokuapp.com/counselor/', userData)
    .then((response) => {
      console.log(response.data);
      dispatch(setCounselor(response));
      Actions.loginCounselorScreen();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const asyncGetCounselor = id => (dispatch) => {
  console.log(id);
  axios.get(`http://merenda-mais.herokuapp.com/counselor/${id}`)
    .then((response) => {
      console.log(response.data);
      dispatch(setCounselor(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};


export const asyncLoginCounselor = userData => (dispatch) => {
  console.log('userData: ');
  console.log(userData);
  dispatch(loading());
  axios.post('http://merenda-mais.herokuapp.com/get_auth_token/', userData)
    .then((response) => {
      console.log(response.data);
      dispatch(loginSuccess(response.data));
      Actions.profileInfoScreen();
    })
    .catch((erro) => {
      console.log(erro);
      dispatch(loginFail());
    });
};
