import React from 'react'

const ModalLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className="z-[60] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">       
        {children} 
    </div>
  )
}

export default ModalLayout