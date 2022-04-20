import styled from 'styled-components'
import React from 'react';
import "../App.css";
import userEvent from '@testing-library/user-event';

const LoginPage = () => {
    return (
        <Container>
            <Content>
                <Logo>
                    <a href="/home">
                        <img src="/images/login-logo.svg" alt="" />
                    </a>
                </Logo>
            </Content>
            <div className="inner_container">
                <form onSubmit={e => console.log('api called')}>
                    <h1>Sign in</h1>
                    <p>Stay updated on your professional world</p>
                    <div className="ui form">
                        <div className="field">
                            <input
                            type="email"
                            name="email"
                            placeholder="Email or Phone"
                            // value = {user.email}
                            // onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="field">
                            <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            />
                        </div>
                        <h2>Forgot password?</h2>
                        <button className="fluid ui circular button blue">Sign in</button>
                    </div>
                </form>
                <div className='joinText'>
                    New to LinkedIn? <span>Join Now</span>
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