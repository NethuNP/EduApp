import { useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "746617097952-jf063r7sebdcpejauh1l39naq3ttklr0.apps.googleusercontent.com";
const API_KEY = "AIzaSyBybz5KsgS6W2KSh1LTeQka1IFaFtIqg1c";

export const useGoogleAuth = () => {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        scope: "https://www.googleapis.com/auth/drive.file",
      }).then(() => {
        console.log("Google API initialized");
      }).catch(err => {
        console.error("GAPI init error", err);
      });
    };

    gapi.load("client:auth2", initClient);
  }, []);
};
