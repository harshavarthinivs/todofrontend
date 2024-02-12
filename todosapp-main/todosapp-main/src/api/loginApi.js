import endPointUrl from "../endPoint";

/**
 *
 * @param {String} username
 * @param {String} password
 * @returns {Object}
 *
 * Takes a username and password and returns an object with token if logged in successful
 * else returns an empty object
 */
const loginApi = async (username, password) => {
  const url = endPointUrl + "/auth/authenticate";

  try {
    const respsonse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await respsonse.json();
    return data;
  } catch (e) {
    console.log(e);
    return {};
  }
};

export default loginApi;
