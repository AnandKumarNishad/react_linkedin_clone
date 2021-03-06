import styled from 'styled-components'
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { postArticleAPI } from '../actions';

const PostModal = (props) => {
    const [editorText, setEditorText] = useState('');
    const [shareImage, setShareImage] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [assetArea, setAssetArea] = useState('');

    const handleChange = (e) => {
        const image = e.target.files[0];

        if(image === "" || image === undefined) {
            alert(`Not an image, the file is a ${typeof image}`)
            return;
        }
        setShareImage(image);
    }

    const switchAssetArea = (area) => {
        setShareImage('');
        setVideoLink('');
        setAssetArea(area);
    };

    const postArticle = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget) {
            return;
        }
        
        const payload = {
            image : shareImage,
            video : videoLink,
            user : props.user,
            description : editorText,
            timestamp : firebase.firestore.Timestamp.now(),
        };
        
        props.postArticle(payload);
        reset(e);
    };
    
    const reset = (e) => {
        setEditorText('');
        setShareImage('');
        setVideoLink('');
        setAssetArea('');
        props.handleClick(e);
    }
    return (
    <>
        {
            props.showModal === "open" &&
        <Container>
            <Content>
                <Header>
                    <h2>Create a  post</h2>
                    <button onClick={(event) => reset(event)}>
                        <img src='./images/close-icon.svg' alt='' />
                    </button>
                </Header>
                <SharedContent>
                    <UserInfo>
                        {props.user.photoURL ? (
                            <img src={props.user.photoURL} alt=""/>
                        ) : (
                            <img src='/images/user.svg' alt='' />
                        )}
                        <span>{props.user.displayName}</span>
                    </UserInfo>
                    <Editor>
                        <textarea value = {editorText}
                        onChange ={(e) => setEditorText(e.target.value)}
                        placeholder="What do you want to talk about?"
                        autoFocus={true} />
                        { assetArea === "image" ?
                            <UploadImages>
                                <input type="file" 
                                    accept='images/jpeg, images/jpg, images/png, images/gif' 
                                    name='image' 
                                    id="file" 
                                    style={{display: "none"}}
                                    onChange={handleChange}
                                />
                                <p>
                                    <label htmlFor='file'>Select Image</label>
                                </p>
                                {shareImage && <img src={URL.createObjectURL(shareImage)} alt=""/>}
                            </UploadImages> 
                            :
                            assetArea === "media" &&
                            <>
                                <input 
                                    type="text"
                                    placeholder='Please input a video Link'
                                    value={videoLink}
                                    onChange={(e) => setVideoLink(e.target.value)}
                                />
                                {videoLink && (
                                    <ReactPlayer width={'100%'} url={videoLink} />
                                )}
                            </>
                        }
                    </Editor>
                </SharedContent>
                <ShareCreation>
                    <AttachAssets>
                        <AssetButton onClick={() => switchAssetArea('image')}>
                            <img src='./images/share-image.svg' alt=''/>
                        </AssetButton>
                        <AssetButton onClick={() => switchAssetArea('media')}>
                            <img src='./images/share-video.svg' alt=''/>
                        </AssetButton>
                        <ShareComment>  
                            <AssetButton>
                                <img src='./images/share-comment.svg' alt='' />
                                Anyone
                            </AssetButton>
                        </ShareComment>
                    </AttachAssets >
                    <PostButton disabled={!editorText ? true : false} onClick={(event) => postArticle(event)}>
                        Post
                    </PostButton>
                </ShareCreation>
            </Content>
        </Container>}
    </>
    );
};

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    color: black;
    background-color: rgba(0, 0, 0, 0.8);
    animation: fadeIn 0.5s;
`;

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: #fff;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        height: 30px;
        width: 30px;
        padding:  2.5px 0;
        min-width: auto;
        color: rgba(0, 0, 0, 0.15);
        border: none;
        outline: none;
        background-color: transparent;
        svg, img {
            pointer-events: none;
        }
    }
    button:hover {
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.19);
    }
`;

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background-color: transparent;
    padding: 8px 12px;
    `;

const UserInfo = styled.div`
    display:flex;
    align-items: center;
    padding: 12px 24px;
    svg, img {
        height: 48px;
        width: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`;

const ShareCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`;

const AttachAssets = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
    ${AssetButton} {
        width: 40px;
        height: 40px;
    }
`;

const AssetButton = styled.button`
    display: flex;
    align-items: center;
    height: 48px;
    min-width: auto;
    border: none;
    background-color: #fff;
    outline: none;
    color: rgba(0, 0, 0, 0.5);
    &:hover {
        border-radius: 10px;
        background-color: #EAEBEA;
    }
`;

const ShareComment = styled.div`
    padding-left: 9px;
    margin-right: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    ${AssetButton} {
        svg, img {
            margin-right: 5px;
        }
    }
    `;

const PostButton = styled.button`
    min-width: 60px;
    border: none;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${props=> props.disabled ? "#EAEBEA" : "#0A66C2"}; 
    color: ${props=> props.disabled ? "#A9A8A8" : "#ffffff"};
    cursor: ${props=> props.disabled ? "not-allowed" : "pointer"};
    font-weight: 700;
    &:hover {
        background: ${props=> props.disabled ? "#EAEBEA" :"#004182"};
    }
`;

const Editor = styled.div`
    padding: 12px 24px;
    textarea{
        width: 100%;
        min-height: 100px;
        resize: none;
        border: none;
        outline: none;
    }
    input {
        width: 100%;
        height: 35px;
        font-size: 15px;
        margin-bottom: 20px;
    }
`;

const UploadImages = styled.div`
    text-align: center;
    img {
        width: 100%;
    }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);