import { NavLink } from 'react-router-dom';
import AbcSchemas from './pages/Exercises/pages/AbcSchema'
import Navbar from './components/layouts/Navbar'
import Routing from './components/utils/Routing';
import { UserContext } from './context/userContext'
import { useEffect, useState } from 'react';

function App() {
  const initialVurrentUserValue = {
    id:'',username: '',name: '',surname: '',birth: '',token: '',}

  const [user, setUser] = useState(initialVurrentUserValue);

    useEffect(() => {
      setUser({
          id: '1',
          username: 'nd.d',
          name: 'Andy',
          surname: 'Drei',
          birth: '01/01/1970',
          token: '812b82h3h9b123nj123nmxz@#!2nmsk'
      })  
    })

  return (
    <>
      <UserContext.Provider value={user}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  )
}

export default App
