import { NavLink } from 'react-router-dom';
import AbcSchemas from './pages/Exercises/pages/AbcSchema'

import Navbar from './components/layouts/Navbar'
import Routing from './components/utils/Routing';
import { UserContext } from './components/context/userContext'
import { useEffect, useState } from 'react';

const FETCH_URL = 'https://selfpy-a80cb-default-rtdb.europe-west1.firebasedatabase.app';

function App() {
  const initialVurrentUserValue = {
    id:'',username: '',name: '',surname: '',birth: '',token: '',}
  const [curentUser, setCurentUser] = useState(initialVurrentUserValue);
  const [users, setUsers] = useState([]);


  
const registerUser = (user)=>{
  fetch(`${FETCH_URL}/users.json`, {
    method: 'post',
    headers: {
      'content-type':'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data => {
    setUsers((prevUsers)=>[...prevUsers, {...user, id: data?.name}])
  })
  .catch(err => console.log(err))
}
  return (
    <>
      <UserContext.Provider value={curentUser}>
        <Navbar />
        <main className='w-full h-screen flex justify-center'>
          <Routing curentUser={curentUser} setCurentUser={setCurentUser} registerUser={registerUser}/>
        </main>
      </UserContext.Provider>
    </>
  )
}

export default App
