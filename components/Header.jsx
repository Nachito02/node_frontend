import React from 'react'
import Link from 'next/link'
const Header = () => {
  return (
        <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
         

         <Link href="/">
         <img href='/' src="logo.svg" className='w-64 mb-8 md:mb-0 ' alt="logo" />
         </Link>


            <div>
                <Link href="/login" className="bg-red-500 px-5 py-3 mr-2 text-white uppercase font-bold rounded">Iniciar Sesion</Link>
                <Link href="/crearcuenta" className="bg-black px-5 py-3 text-white uppercase font-bold rounded">Crear Cuenta</Link>

            </div>
        </header>
        
  )
}

export default Header