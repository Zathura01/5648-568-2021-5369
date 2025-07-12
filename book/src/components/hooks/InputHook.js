import React, { useState } from 'react'

function InputHook(initVal) {
  
    const [value, setValue] = useState(initVal);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const reset = () => {
        setValue(initVal);
    }   
  
    return {
        value,
        handleChange,
        reset,
        bind:{
            value,
            onChange: handleChange
        }
    }
}

export default InputHook