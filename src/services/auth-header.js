export default function withHeader(key='customer') {
    let user = JSON.parse(localStorage.getItem(key));
    console.log("user header=",user);
    if (user && user.token) {
      const config = {
          headers: { Authorization: `Bearer ${user.token}` }
      };
      return config;
    } else {
      return {};
    }
  }