import React, {useContext,useEffect} from 'react'
import Link from 'next/link'
import authContext from 'context/auth/authContext'
import { USUARIO_AUTENTICADO } from 'types'
const Header = () => {

  const AuthContext = useContext(authContext)

  const {cerrarSesion ,usuario,usuarioAutenticado} = AuthContext;


  useEffect(() => {
  }, [])



  return (
        <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
         

         <Link href="/">
         <img href='/' src="logo.svg" className='w-64 mb-8 md:mb-0 ' alt="logo" />
         </Link>


            <div>

              {
                usuario? (
                  <div className='flex items-center'>
                    <p className='mr-2'>Hola {usuario.nombre}</p>
                    <button className="bg-black px-5 py-3 text-white uppercase font-bold rounded" onClick={()  => cerrarSesion()} type='button'>Cerrar Sesion</button>  
                     </div>
                ) : (
                  <>
                   <Link href="/login" className="bg-red-500 px-5 py-3 mr-2 text-white uppercase font-bold rounded">Iniciar Sesion</Link>
                <Link href="/crearcuenta" className="bg-black px-5 py-3 text-white uppercase font-bold rounded">Crear Cuenta</Link>
                   </>
                )
              }
               

            </div>
        </header>
        
  )
}

export default Header