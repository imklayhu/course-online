const user = {
  state: {
    name: window.localStorage.getItem('name') || '',
    username: window.localStorage.getItem('username') || '',
    password: window.localStorage.getItem('password') || '',
    id: window.localStorage.getItem('id') || '',
    college: '',
    team: '',
    profession: '',
    avatar: "https://i2.hdslb.com/bfs/face/0088e22e3768fc3cbd4bb18fd2d742148735ab49.jpg@72w_72h.webp",
  },
  mutations: {
    SET_USERDATA: (state, userData) => {
      state.name = userData.name;
      window.localStorage.setItem('name', userData.name);

      state.username = userData.username;
      window.localStorage.setItem('username', userData.username);

      state.password = userData.password;
      window.localStorage.setItem('password', userData.password);

      state.id = userData.id;
      window.localStorage.setItem('id', userData.id);

      state.college = userData.college;
      state.team = userData.team;
      state.profession = userData.profession;
      state.avatar = userData.avatar;
    },
    SET_USERLOGOUT: (state) => {
      state.username = null;
      window.localStorage.removeItem('username');
      state.name = null;
      window.localStorage.removeItem('name');
      state.id = null;
      window.localStorage.removeItem('id');
      state.password = null;
      window.localStorage.removeItem('password');

      state.college = null;
      state.team = null;
      state.profession = null;
      state.avatar = null;
    },
    RESET_PASSWORD: (state,newPassword)=>{
      state.password = newPassword;
      window.localStorage.setItem('password',newPassword);
    }
  },
  actions: {
    Login({
      commit
    }, userData) {
      commit('SET_USERDATA', userData);
    },
    Logout({ commit }){
      commit('SET_USERLOGOUT')
    },
    ResetPassword({commit,newPassword}){
      commit('RESET_PASSWORD',newPassword);
    }
  }
}

export default user;
