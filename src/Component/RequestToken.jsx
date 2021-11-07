import axios from 'axios';


import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
const getParams = new URLSearchParams(window.location.search);
const code = getParams.get('code');



function RequestToken() {
    const history = useHistory();
    const requestToken = async()=>{
       
        try {
            const res = await axios.post(`https://id-sandbox.cashtoken.africa/oauth/token?
            response_type=code
            &client_id=wprQYMZBqqx-dgszFUfQG 
            &redirect_uri=http://localhost:3000/oauth
            &code=${code} `);
            localStorage.setItem('session_cookie', JSON.stringify(res.data.acess_token));
          
            history.push('/profile')
        }catch (error){
            console.log(error)
        }
    }

    return (
        <div>
         
         <div>
            <section className="section about-section">
            <h1 className="section-title">ACCESS GRANTED</h1>

           

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        repudiandae architecto qui adipisci in officiis, aperiam sequi atque
        perferendis eos, autem maiores nisi saepe quisquam hic odio consectetur
        nobis veritatis quasi explicabo obcaecati doloremque? Placeat ratione
        hic aspernatur error blanditiis?
      </p>
            </section>
        </div>

        <Link to={`/profile`}>
        <button className='btn clear-btn' onClick={requestToken}>
        View Profile</button>
        </Link>
        
        </div>
    )
}

export default RequestToken
