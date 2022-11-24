import fetch from "node-fetch";
import ForgetPasswordModel from "../model/ForgetPasswordModel.js";
import SendEmail from "../utils/sendEmail.js";


class ForgetPasswordController { 
  async sendEmailToRecoverPassword(email){
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    let dataExists;

    const forgetPasswordModel = new ForgetPasswordModel();
    dataExists = await forgetPasswordModel.verifyEmailExists(email)
    if(!dataExists) return {message:"Email doesn't exists!"}

    const newPassword = forgetPasswordModel.updatePassword(email)
    
    const responseEmailJS = await SendEmail(dataExists, newPassword)

    if(responseEmailJS === "OK"){
      return {message: "New password sent."};
    } else{
      return {message: "There is an error. Contact us!"};
    }
  }
}
 
export async function  forgetPassword(req, res) {
  const forgetPasswordController = new ForgetPasswordController()
  const email = req.body;
  const response = await forgetPasswordController.sendEmailToRecoverPassword(email);
  res.status(200).send(response);
}