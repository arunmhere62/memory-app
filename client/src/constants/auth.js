import Cookies from "js-cookie";

const isAuthenticated = () =>  !!Cookies.get('userToken');

export {isAuthenticated}