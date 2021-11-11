import React from 'react'
const client_id = "wprQYMZBqqx-dgszFUfQG"
const redirect_uri = "http://localhost:3000/oauth-callback";


function RequestToken() {
    
    const requestToken = async () => {
        const tokenEndpoint = new URL(
            "https://id-sandbox.cashtoken.africa/oauth/token"
          );
            console.log(tokenEndpoint.searchParams)
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

          for (const param in queryParams) {
             tokenEndpoint.searchParams.append(param, queryParams[param]);
            console.log( queryParams[param])
          }
        fetch(`${tokenEndpoint.origin}${tokenEndpoint.pathname}`, {
            method: "POST",
            body: tokenEndpoint.searchParams,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json"
            }
          }).then(console.log('p'))
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
