import React, {Component} from 'react'
import TaskItem from '../../components/TaskItem/TaskItem'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import {objectToList} from '../../shared/utility'
import ConfirmationModal from '../../components/Modal/ConfirmationModal/ConfirmationModal'

class Tasks extends Component {
    state = {
        newItem: "",
        showDeleteConfirmationModal: false,
        deleteTaskId: null,
        editTaskId: null,
        editElementName: null
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

    onDeleteHandler = (id) => {
        this.setState({
            showDeleteConfirmationModal: true,
            deleteTaskId: id
        });
    }    

    onDeleteConfirmHandler = () => {
        this.props.onDeleteTask(this.state.deleteTaskId);
        this.onCloseModalHandler();
    }

    onCloseModalHandler = () => {
        this.setState({
            showDeleteConfirmationModal: false,
            deleteTaskId: null
        });      
    }

    onEditModeHandler = (editIdTask, currentTaskName) => {
        this.setState({
            editTaskId: editIdTask,
            editElementName: currentTaskName
        });
    }

    onChangeEditNameHandler = (event) => {
        this.setState({editElementName: event.target.value})
    } 

    onEditTaskHandler = () => {
        this.props.onUpdateTaskName(this.state.editTaskId, this.state.editElementName);
        this.setState({
            editTaskId: null,
            editElementName: null
        })
    }

    render () {
        let content = <p>Loading ...</p>;
        if (this.props.selectedList !== null) {
            const taks = this.props.tasks != null? this.props.tasks : [];
            const arrayTasks = objectToList(taks);

            content = <div>
                {this.state.showDeleteConfirmationModal? 
                        <ConfirmationModal 
                            message="Deseja Deletar Task?"
                            closeModal={this.onCloseModalHandler}
                            confirmModal={this.onDeleteConfirmHandler}
                            />: null}
                <button onClick={this.toListHandler}>Back</button>
                <input type="text" onChange={this.onChangeTaskNameHandler} value={this.state.newItem} />
                <button onClick={this.addNewHandler}>+</button>
                {arrayTasks.map((task) => (
                    <TaskItem 
                        key={task.id} 
                        value={task} 
                        editedName={this.state.editElementName} 
                        clicked={() => this.selectTaskItemHandler(task.id)}
                        deleteClicked={() => this.onDeleteHandler(task.id)}
                        editClicked={() => this.onEditModeHandler(task.id, task.name)} 
                        changeEditNameHandler={this.onChangeEditNameHandler}
                        editMode={this.state.editTaskId === task.id}
                        editElement={this.onEditTaskHandler}
                    />
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
        onSelectTask: (taskIndex) => dispatch(actions.selectTask(taskIndex)),
        onDeleteTask: (taskIndex) => dispatch(actions.deleteTask(taskIndex)),
        onUpdateTaskName: (taskIndex, taskName) => dispatch(actions.updateTaskName(taskIndex, taskName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Tasks);
