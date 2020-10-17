import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from '../../firebase-config'
import Projetc from '../../components/Project'
import Create from '../../components/Create'

import './Tasks.scss';
            
class Tasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            has_token: false
        }
        this.checkAuth()

    }

    checkAuth() {
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({ has_token: true })
        } else {
            window.location = "/";
            this.setState({ has_token: false })
        }
    }

    
    render() {
         return (
            <div className='containerTasks'>            
            <Projetc />
            <div className='project-container-project'>
                <div className='add-project'>
                    <Create />
                </div>
            </div>
        </div>
        )
    }
}

export default Tasks