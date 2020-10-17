import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from '../../components/axios'
import { auth } from './../../firebase-config'

import './Forms.scss';
class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: null,
            password: null,
            its_logged: false,
            is_logging: false,
            error: false
        }

        this.checkAuth()

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    checkAuth() {
        const token = localStorage.getItem('token');

        if (token !== null) {
            window.location = "/tasks";
        }
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

        const login = {
            email: this.state.email,
            password: this.state.password,
        }

        this.handlerFirebaseAuth()
        if (this.state.its_logged) {
            axios.post(`/login`, login)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
        }

        event.preventDefault();
    }

    handlerFirebaseAuth() {
        this.setState({ is_logging: true, error: false })
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {
                console.log('Usuário Logado:', user)
                const token = user.user.refreshToken
                localStorage.setItem('token', token);
                
                localStorage.setItem('user',  JSON.stringify(user.user));
                this.setState({ its_logged: true })
            })
            .catch(err => {
                console.log('Erro', err)
                this.setState({ error: true, its_logged: false, is_logging: false })
            })
    }

    render() {
        if (this.state.its_logged) {
            return <Redirect to='/tasks' />
        }
        return (
            <div className='formTodo'>
                <h1>Login</h1>
                <div className='item'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' onChange={this.handleInputChange} value={this.state.email} required />
                </div>
                <div className='item'>
                    <label htmlFor='loginPassword'>Password</label>
                    <input type='password' name='password' id='password' onChange={this.handleInputChange} value={this.state.password} required />
                    {this.state.error && <small id='emailHelp' className='form-text text-muted'>Verifique seu e-mail e senha</small>}
                </div>
                <div className='item'>
                    <div className='item-butons'>
                        <button type='button' className='btnLogin' disabled={this.state.is_logging} onClick={this.handleSubmit}>Login</button>
                        <Link to={{ pathname: "/register" }}><button type='button' className='btnRegister' >Register</button></Link>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login