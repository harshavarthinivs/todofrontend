/**
 *
 * @param {FormData} formData
 *
 *  Takes the form data and returns the object containing token if registered successfully
 *  else returns an object containing  error message if already registered
 *  else returns an empty object if anything goes wrong
 *
 * Form data structure
 * {
 * username,
 * password,
 * email,
 * firstName,
 * lastName,
 * }
 *
 * when registration is successful
 *   {
 *  token :  "your jwt token",
 *  }
 *
 * when registration is unsuccessful
 *  {
 *  message : "error message",
 *  }
 *  
 * if something goes wrong 
 *   {
 *   
 *   }
 */

import endPointUrl from "../endPoint";

const registerApi = async (formData) => {
  const url = endPointUrl + "/auth/register";

  const body = JSON.stringify({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    return await response.json();
  } catch (e) {
    console.log(e);
    return {};
  }
};

export default registerApi;
