export default {
    state: {
        username: null,
        authenticated: false, //登录状态
    },
    mutations: {
        set_user_auth(state, payload) {
            state.username = payload.user.username;
            state.nickname = payload.user.nickname;
            state.avatar = payload.avatar;
            state.user_id = payload.user.id;
            state.authenticated = true;
        },
        del_user_auth(state) {
            state.username = null;
            state.nickname = null;
            state.avatar = null;
            state.user_id = null;
            state.authenticated = false;
        }
    },
    actions: {
        setAuthUser({commit, dispatch}) {
            return this.axios.post('/api/user/user').then(response => {
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
            return this.axios.post('/refreshToken').then(response => {
                dispatch('loginSuccess', response.data);
            }).catch(error => {
                // dispatch('logoutRequest');
            });
        }
    }
}