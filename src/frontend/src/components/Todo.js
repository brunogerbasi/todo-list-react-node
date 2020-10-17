import React, {Component} from 'react'

import { BsTrash, BsStopwatch  } from 'react-icons/bs';
import ReactTooltip from 'react-tooltip';

class Todo extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }
    render(){
        return(
            <div className='item-task'>
                <ul>                
                    <li>
                        <input type='checkbox' id='taskCheck1'/>
                        <label htmlFor='taskCheck1' >Lorem inpsom dolor </label>                                            
                        <span data-tip='closes in 2 days!'><BsStopwatch /> <ReactTooltip /></span>
                        <span><BsTrash /></span>
                    </li>
                </ul>                                    
            </div>
        )
    }
    
}

export default Todo