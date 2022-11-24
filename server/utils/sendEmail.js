import emailJs from "@emailjs/browser";
import fetch from "node-fetch";

async function SendEmail(dataExists,newPassword) {
  try {
    let responseEmail = 'OK';
    var myHeaders = { "Content-Type": "application/json" };

    var raw = JSON.stringify({
      service_id: "service_fy56l0q",
      template_id: "template_x4egtsa",
      template_params: {
        username: dataExists.username,
        email: dataExists.email,
        newPassword:newPassword
      },
      user_id: "gQ-gl3XOG_YYj0_yc",
      accessToken: "pD95iGELx4tZGj5nE_5WP",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("https://api.emailjs.com/api/v1.0/email/send", requestOptions)
      .then((response) => response.text())
      .then((result) => responseEmail = result)
      .catch((error) => console.log("error", error));
    return responseEmail;
  } catch (error) {
    console.log(error);
  }
}

export default SendEmail;
