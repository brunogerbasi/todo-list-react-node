import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from '../../components/axios'

import './Forms.scss';

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: null,
            email: null,
            password: null,
            its_registered: false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    handleSubmit(event) {

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }

        axios.post(`/add-user`, user)
            .then(res => {
                this.setState({
                    its_registered: true
                });
                console.log(res);
                console.log(res.data);
            })

        event.preventDefault();
    }

    render() {
        if(this.state.its_registered){
            return <Redirect to='/' />
        }
        return (
            <div className='register'>
                <div className='formTodo'>
                    <h1>Register</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className='item'>
                            <label htmlFor='name'>Nome</label>
                            <input type='text' id='name' name="name" placeholder='Name' onChange={this.handleInputChange} value={this.state.name} required />
                        </div>
                        <div className='item'>
                            <label htmlFor='loginEmail'>Email</label>
                            <input type='email' id='email' name='email' onChange={this.handleInputChange} value={this.state.email} required />
                        </div>
                        <div className='item'>
                            <label htmlFor='loginPassword'>Password</label>
                            <input type='password' name='password' id='password' onChange={this.handleInputChange} value={this.state.password} required />
                        </div>
                        <div className='item'>
                            <div className='item-butons'>
                                <button type='submit' className='btnLogin' >Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default Register