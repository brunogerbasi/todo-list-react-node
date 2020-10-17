import React, { Component } from 'react'
import { MdEdit } from 'react-icons/md';
import { BsTrash, BsStopwatch,BsCheckCircle } from 'react-icons/bs';
import ReactTooltip from 'react-tooltip';

import axios from './axios'
import Todo from './Todo'

class Project extends Component {

    state = {
        user_id: null,
        projects: [],
        task_description: null,
    }

    constructor(props) {
        super(props);

        this.init()

        this.project_name = null
    }

    init = async () => {
        await this.checkUser()
    }

    checkUser = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        let data = axios.get(`/get-user/${user.email}`).then(res => {
            this.setState({ user_id: res.data.id })
            this.getProjects();
        })
    }

    //Projects
    getProjects = async () => {
        let data = axios.get(`/list-projects/${this.state.user_id}`).then(res => {
            res.data.map((item) => {
                item['editing'] = false
                item['project_name'] = item.name
                return item
            })
            this.setState({
                projects: res.data,
                task_description: null
            })
        })
    }

    updateProject = async (project_id) => {
        let index = this.state.projects.findIndex((el) => el.id === project_id)
        const data = {
            "id": project_id,
            "name": this.state.projects[index].name
        }
        await axios.put('/put-project', data)
        this.getProjects();
    }

    
    deleteProject = async (project_id) => {
        await axios.delete(`/del-project/${project_id}`)
        await this.getProjects();
    }

    handleChangeProjectName = (val, project_id) => {
        let index = this.state.projects.findIndex((el) => el.id === project_id)
        const projects_copy = this.state.projects
        projects_copy[index].name = val
        this.setState({ projects: projects_copy })
    }

    handlerUpdateProject = async (project_id) => {
        let index = this.state.projects.findIndex((el) => el.id === project_id)
        const projects_copy = this.state.projects
        projects_copy[index].editing = !projects_copy[index].editing
        this.setState({ projects: projects_copy })
    }

    //Task
    handleChangeTaskName = (e) => {
        this.setState({ task_description: e.target.value });
    }

    createTasks = async (project_id) => {
        const data = {
            "project_id": project_id,
            "description": this.state.task_description
        }
        await axios.post('/add-task', data)
        this.getProjects();
    }

    deleteTask = async (task_id) => {
        await axios.delete(`/del-task/${task_id}`)
        await this.getProjects();

    }

    handleChange(project_index, task_index) {
        const projects_copy = this.state.projects
        projects_copy[project_index].tasks[task_index].status = !projects_copy[project_index].tasks[task_index].status

        const data = {
            "id": projects_copy[project_index].tasks[task_index].id,
            "description": projects_copy[project_index].tasks[task_index].description,
            "status": projects_copy[project_index].tasks[task_index].status
        }
        axios.put('/put-task', data).then(res => {
            this.setState({
                projects: projects_copy
            })
        })
    }

    render() {
        return (
            <div className='project-container-item'>
                {/* State - {JSON.stringify(this.state)}} */}
                {this.state.projects.map((project, index) => {
                    return <div className='item' key={index}>
                        <div className='item-projetc'>
                            {/* Project */}
                            <div className='item-tile'>
                                {project.editing === true
                                    ? <input type='text' name={"project_name-" + project.id} onChange={(e) => this.handleChangeProjectName(e.target.value, project.id)} />
                                    : <h3>{project.name}</h3>
                                }

                                {/* Actions */}
                                <div className='icons'>
                                    {project.editing === true
                                        ? <span onClick={() => this.updateProject(project.id)}><BsCheckCircle /></span>
                                        : <span onClick={() => this.handlerUpdateProject(project.id)}><MdEdit /></span>
                                    }

                                    <span onClick={() => this.deleteProject(project.id)}><BsTrash /></span>
                                </div>
                            </div>

                            {/* Tasks */}
                            <div className='item-text'>
                                <div className='item-text-todo'>
                                    <p>To do</p>
                                    {project.tasks.map((task, idx) => {
                                        if (task.status === false) {
                                            return <div className='item-task' key={idx}>
                                                <ul>
                                                    <li>
                                                        <input type='checkbox' id='taskCheck1' defaultChecked={task.status} onClick={() => this.handleChange(index, idx)} />
                                                        <label htmlFor='taskCheck1' >{task.description}</label>
                                                        <span data-tip='closes in 2 days!'><BsStopwatch /> <ReactTooltip /></span>
                                                        <span onClick={() => this.deleteTask(task.id)}><BsTrash /></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        }
                                    })}
                                </div>
                                <div className='item-text-todo done'>
                                    <p>Done</p>
                                    {project.tasks.map((task, idx) => {
                                        if (task.status === true) {
                                            return <div className='item-task' key={idx}>
                                                <ul>
                                                    <li>
                                                        <input type='checkbox' id='taskCheck1' defaultChecked={task.status} onClick={() => this.handleChange(index, idx)} />
                                                        <label htmlFor='taskCheck1' >{task.description}</label>
                                                        <span data-tip='closes in 2 days!'><BsStopwatch /> <ReactTooltip /></span>
                                                        <span><BsTrash /></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        }
                                    })}
                                </div>
                            </div>

                            {/* Add Action */}
                            <div className='item-inp'>
                                <input type='text' placeholder='Task...' onChange={this.handleChangeTaskName} />
                                <button type='button' onClick={() => this.createTasks(project.id)}>Add</button>
                            </div>
                        </div>
                    </div>
                })
                }
            </div>



        )
    }

}

export default Project