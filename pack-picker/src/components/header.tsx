import React from 'react';

import logo from '../assets/Logo.png'

const Header: React.FC = () => { 

  return (
      <div className='flex flex-col justify-items-centre font-bebas h-fit pt-10 '> 
        <div className='flex justify-center'>
           <img className='flex w-60' src={logo}/>
        </div>
       
        <div className='flex justify-center mt-6 text-5xl'>
          <p>ORDERSHARK</p>
        </div>

        <div className='flex justify-center mt-2'>
          <p>Please enter the pack sizes and order size below</p>
        </div>

      </div>
  );
}

export default Header;