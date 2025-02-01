import React from 'react'

const Button = ({ text, func }) => {
    return (

        <button onClick={func} className='px-8 mx-auto py-4 rounded-xl border-2 bg-slate-950 border-blue-400 border-solid blueShadow duration-200'><p>{text}</p></button>
    )
}

export default Button