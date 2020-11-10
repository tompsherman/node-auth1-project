import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserList = () => {
    const [user, setUser] = useState([])
    useEffect(()=>{
        axios
            .get('http://localhost:7575/api/users')
            .then(res => console.log(res))
            .catch(error=>console.log(error))
    }, [])
    return (
        <div>
            this is user list
        </div>
    )
}

export default UserList
