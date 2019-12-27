import React from 'react'
/* commented out to use styled component instead
import './form-input.styles.scss'

const FormInput = ({handleChange,label,...otherProps}) => (
    <div className='group'>
        <input className='form-input' onChange={handleChange} {...otherProps} />
        {label ?
            <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
            {label}
            </label>
            :
            null
        }
        
    </div>


)*/

import {
    GroupContainer,
    FormInputContainer,
    FormInputLabel
  } from './form-input.styles';
  
  const FormInput = ({ handleChange, label, ...props }) => (
    <GroupContainer>
      <FormInputContainer onChange={handleChange} {...props} />
      {label ? (
        <FormInputLabel className={props.value.length ? 'shrink' : ''}>
          {label}
        </FormInputLabel>
      ) : null}
    </GroupContainer>
  );


export default FormInput;
