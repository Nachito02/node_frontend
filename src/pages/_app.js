import React from "react";
import AuthState from "context/auth/authState";


const myApp = ({Component, pageProps}) => {

  return (
    <AuthState>

      <Component {...pageProps} />
    

    </AuthState>
  )

}


export default myApp