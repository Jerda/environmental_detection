export default {
    state: {
        username: null,
        authenticated: false, //登录状态
    },
    mutations: {
        set_user_auth(state, payload) {
            state.username = payload.user.username;
            state.authenticated = true;
        },
        del_user_auth(state) {
            state.username = null;
            state.authenticated = false;
        }
    },
    actions: {
        setAuthUser({commit, dispatch}) {
            return axios.post('/api/user/user').then(response => {
                commit({
                    type: 'set_user_auth',
                    user: response.data
                });
            });
        },
        delAuthUser({commit}) {
            return commit({
                type: 'del_user_auth',
            })
        },
        refreshToken({commit, dispatch}) {
            return axios.post('/refreshToken').then(response => {
                dispatch('loginSuccess', response.data);
            }).catch(error => {
                // dispatch('logoutRequest');
            });
        }
    }
}