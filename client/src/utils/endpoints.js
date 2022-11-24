export const saveInfos = async (body) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    username: body.userName,
    password: body.password,
    email: body.email,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("http://localhost:3030/saveInfosLogin", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const verifyEmailAlreadyExists = async (email) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  let exists = {};

  await fetch(
    `http://localhost:3030/verifyEmailAlreadyExist/${email}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => (exists = result))
    .catch((error) => console.log("error", error));
    return exists;
};

export const getGoogleInfo = async (accessToken) => {
  let body = {};

  await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
  )
    .then((response) => response.json())
    .then((result) => (body = result));
  if (body) {
    let userName = body.given_name + " " + body.family_name;
    let email = body.email;

    return {
      userName,
      email,
    };
  }
};
export const verifyInfoToSignIn = async (email, password) => {
  try {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let responseSearch = {};
    await fetch(
      `http://localhost:3030/verifyDataToLogin/${email}/${password}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => (responseSearch = result))
      .catch((error) => console.log(error));
    return responseSearch;
  } catch (error) {
    console.log(error);
  }
};

export const sendEmailToNewPassword = async (email) => {
  try {
    let responseRequest;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("http://localhost:3030/forgetEmail", requestOptions)
      .then((response) => response.json())
      .then((result) => responseRequest = result)
      .catch((error) => console.log("error", error));
      return responseRequest
  } catch (error) {}
};
