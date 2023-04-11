import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit, onClear, input }) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain Will Find Faces in Your Pictures. Give it a Try.'}
            </p>
            <div className='center w-50 pa4 br3 shadow-5 form'>
                <input type='text' className='f4 pa2 w-70 center' value={input} onChange={onInputChange} />
                <button className='w-25 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
                <button className='w-15 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onClear}>Clear</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;