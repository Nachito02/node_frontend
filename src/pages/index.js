import React, {useContext,useEffect} from 'react'
import Layout from 'components/Layout'
import authContext from 'context/auth/authContext'
import Link from 'next/link'

const index = () => {

  //extraer el usuario autenticado del storage

  const AuthContext = useContext(authContext)

  const {usuarioAutenticado} = AuthContext

    //usuario autenticado

    useEffect(() => {
      usuarioAutenticado()
    },[])
    
  return (
    <Layout> 

      <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>

        <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10'>

        <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
            <p>Dropzone aqui</p>
          </div>
            <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>

             <h2 className='text-4xl font-sans font-bold text-gray-800 my-4'>Compartir Archivos de forma sencilla y privada</h2>

             <p className='text-lg leading-loose'>
              <span className='text-red-500 font-bold'> ReactNodeSend </span> te permite compartir archivos con cifrado de extremo a extremo
             </p>

              <Link className='text-red-500 font-bold-lg text-lg hover:text-red-700' href='/crearcuenta'>
                  Crea una cuenta para mayores beneficios
              </Link>
          </div>
        </div>
      </div>
      
    </Layout>
  )
}

export default index