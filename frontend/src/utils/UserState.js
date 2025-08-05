class UserState {
  static instance;
  user = null;

  constructor() {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("role");

    if (userId && userRole) {
      this.user = { _id: userId, role: userRole };
    } else {
      this.user = null;
    }
  }

  static getInstance() {
    if (!UserState.instance) {
      UserState.instance = new UserState();
    }
    return UserState.instance;
  }

  setUser(user) {
    this.user = user;
    if (user) {
      localStorage.setItem("userId", user._id);
      localStorage.setItem("role", user.role);
    } else {
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
    }
  }

  getUser() {
    return this.user;
  }

  removeUser() {
    this.setUser(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  }
}

const userState = UserState.getInstance();
export default userState;
