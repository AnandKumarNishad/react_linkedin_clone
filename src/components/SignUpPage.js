import styled from 'styled-components'
import React, { useEffect, useState } from 'react';
import "../App.css"
import { useNavigate } from "react-router-dom";


const SignUpPage = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        email:"",password:""
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(user));
        setIsSubmit(true);
    }

    const postData = async (e) => {

        const { email, password } = user;

        const res = await fetch("https://react-linkedin-api.herokuapp.com/users", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email, password
            })
        });

        const data = res;
        if (data.status === 500){
            window.alert("Registration Failed...");
            window.location.reload();
        }
        else {
            window.alert("Registration Successful...");
            navigate("/login");
        }
    }

    const validate = (values) => {
        const errors = {}
        if(!values.email){
            errors.email = "Email is required!";
        }
        if(!values.password){
            errors.password = "Password is required!";
        }
        return errors;
    }

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit){
            postData();
        }
    }, [formErrors]);


    return (
        <Container>
            <Content>
                <Logo>
                    <a href="/sign-up">
                        <img src="/images/login-logo.svg" alt="" />
                    </a>
                </Logo>
            </Content>
            <h1 className='titleText'>Make the most of your professional life</h1>
            <div className="inner_container">
                <form onSubmit = {handleSubmit}>
                    <div className="ui form">
                        <label>Email or Phone number</label>
                        <div className="field">
                            <input
                            type="email"
                            name="email"
                            value = {user.email}
                            onChange = {handleInputs}
                            required
                            />
                        </div>
                        <label>Password (6 or more characters)</label>
                        <div className="field">
                            <input
                            type="password"
                            name="password"
                            value = {user.password}
                            onChange = {handleInputs}
                            required
                            />
                        </div>
                        <h3>By clicking Agree & Join, you agree to the LinkedIn <span>User Agreement, Privacy Policy,</span> and <span>Cookie Policy.</span></h3>
                        <button className="fluid ui circular button blue" >Agree & Join</button>
                        <h4>Already on LinkedIn? <span><a href="/login">Sign in</a></span></h4>
                    </div>
                </form>
                <div className='bissText'>
                    Looking to create a page for a business? <span>Get help</span>
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
    display: flex;
    justify-content: center;
    min-height: 100%;
    margin: 30px 0 0 30px;
`;

const Logo = styled.span`
    width: 250px;
`;

export default SignUpPage;