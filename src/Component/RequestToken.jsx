import React from 'react'
import qs from 'qs'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
const client_id = "wprQYMZBqqx-dgszFUfQG"
const redirect_uri = "http://localhost:3000/oauth-callback";


function RequestToken() {
    const history = useHistory()
    const requestToken = async () => {
        // const tokenEndpoint = new URL(
        //     "https://id-sandbox.cashtoken.africa/oauth/token"
        //   );
        //     console.log(tokenEndpoint)
        const currentLocation = new URL(window.location.href);
        const authorizationCode = currentLocation.searchParams.get("code");
        const stateFromLocation = currentLocation.searchParams.get("state");
        const initialCodeVerifier = window.sessionStorage.getItem("code_verifier");
        console.log(authorizationCode)
        if (window.sessionStorage.getItem("state") !== stateFromLocation){
            throw Error("Probable session hijacking attack!");
        }
        const queryParams = {
            client_id,
            grant_type: "authorization_code",
            state: stateFromLocation,
            code: authorizationCode,
            code_verifier: initialCodeVerifier,
            redirect_uri
          };
          console.log(queryParams)

         
            var options = {
                method: 'POST',
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                data: qs.stringify(queryParams),
                url: 'https://id-sandbox.cashtoken.africa/oauth/token?',
              };
              
              console.log(options)
              
    
              
              const response = await axios(options)
                console.log(response.data.access_token);
                localStorage.setItem('session_cookie', JSON.stringify(response.data.access_token))
           
            history.push('/profile')
            
       
    };
    return (
        <div>
           <button className='btn clear-btn' onClick={requestToken}>
                TOKEN GENERATION
            </button> 
        </div>
    )
}

export default RequestToken
