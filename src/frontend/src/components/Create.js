import React, { Component } from 'react'
import axios from './axios'
class Create extends Component {
    state = {
        name: null,
        user_id: null,
    }

    constructor(props) {
        super(props);     

        this.checkUser()
    }

    
    checkUser = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        let data = axios.get(`/get-user/${user.email}`).then(res => {
            this.setState({ user_id: res.data.id })
        })
    }

    //Methods
    handleChangeprojectName = (e) => {
        this.setState({ name: e.target.value });
    }

    createProject = async (e) => {
        const data = {
            user_id: this.state.user_id,
            name: this.state.name
        }
        axios.post('/add-project', data).then(res => {
            console.log(res.data)
            window.location = "/tasks";
        })
    }

    render() {
        return(
            <div className='add-project-container'>
                <h3>Create a new project</h3>
                <div className='iputs'>
                    <input  type='text' placeholder='Add new project...' onChange={ this.handleChangeprojectName }/>
                    <div>
                        <button type='button' onClick={this.createProject}>CREATE</button>
                    </div>
                </div>
            </div>                 
        ) 
    }

}

export default Create