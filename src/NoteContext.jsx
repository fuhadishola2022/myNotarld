import React, { createContext, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';




export const NoteContext = createContext(null)


const successNotification = (success) => {
  toast.success(success, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}



const errorNotification = (error) => {
  toast.error(error, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}



export function NoteContextProvider(props) {
  const [isChecking, setIsChecking] = useState(false)
  const [showPost, setShowPost] = useState(false)
  const [isLoadingToDelete, setIsLoadingToDelete] = useState(false)
  

  
  const toggleShowPost = () => {
    window.scrollTo(0,0)
    setShowPost(!showPost)
  }

  

  
// Creating a unique USER...
        const submit = async (data) => {
          setIsChecking(true)
         await axios.post('https://notearld.onrender.com/user/signup', {
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password
        }).then((res) => {
          console.log(res.data)
          setIsChecking(false)
          successNotification('New User Created')
          
        }).catch((err) => {
          if(err){
            errorNotification('Something went wrong')
            setIsChecking(false)
          }
        })
      }

      // Making a DELETE request....

      const deletePost = (postId) => {
        setIsLoadingToDelete(true)
        axios.delete(`https://notearld.onrender.com/post/${postId}`, {
          headers: {
            'Authorization': `Bearer ${userLoggedIn?.token}`
          }
        })
        .then((deleteRes) => {
            console.log(deleteRes.data)
            setIsLoadingToDelete(false)
            successNotification(deleteRes.data.message)
            window.location.reload()
            
        }).catch((error) => {
          if(error){
            errorNotification('Failed To Delete Post')
            setIsLoadingToDelete(false)
          }
        })
      }

      

      const userLoggedIn = JSON.parse(localStorage.getItem("User"))

    

      const contextValue = {
        submit, 
        deletePost, 
        isChecking, 
        userLoggedIn, 
        showPost, 
        toggleShowPost, 
        setShowPost,
        isLoadingToDelete,
        successNotification,
        errorNotification
      }

  return (
    <NoteContext.Provider value={contextValue}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteContext