import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import randomstring from 'randomstring';
import { encode as base64encode } from 'base64-arraybuffer';
// import crypto from 'crypto';
import '../index.css';

import pkceChallenge from 'pkce-challenge';

//code verifier

const getParams = new URLSearchParams(window.location.search);
const code = getParams.get('code');
const state = getParams.get('state');

const code_verifier = randomstring.generate(128);

// async function generateCodeChallenge(codeVerifier) {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(codeVerifier);
//   const digest = await window.crypto.subtle.digest("SHA-256", data);
//   const base64Digest = base64encode(digest);
//   // you can extract this replacing code to a function
//   return base64Digest
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=/g, "");
// }
// function base64URLEncode(str) {
//     return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
// }

// function sha256(buffer) {
//     return crypto.createHash('sha256').update(buffer).digest();
// }

export const AuthorizeUser = () => {
    // const [query, setQuery] = useState('');
    // const [queryo, setQueryo] = useState('');

    const [code_verifier_value, setCode_verifier_value] = useState('');

    // useEffect(() => {
    //   generateCodeChallenge(code_verifier).then(challenge => {

    //     console.log(challenge);
    //     console.log('mhuifreuf')
    //     // example:
    //     const state = 'xyzABC123';

    //     // -PCBxoCJMdDloUVl1ctjvA6VNbY6fTg1P7PNhymbydM

    //     const searchQueries = `?response_type=code&client_id=wprQYMZBqqx-dgszFUfQG&code_challenge=${challenge}&code_challenge_method=S256&redirect_uri=http://localhost:3000/oauth-callback&scope=openid+email+profile&state=${state}`;
    //     setQuery(searchQueries);

    //   });

    //     // usingPkce npm package
    //   //  const pkce = pkceChallenge();

    //   //   // console.log(pkce)
    //   //   const { code_challenge, code_verifier } = pkce;

    //   //     console.log('kkkkkkkkk')

    //   //  console.log(code_verifier)
    //   //  console.log('ooooooo')
    //   //  console.log(code_challenge)
    //   //  setQueryo(code_challenge)
    //     // // using crypto
    //     // const verifier = base64URLEncode(crypto.randomBytes(32));
    //     // console.log(verifier);

    //     // const challenge = base64URLEncode(sha256(verifier));
    //     // console.log(challenge)

    //     // const state = 'xyzABC123';

    //     // console.log('oooo');
    //     // const searchQueries = `?response_type=code&client_id=wprQYMZBqqx-dgszFUfQG&code_challenge=${challenge}&code_challenge_method=S256&redirect_uri=http://localhost:3000/oauth-callback&scope=openid+email+profile&state=${state}`;
    //     // setQuery(searchQueries);

    //     // setCode_verifier_value(code_verifier)

    // }, []);

    async function generateCodeChallenge(codeVerifier) {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        const base64Digest = base64encode(digest);
        // you can extract this replacing code to a function
        return base64Digest.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }

    const handleDownloadBtn = async () => {
        const pcke = pkceChallenge();
        const { code_verifier, code_challenge } = pcke;
        setCode_verifier_value(code_verifier);
        // const code_verifier = randomstring.generate(128);
        // const challenge = await generateCodeChallenge(code_verifier)
        setCode_verifier_value(code_verifier);
        const state = 'xyzABC123';
        
        const query = `?response_type=code&client_id=wprQYMZBqqx-dgszFUfQG&code_challenge=${code_challenge}&code_challenge_method=S256&redirect_uri=http://localhost:3000/oauth-callback&scope=openid+email+profile&state=${state}`;
        return window.location.replace(`https://id-sandbox.cashtoken.africa/oauth/authorize${query}`);
    };
    const requestToken = async () => {
        const data = {
            grant_type: 'authorization_code',
            client_id: 'wprQYMZBqqx-dgszFUfQG',
            code_verifier: code_verifier_value,
            code: code,
            redirect_uri: 'http://localhost:3000/profile',
            scope: 'openid+email+profile',
            state: state,
        };

        console.log(code_verifier);
        try {
            var options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url: 'https://id-sandbox.cashtoken.africa/oauth/token?',
            };

            console.log(options);

            await axios(options)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.error(error);
                });
        } catch (error) {
            console.log(error);
        }
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
                Activate
            </button>

            <button className='btn clear-btn' onClick={requestToken}>
                TOKEN
            </button>
        </div>
    );
};

