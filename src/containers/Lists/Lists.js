import React, { Component } from 'react'
import ListItem from '../../components/ListItem/ListItem'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import {objectToList} from '../../shared/utility'

class Lists extends Component {
    state = {
        newItem: ""
    }

    componentDidMount() {
        this.props.onInitList();
    }

    selectListHandler = (index) => {
        this.props.onSelectList(index);
        this.props.history.push('/task');
    }

    addNewHandler = (event) => {
        event.preventDefault();   
        this.props.onAddList(this.state.newItem);
        this.setState({newItem: ""});     
    }

    onChangeListNameHandler = (event) => {
        this.setState({newItem: event.target.value});
    }

    render() {
        let content = <p>Loading...</p>;
        if (this.props.list) {
            const arrayList = objectToList(this.props.list);
            
            content = (
                <Auxiliary>
                    <input type="text" onChange={this.onChangeListNameHandler} value={this.state.newItem} />
                    <button onClick={this.addNewHandler}>+</button>
                    {   arrayList.map((listItem)=>( 
                            <ListItem key={listItem.id} value={listItem.name} clicked={() => this.selectListHandler(listItem.id)} />
                        ))
                    }
                </Auxiliary>
            );
            // if (this.props.selectedTask !== null) {
            //     content = <Tasks 
            //                 back={this.backToListHandler} 
            //                 taskItems={this.props.list[this.state.selectedTask].tasks}
            //                 selectTask={this.selectTaskItem}
            //                 taskName={this.state.newItem} 
            //                 onChange={this.onChangeListNameHandler}
            //                 onNewTask={this.addNewHandler}/>;
            // }
        }        
        
        return (
            <div>
                { content }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.list,
        selectedTask: state.selectedList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitList: () => dispatch(actions.initList()),
        onAddList: (listName) => dispatch(actions.addList(listName)),
        onSelectList: (index) => dispatch(actions.selectList(index)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Lists); 