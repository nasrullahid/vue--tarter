export const state = {
  isAuthenticated: false,
  authData: {},
  roleAkses: [],
}

export const getters = {
  isAuthenticated: state => state.isAuthenticated,
  authData: state => state.authData,
  roleAkses: state => state.roleAkses,
}

export const mutations = {
  SET_AUTHENTICATED(state, payload) {
    state.isAuthenticated = payload;
  },
  SET_AUTHDATA(state, payload) {
    state.authData = payload;
  },
  SET_ROLEAKSES(state, payload) {
    state.roleAkses = payload;
  }
}

export const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit('SET_AUTHDATA', payload.data);
      commit('SET_AUTHENTICATED', true);
      commit('SET_ROLEAKSES', payload.role_akses);
      resolve();
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_AUTHENTICATED', false);
      commit('SET_AUTHDATA', {});
      resolve();
    });
  }
}
