import { useEffect } from 'react';
import Navbar from './components/layouts/Navbar'
import Routing from './components/utils/Routing';
import useAuthContext, { AuthProvider } from './context/AuthContext';

function App() {
  const { userData, getUserToken, setLogout } = useAuthContext();

  useEffect(()=>{
    getUserToken()
  },[])

  return (
    <>
    
        <Navbar />
        <main className='w-full h-screen flex justify-center'>
          <Routing />
        </main>
    </>
  )
}

export default App
