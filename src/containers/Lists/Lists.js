import React, { Component } from 'react'
import ListItem from '../../components/ListItem/ListItem'
import Tasks from '../../components/Tasks/Tasks'
import { updateByIndex } from '../../shared/utility'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

export default class Lists extends Component {
    state = {
        list: [
            {
                name: "Groceries",
                tasks: [
                    {
                        name: "Bread",
                        selected: false 
                    },
                    {
                        name: "Cheese",
                        selected: false 
                    },
                    {
                        name: "Chocolate",
                        selected: false 
                    }
                ]
            },
            {
                name: "GYM",
                tasks: [
                    {
                        name: "Chest 3x10",
                        selected: false 
                    },
                    {
                        name: "Sholders 3x12",
                        selected: false 
                    },
                    {
                        name: "Legs 3x8",
                        selected: false 
                    }
                ]
            },
            {
                name: "Expenses",
                tasks: [
                    {
                        name: "Hair Cut $10",
                        selected: false 
                    },
                    {
                        name: "Street food $5",
                        selected: false 
                    },
                    {
                        name: "Bus $2",
                        selected: false 
                    }
                ]
            },
            {
                name: "Others",
                tasks: [
                    {
                        name: "Renew license",
                        selected: false 
                    },
                    {
                        name: "Study React",
                        selected: false 
                    },
                    {
                        name: "Study HTML/CSS",
                        selected: false 
                    }                    
                ]
            }
        ],
        selectedTask: null,
        newItem: ""
    }

    listClickHandler = (listIndex) => {
        this.setState({selectedTask: listIndex});
    }

    backToListHandler = () => {
        this.setState({selectedTask: null});
    }

    selectTaskItem = (selectedIndex) => {
        const updatedTask = updateByIndex(selectedIndex, this.state.list[this.state.selectedTask].tasks,  { selected: !this.state.list[this.state.selectedTask].tasks[selectedIndex].selected });
        const updatedList = updateByIndex(this.state.selectedTask, this.state.list,  { tasks: updatedTask });
        this.setState({
             list: updatedList
        });
    }

    addNewHandler = (event) => {
        event.preventDefault();   
        if (this.state.selectedTask) {
            this.setState(prevState=> { 
                const updateTask = [...prevState.list[this.state.selectedTask].tasks];
                updateTask.push({
                    name: this.state.newItem,
                    selected: false 
                });
                const updateList = updateByIndex(this.state.selectedTask, prevState.list, {tasks: updateTask});             
                
                return {
                    list: updateList,
                    newItem: ""
                };
            });
        } else {
            this.setState(prevState=> { 
                const updateList = [ ...prevState.list];
                updateList.push({
                    name: this.state.newItem,
                    tasks: []
                });
                return {
                    list: updateList,
                    newItem: ""
                };
            });
        }

        
    }

    onChangeListNameHandler = (event) => {
        this.setState({newItem: event.target.value});
    }

    render() {
        let content = (
            <Auxiliary>
                <input type="text" onChange={this.onChangeListNameHandler} value={this.state.newItem} />
                <button onClick={this.addNewHandler}>+</button>
                {   this.state.list.map((value, index)=>( 
                        <ListItem key={index} value={value.name} clicked={() => this.listClickHandler(index)} />
                    ))
                }
            </Auxiliary>
        );
        
        if (this.state.selectedTask !== null) {
            content = <Tasks 
                        back={this.backToListHandler} 
                        taskItems={this.state.list[this.state.selectedTask].tasks}
                        selectTask={this.selectTaskItem}
                        taskName={this.state.newItem} 
                        onChange={this.onChangeListNameHandler}
                        onNewTask={this.addNewHandler}/>;
        }
        
        return (
            <div>
                { content }
            </div>
        )
    }
}
