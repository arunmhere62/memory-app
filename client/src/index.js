import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from "./store/store";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="19434521352-rfdk8im7cm31om0mkndo9fgdo21asrll.apps.googleusercontent.com">
        <App />
        </GoogleOAuthProvider>
        </Provider>
    , document.getElementById("root"));
