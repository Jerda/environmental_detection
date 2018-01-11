import jwtToken from '../../helpers/jwt'

export default {
    actions: {
        loginRequest({dispatch}, formData) {
            return axios.post('/api/auth/login', formData).then(response => {
                dispatch('loginSuccess', response.data);
            }).catch(error => {
            });
        },
        loginSuccess({dispatch}, tokenResponse) {
            jwtToken.setToken(tokenResponse.token);
            dispatch('setAuthUser');
        },
        logoutRequest({dispatch}) {
            return axios.post('/logout').then(response => {
                jwtToken.removeToken();
                dispatch('delAuthUser');
            });

        }
    }
}