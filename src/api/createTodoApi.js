import endPointUrl from "../endPoint";

/**
 *
 * @param {*} formData
 * @returns  data object returned from the server
 *
 */
const createTodoApi = async (data, token) => {
  const url = endPointUrl + "/todo";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default createTodoApi;
