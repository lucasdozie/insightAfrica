import React, { Component } from 'react'
import './style.css'


export default class ListSection extends Component {
    state = {
        beingEdited: false,
        edit: ''
    }

    componentWillReceiveProps(nextProps){
        /*this.setState({edit: nextProps.subject})*/
        this.setState({edit: nextProps.section})
    }

    toggleInput = () => {
        this.setState({beingEdited: !this.state.beingEdited})
    }

    handleInputChange = (e) => {
        const value = e.target.value;
        this.setState({edit: value});
    }

    submit = (e) => {
        if (e.key === 'Enter') {
            this.setState({beingEdited: false})
            this.props.edit(e.target.value, this.props.index)
        }
    }
 

    render() {
        return (
            <div className='sn' onClick={()=>this.props.click(this.props.index)} onDoubleClick={()=>this.toggleInput()}>
                { (this.state.beingEdited)?
                    <div><input className='inputFld' type='text' value={this.state.edit} onChange={this.handleInputChange} onKeyPress={this.submit}/></div>
                    :
                    <p className='upprCase'>
                        {this.props.section}
                    </p>
                    
                }
            </div>
        )
    }
}