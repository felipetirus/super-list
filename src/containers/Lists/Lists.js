import React, { Component } from 'react'
import ListItem from '../../components/ListItem/ListItem'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import {objectToList} from '../../shared/utility'
import ConfirmationModal from '../../components/Modal/ConfirmationModal/ConfirmationModal'

class Lists extends Component {
    state = {
        newItem: "",
        showDeleteConfirmationModal: false,
        deleteItemId: null,
        editElementName: null,
        editItemId: null
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
    onChangeEditNameHandler = (event) => {
        this.setState({editElementName: event.target.value});
    } 

    onEditModeHandler = (editIdItem, currentListName) => {
        this.setState({
            editItemId: editIdItem,
            editElementName: currentListName
        });
    }

    onEditItemHandler = () => {
        this.props.onUpdateListName(this.state.editItemId, this.state.editElementName);
        this.setState({
            editItemId: null,
            editElementName: null
        })
    }

    onDeleteHandler = (deleteItemId) => {
        this.setState({
            showDeleteConfirmationModal: true,
            deleteItemId: deleteItemId
        });
    }    

    onDeleteConfirmHandler = () => {
        this.props.onDeleteList(this.state.deleteItemId);
        this.onCloseModalHandler();
    }

    onCloseModalHandler = () => {
        this.setState({
            showDeleteConfirmationModal: false,
            deleteItemId: null
        });      
    }

    render() {
        let content = <p>Loading...</p>;
        if (this.props.list) {
            const arrayList = objectToList(this.props.list);
            
            content = (
                <Auxiliary>
                    {this.state.showDeleteConfirmationModal? 
                        <ConfirmationModal 
                            message="Deseja Deletar Lista?"
                            closeModal={this.onCloseModalHandler}
                            confirmModal={this.onDeleteConfirmHandler}
                            />: null}
                    <input type="text" onChange={this.onChangeListNameHandler} value={this.state.newItem} />
                    <button onClick={this.addNewHandler}>+</button>
                    {   arrayList.map((listItem)=>( 
                            <ListItem 
                                key={listItem.id} 
                                value={
                                    this.state.editItemId !== listItem.id? 
                                    listItem.name:
                                    this.state.editElementName
                                } 
                                clicked={() => this.selectListHandler(listItem.id)} 
                                editClicked={() => this.onEditModeHandler(listItem.id, listItem.name)}
                                deleteClicked={() => this.onDeleteHandler(listItem.id)}
                                changeEditNameHandler={this.onChangeEditNameHandler}
                                editElement={this.onEditItemHandler}
                                editMode={this.state.editItemId === listItem.id} />
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
        onDeleteList: (id) => dispatch(actions.deleteList(id)),
        onUpdateListName: (id, name) =>  dispatch(actions.updateNameList(id, name)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Lists); 