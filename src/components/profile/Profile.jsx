import React, { useContext, useState } from 'react'
import './profile.css'
import Navbar from '../navbar/Navbar'
import UserIcon2 from '../../UserIcon2'
import NoteContext from '../../NoteContext'
import Create from '../create-post/Create'
import { useQuery } from 'react-query'
import axios from 'axios'
import PostIcon from '../../PostIcon'
import moment from 'moment'
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../spinner/Spinner'
import Rotate from '../../spinner/Rotate'

function Profile() {

    const {userLoggedIn, showPost, deletePost, toggleShowPost, isLoadingToDelete} = useContext(NoteContext)
    const [toggle, setToggle] = useState(1)

    const toggleMenu = (index) => {
        setToggle(index)
    }

    
    
    

    // Fetching Personal Posts......
    const {data, isLoading} = useQuery('Filtered Post', () => {
       return axios.get('https://notearld.onrender.com/post', {
        headers: {
            'Authorization': `Bearer ${userLoggedIn?.token}`
        }
       })
    })

    // data?.data.posts.map((pos) => {
    //   console.log(pos._id)
    // })

    
    

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

  return (
    <div className='profile'>
        <Navbar />

        <div className="profile-container">
            <div className="profile-display">
                    <div className="left"><UserIcon2 /></div>
                    <div className="right">
                        <span className='display-name'>{userLoggedIn?.user.name}</span>
                        <span className='other-info'>{`@${userLoggedIn?.user.username} | ${userLoggedIn?.user.email}`}</span>
                    </div>
            </div>   
        </div>

            <section>
            <div className="toggle-post-holder">
            <div className={toggle === 1 ? "my-post active" : "my-post"}
            onClick={() => toggleMenu(1)}
            >My Posts</div>

            


            <div className={toggle === 2 ? "my-fave active" : "my-fave"}
            onClick={() => toggleMenu(2)}
            >Favourite Post</div>
             </div>
            </section>
            

            {/* Display Personal Post */}

             {isLoading && <Spinner />}
            {toggle === 1 ? 
            (data?.data?.posts.map((pos) => {
                if(pos.user._id === userLoggedIn?.user.id){  
                    return (
          
                        <div className='containerP' key={pos._id}>
                            <div className="post-holderP">
                              <div className="top-personal">
                                  <PostIcon />

                                  <div className="user-personal-details">
                                    <span className='name'>{pos.user.name}</span>
                                    <span className='username'>@{pos.user.username}</span>
                                  </div>


                                  <div className="user-details-icons">
                                   {isLoadingToDelete ? <Rotate /> :  <MdDelete className='deleteIcon' onClick={() => deletePost(pos._id)}/>} 
                                    <BiEdit className='editIcon' onClick={toggleShowPost}/>
                                  </div>
                              </div>
              
                              
                              
                              <div className="middle">
                                <div className="content-holder">
                                    <span className='content'>
                                      {pos.content}
                                    </span>
                                </div>
                              </div>
              
              
                              <div className="bottom">
                                {resDate(pos.post_time)}
                              </div>
                            </div>
                        </div>
                      )
                }else{
                    return null
                }
            }))
            : <h1 className='empty-fave'>Favourite feature in development</h1>}

            {showPost ? <Create /> : null}
            <ToastContainer />
    </div>
  )
}

export default Profile