import React, { Component } from 'react'
import axios from '../../components/axios'
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            is_logged: false,
            user_name: null
        }

        // this.getUser()

    }

    getUser() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user !== null) {
            let data = axios.get(`/get-user/${user?.email}`).then(res => {
                this.setState({ user_name: res.data.name, is_logged: true })
            })
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location = "/";
    }

    render() {
        return (
            <div className='bar-menu'>
                <div className='item'>
                  TODO List
                </div>
                <div className='item'>
                    <div><span>{this.state.user_name}</span> <button onClick={this.logout}>Sair</button></div>
                </div>
            </div>
        )
    }
}

export default Header