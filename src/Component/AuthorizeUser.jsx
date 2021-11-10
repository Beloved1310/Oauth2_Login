import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';

import '../index.css';

import pkceChallenge from 'pkce-challenge';



const getParams = new URLSearchParams(window.location.search);
const code = getParams.get('code');
const state = getParams.get('state');

export const AuthorizeUser = () => {
    const [code_verifier_value, setCode_verifier_value] = useState('');

    const handleDownloadBtn = async () => {
        const pcke = pkceChallenge();
        const { code_verifier, code_challenge } = pcke;

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
