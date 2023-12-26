import React, { useContext, useState } from 'react'
import NoteContext from '../../NoteContext'
import './create.css'
import { ToastContainer, toast } from 'react-toastify';
import Icon from '../../Icon'
import axios from 'axios'
import Rotate from '../../spinner/Rotate';
import { useNavigate } from 'react-router-dom';

function Create() {
    const {userLoggedIn, toggleShowPost, setShowPost, successNotification, errorNotification} = useContext(NoteContext)
    const [isLoading, setIsLoading] = useState(false)
    const [postText, setPostText] = useState('')
    const [postOpt, setPostOpt] = useState('')
    const navigate = useNavigate()




    // Creating A new Post


    const createNewPost = async (e) => {
        e.preventDefault()
        setIsLoading(true)
         await axios.post('https://notearld.onrender.com/post', {
            content: postText,
            visibility: postOpt,
            user: userLoggedIn.user.id
         }, {  
        headers:{
            'Authorization': `Bearer ${userLoggedIn.token}`
        }
        }).then((postres) => {
            console.log(postres)
            setIsLoading(false)
            successNotification('Post Created Successfully!')
            setTimeout(() => {
                navigate('/')
                setShowPost(false)
            }, 3000)
        }).catch((err) => {
            console.log(err?.message)
            setIsLoading(false)
            errorNotification('Something went wrong!')
        })
    }


  return (
    <div className='create'>
        <div className="background-holder" onClick={toggleShowPost}></div>
        <div className="holder">
                <div className="post-container">

                    <div className="post-container-top">

                        <div className="post-head">
                            <div className="post-head-left">
                            <Icon />
                            </div>
                            <div className="post-head-right">
                                <span>[ CREATE POST ]</span>
                            </div>

                        </div>


                        <div className="post-body">
                            <textarea name="" 
                            className='post-body-text' 
                            placeholder='Enter Post Here' 
                            onChange={(e) => setPostText(e.target.value)}
                            />
                        </div>

                        <div className="post-opt">
                            <label htmlFor="visibility">Visibility</label>

                            <select name="visibility" id="visibility" onChange={(e) => setPostOpt(e.target.value)}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>

                        <button 
                        type='submit' 
                        className='create-new-post' 
                        onClick={createNewPost} 
                        disabled={postText.length ? false : true}
                        >
                        {isLoading ? <p className='rotateP'><Rotate /></p> : "Create Post"}
                        </button>
                    </div>

                </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Create