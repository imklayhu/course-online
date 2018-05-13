const user = {
  state: {
    name: window.localStorage.getItem('name') || '',
    username: window.localStorage.getItem('username') || '',
    password: window.localStorage.getItem('password') || '',
    id: window.localStorage.getItem('id') || '',
    school: window.localStorage.getItem('school') || '',
    college: window.localStorage.getItem('college') || '',
    team: window.localStorage.getItem('team') || '',
    profession: window.localStorage.getItem('profession') || '',
    signature: window.localStorage.getItem('signature') || '',
    type: window.localStorage.getItem('type') || '',
    avatar: window.localStorage.getItem('avatar') || 'https://pic3.zhimg.com/v2-e1ad4b097cf8139ea1f754c8fbb2df90_im.jpg',
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

      state.signature = userData.signature;
      window.localStorage.setItem('signature', userData.signature);

      state.school = userData.school;
      window.localStorage.setItem('school', userData.school);

      state.college = userData.college;
      window.localStorage.setItem('college', userData.college);

      state.team = userData.team;
      window.localStorage.setItem('team', userData.team);

      state.profession = userData.profession;
      window.localStorage.setItem('profession', userData.profession);

      state.type = userData.type;
      window.localStorage.setItem('type', userData.type);

      state.avatar = userData.avatar;
      window.localStorage.setItem('avatar',userData.avatar);
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

      state.signature = null;
      window.localStorage.removeItem('signature');

      state.school = null;
      window.localStorage.removeItem('school');

      state.college = null;
      window.localStorage.removeItem('college');

      state.team = null;
      window.localStorage.removeItem('team');

      state.profession = null;
      window.localStorage.removeItem('profession');

      state.type = null;
      window.localStorage.removeItem('type');

      state.avatar = null;
      window.localStorage.setItem('avatar',"https://pic3.zhimg.com/v2-e1ad4b097cf8139ea1f754c8fbb2df90_im.jpg");
    },
    RESET_PASSWORD: (state, newPassword) => {
      state.password = newPassword;
      window.localStorage.setItem('password', newPassword);
    },
    SET_SIGNATURE: (state, newSignature) => {
      state.signature = newSignature;
      window.localStorage.setItem('signature', newSignature);
    },
    SET_USERNAME: (state, newUsername) => {
      state.username = newUsername;
      window.localStorage.setItem('username', newUsername);
    },
    SET_NAME: (state, newName) => {
      state.name = newName;
      window.localStorage.setItem('name', newName);
    },
    SET_SCHOOL: (state, newSchool) => {
      state.school = newSchool;
      window.localStorage.setItem('school', newSchool);
    },
    SET_COLLEGE: (state, newCollege) => {
      state.college = newCollege;
      window.localStorage.setItem('college', newCollege);
    },
    SET_PROFESSION: (state, newProfession) => {
      state.profession = newProfession;
      window.localStorage.setItem('profession', newProfession);
    },
    SET_TEAM: (state,newTeam) => {
      state.team = newTeam;
      window.localStorage.setItem('team',newTeam);
    }
  },
  actions: {
    Login({
      commit
    }, userData) {
      commit('SET_USERDATA', userData);
    },
    Logout({
      commit
    }) {
      commit('SET_USERLOGOUT');
    },
    ResetPassword({
        commit,
      },
      newPassword) {
      commit('RESET_PASSWORD', newPassword);
    },
    GetSignature({
        commit
      },
      newSignature) {
      commit('SET_SIGNATURE', newSignature);
    },
    ResetUsername({
      commit
    }, newUsername) {
      commit('SET_USERNAME', newUsername);
    },
    ResetName({
      commit
    }, newName) {
      commit('SET_NAME', newName);
    },
    ResetSchool({
      commit
    }, newSchool) {
      commit('SET_SCHOOL',newSchool);
    },
    ResetCollege({
      commit
    }, newCollege) {
      commit('SET_COLLEGE',newCollege);
    },
    ResetProfession({
      commit
    }, newProfession) {
      commit('SET_PROFESSION',newProfession);
    },
    ResetTeam({
      commit
    }, newTeam) {
      commit('SET_TEAM',newTeam);
    },
  }
}

export default user;
