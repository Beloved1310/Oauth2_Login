import React from 'react'
import axios from 'axios'
import '../index.css'
import OAuth2Login from 'react-simple-oauth2-login';

const authUser = async ()=>{
    try {
        axios.post(`https://id-sandbox.cashtoken.africa/oauth/authorize?
        response_type=code
        &client_id=wprQYMZBqqx-dgszFUfQG 
        &redirect_uri=http://localhost:3000/oauth-callback  

        &scope=openid+email+profile`);
        
    }catch(err){
        console.log(err)
    }

}
 

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);


 


function AuthorizeUser() {
    return (
        <div>
         
         <div>
            <section className="section about-section">
            <h1 className="section-title">WELCOME</h1>

            <OAuth2Login
    authorizationUrl="https://id-sandbox.cashtoken.africa/oauth/authorize"
    responseType="code"
    clientId="wprQYMZBqqx-dgszFUfQG"
    redirectUri="http://localhost:3000/oauth-callback"
    scope="openid+email+profile"
    onSuccess={onSuccess}
    onFailure={onFailure}/>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        repudiandae architecto qui adipisci in officiis, aperiam sequi atque
        perferendis eos, autem maiores nisi saepe quisquam hic odio consectetur
        nobis veritatis quasi explicabo obcaecati doloremque? Placeat ratione
        hic aspernatur error blanditiis?
      </p>
            </section>
        </div>
        <button className='btn clear-btn' onClick={authUser}>
        Login
        </button>
        </div>

    )
}

export default AuthorizeUser
