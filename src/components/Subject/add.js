import React, { Component } from 'react'
import './style.css'


export default class AddSubject extends Component {

    render() {
        return (
            <div>
                <p className='inlineBlock'>Add Subject</p>
                <button className='btn inlineBlock' onClick={()=>this.props.toggle()}>+</button>
                <button className='btn inlineBlock' onClick={()=>this.props.delete()}>-</button>
            </div>
        )
    }
}