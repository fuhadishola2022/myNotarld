import React, { useEffect, useState, useContext } from 'react'
import './main.css'
import {useQuery} from 'react-query'
import axios from 'axios'
import Spinner from '../../spinner/Spinner'
import PostIcon from '../../PostIcon'
import moment from 'moment'
import NoteContext from '../../NoteContext'
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'





function Main() {

  const {userLoggedIn, deletePost, toggleShowPost} = useContext(NoteContext)
    
    const {isLoading, data, isError, error} = useQuery('Backend Data', () => {
      return axios.get('https://notearld.onrender.com/post')
    })

    if(isLoading){
      return <Spinner />
    }

    if(isError){
      return <h2 style={{position: 'relative', left: '45%', color: 'red'}}>{error.message}</h2>
    }

    const dateVariable = data?.data.posts

    const resDate = (postTime) => {

      const dateMoment = moment(postTime)
      return(
          <div className='time-container'>
              <span>{`${dateMoment.hour()}:${dateMoment.minute()} . `}</span>
              <span>{dateMoment.format('DD/MM/YYYY')} - </span>
              <span>{dateMoment.fromNow()}</span>
          </div>
      )
      
    }

    // console.log(data.data.posts)

  return (
    <div className='main'>
       {data?.data.posts.map((post) => {
        return (
          
          <div className='container'>
              <div className={post.visibility === "private" ? "post-holderr" : "post-holder"} key={post.user?._id}>
                <div className={post.user._id === userLoggedIn?.user.id ? "top-personal" : "top"}>
                    <PostIcon />

                    <div className={post.user._id === userLoggedIn?.user.id ?  "user-personal-details" : "user-details"}>
                      <span className='name'>{post.user.name}</span>
                      <span className='username'>@{post.user.username}</span>
                    </div>

                    {post.user._id === userLoggedIn?.user.id ? 
                        <div className="user-details-icons">
                        <MdDelete className='deleteIcon' onClick={() => deletePost(post._id)}/> 
                       <Link to="/profile"><BiEdit className='editIcon' onClick={toggleShowPost}/></Link> 
                      </div>
                    : null}
                </div>

                
                <div className="middle">
                  <div className="content-holder">
                      <span className='content'>
                        {post.content}
                      </span>
                  </div>
                </div>


                <div className="bottom">
                  {resDate(post.post_time)}
                </div>
              </div>
          </div>
        )
       })}

       <ToastContainer />
    </div>
  )
}

export default Main