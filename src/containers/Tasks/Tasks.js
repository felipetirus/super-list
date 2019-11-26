import React, {Component} from 'react'
import TaskItem from '../../components/TaskItem/TaskItem'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import {objectToList} from '../../shared/utility'

class Tasks extends Component {
    state = {
        newItem: ""
    }

    toListHandler = () => {
        this.props.history.push('/list');
    }

    onChangeTaskNameHandler = (event) => {
        this.setState({newItem: event.target.value});
    }

    addNewHandler = (event) => {
        event.preventDefault();   
        this.props.onAddTask(this.state.newItem);
        this.setState({newItem: ""});                
    }

    selectTaskItemHandler = (selectedIndex) => {
        this.props.onSelectTask(selectedIndex);
    }

    render () {
        let content = <p>Loading ...</p>;
        if (this.props.selectedList !== null) {
            const arrayTasks = objectToList(this.props.tasks);

            content = <div>
                <button onClick={this.toListHandler}>Back</button>
                <input type="text" onChange={this.onChangeTaskNameHandler} value={this.state.newItem} />
                <button onClick={this.addNewHandler}>+</button>
                {arrayTasks.map((task) => (
                    <TaskItem 
                        key={task.id} 
                        value={task} 
                        clicked={() => this.selectTaskItemHandler(task.id)} />
                ))}
            </div>
        } else {
            content = <Redirect to="/" />;
        }
        return content;
    }
}

const mapStateToProps = state => {
    return {
        selectedList: state.selectedList,
        tasks: state.tasks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddTask: (taskName) => dispatch(actions.addTask(taskName)),
        onSelectTask: (taskIndex) => dispatch(actions.selectTask(taskIndex))  
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Tasks);
