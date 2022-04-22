import styled from "styled-components";
import React from 'react';
import LeftSide from './LeftSide';
import Main from './Main';
import Rightside from './RightSide';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";


const Home = (props) => {
    let navigate = useNavigate();
    return (
        <Container>
            {!props.user && navigate('/')}
            <Layout>
                <LeftSide />
                <Main />
                <Rightside />
            </Layout>
        </Container>
    )
};

const Container = styled.div`
    padding-top: 52px;
    max-width: 100%;
`;

const Layout = styled.div`
    display: grid;
    padding: 20px;
    max-width: 1250px;
    grid-template-areas: "leftside main rightside";
    grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
    column-gap: 25px;
    row-gap: 25px;
    margin: 25px auto;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        padding: 0 5px;
    }
`;

const mapStateToProps = (state) => {
    return {
        user:state.userState.user,
    };
};



export default connect(mapStateToProps)(Home);