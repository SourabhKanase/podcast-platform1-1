import React, { useState } from 'react'
// import { onChange } from 'react-toastify/dist/core/store';

const CustomeFileInput = ({accept,id,setfun,text}) => {
    let [file,setFile]=useState("");
    function onChange(e)
    {
        console.log(e.target.files[0].name);
        setFile(e.target.files[0].name)
        setfun(e.target.files[0]);
    }
  return (
    <div className={`custom-input ${file ? '' : 'activeinput'}`}  style={{zIndex:"-1"}}>
        <label htmlFor={id} >{file?`The file ${file} was selected `:text} </label>
        <input type='file' accept={accept} id={id} style={{display:'none'}} onChange={onChange}/>
    </div>
  )
}

export default CustomeFileInput;