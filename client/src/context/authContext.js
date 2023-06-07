import axios from "axios";

export const fetchUser = async () => {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + "/users/getUser", {withCredentials: true});
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
    } catch(err) {
        console.log(err);
        localStorage.removeItem("user");
    }
};

export const googleAuth = async () => {
    fetch("http://localhost:8000/api/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("authentication has been failed!");
    })
    .then(async (resObject) => {
      const user= resObject.user;
      const username = user.displayName;
      const email= user.emails[0].value;
      const password= user.id;
      localStorage.setItem("user", JSON.stringify(user));

      try {
        await axios.post("http://localhost:8000/api/users/createUser", {username, email, password});
        axios.post("http://localhost:8000/api/auth/login", {username, password}, {withCredentials: true});
      } catch(err) {
          await axios.post("http://localhost:8000/api/auth/login", {username, password}, {withCredentials:true});
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  export const createUser = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const username = storedUser.displayName;
    const email= storedUser.emails[0].value;

    await axios.post("http://localhost:8000/api/users/createUser", {username, email}, {withCredentials: true});
  }