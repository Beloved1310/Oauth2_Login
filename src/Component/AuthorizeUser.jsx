import React from 'react';

import uniqueString from 'unique-string';
import { encode as base64encode } from "base64-arraybuffer";


import '../index.css';



const state = uniqueString();
const code_verifier ='A1-._~B2-._~A1-._~A1-._~A1-._~A1-._~A1-._~A1-._~B2-._~A1-._~A1-._~A1-._~A1-._~A1-._~'
console.log(code_verifier.length)
console.log('mmmmmm')

function saveStateAndVerifier() {

    if (window.location.search.includes("state")) return;
    const storage = window.sessionStorage;
    storage.clear();
    storage.setItem("state", state);
    storage.setItem("code_verifier", code_verifier);
  }
  
  saveStateAndVerifier();

  
export const AuthorizeUser = () => {
    async function generateCodeChallenge(codeVerifier) {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest("SHA-256", data);
        const base64Digest = base64encode(digest);
        // you can extract this replacing code to a function
        return base64Digest
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=/g, "");
      }
    
    

    const handleDownloadBtn = async () => {
        const challenge = await generateCodeChallenge(code_verifier)
        console.log(challenge);
        console.log(challenge)
        console.log('mmkmkjijijijij')

        const query = `?response_type=code&client_id=wprQYMZBqqx-dgszFUfQG&code_challenge=${challenge}&code_challenge_method=S256&redirect_uri=http://localhost:3000/oauth-callback&scope=openid+email+profile&state=${state}`;
        return window.location.replace(`https://id-sandbox.cashtoken.africa/oauth/authorize${query}`);
    };

    
    
    return (
        <div>
            <div>
                <section className='section about-section'>
                    <h1 className='section-title'>WELCOME</h1>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae repudiandae architecto qui
                        adipisci in officiis, aperiam sequi atque perferendis eos, autem maiores nisi saepe quisquam hic
                        odio consectetur nobis veritatis quasi explicabo obcaecati doloremque? Placeat ratione hic
                        aspernatur error blanditiis?
                    </p>
                </section>
            </div>

            <button className='btn clear-btn' onClick={handleDownloadBtn}>
                ACTIVATE ME
            </button>

           
        </div>
    );
};
