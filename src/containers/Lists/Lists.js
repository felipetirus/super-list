import React, { Component } from 'react'
import ListItem from '../../components/ListItem/ListItem'
import Tasks from '../../components/Tasks/Tasks'
import { updateByIndex } from '../../shared/utility'

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
        selectedTask: null
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

    render() {
        let content = this.state.list.map((value, index)=>(<ListItem key={index} value={value.name} clicked={() => this.listClickHandler(index)} />));
        if (this.state.selectedTask !== null) {
            content = <Tasks 
                        back={this.backToListHandler} 
                        takItems={this.state.list[this.state.selectedTask].tasks}
                        selectTask={this.selectTaskItem} />;
        }
        
        return (
            <div>
                { content }
            </div>
        )
    }
}
