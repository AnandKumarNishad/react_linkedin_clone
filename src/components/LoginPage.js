import styled from 'styled-components'
import React, { useState } from 'react';
import "../App.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    let data;
    let navigate = useNavigate();
    const [user, setUser] = useState({
        email:"",password:""
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

    const goToHome = () => {
        window.alert("Login Successful... redirecting to Home...");
        navigate('/home');
    }

    const reloadPage = () => {
        window.alert("Login credential are not valid! Please check and try again...")
        window.location.reload();
        return false;
    }

    const getData = async () => {
        let count = 0;
            const res = await axios.get("https://react-linkedin-api.herokuapp.com/users")
            .catch((error) => {
                console.log(error.message);
            });
            data = res.data;
            const userCount = data.map((users) =>{
                const { email, password } = users;
                if(email === user.email && password === user.password){
                count = 1;
                return count;
                }
                return count;
            })

            if(userCount.includes(1)){
                goToHome();
            }
            else {
                reloadPage();
            }
        };   
        
        return (
            <Container>
            <Content>
                <Logo>
                    <a href="/login">
                        <img src="/images/login-logo.svg" alt="" />
                    </a>
                </Logo>
            </Content>
            <div className="inner_container">
                <form onSubmit={e => {
                    e.preventDefault()
                    getData()
                }}>
                    <h1>Sign in</h1>
                    <p>Stay updated on your professional world</p>
                    <div className="ui form">
                        <div className="field">
                            <input
                            type="email"
                            name="email"
                            placeholder="Email or Phone"
                            value = {user.email}
                            onChange={handleInputs}
                            required
                            />
                        </div>
                        <div className="field">
                            <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={handleInputs}
                            required
                            />
                        </div>
                        <h2>Forgot password?</h2>
                        <button  className="fluid ui circular button blue">Sign in</button>
                    </div>
                </form>
                <div className='joinText'>
                    New to LinkedIn? <span><a href="/sign-up">Join Now</a></span>
                </div>
            </div>
        </Container>
    );
};

const Container = styled.div`
    left: 0;
    padding: 0 24px;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 100;
`;

const Content = styled.div`
    min-height: 100%;
    max-width: 170px;
    margin: 30px;
`;

const Logo = styled.span`
`;

export default LoginPage;