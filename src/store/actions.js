import * as actionTypes from './actionTypes'
import axios from '../axios-config'
import { uuidv4 } from '../shared/utility'

export const initiatedList = (list) => {
    return {
        type: actionTypes.INIT_LIST,
        list: list
    }
}

export const initList = (listName) => {
    return (dispatch) => {
        axios.get('/lists.json')
            .then(response => {
                console.log(response.data);

                dispatch(initiatedList(response.data != null? response.data: []));
            })
            .catch(error=> (console.log(error)));
    }
}

const addedList = (newListItem, id) => {
    return {
        type: actionTypes.ADD_LIST,
        newListItem: newListItem,
        id: id
    }
}

export const deleteList = (id) => {
    return (dispatch) => {
        axios.delete('/lists/'+id+'.json')
            .then(response => {
                dispatch(deletedList(id));
            })
            .catch(error=> (console.log(error)));
    }
}

const deletedList = (id) => {
    return {
        type: actionTypes.DELETE_LIST,
        id: id
    }
}

export const updateNameList = (id, name) => {
    return (dispatch, getState) => {
        const updatedItem = {
            ...getState().list[id],
            name: name
        };

        axios.put('/lists/'+id+'/.json', updatedItem)
            .then(response => {
                dispatch(updatedNameList(id, name));
            })
            .catch(error=> (console.log(error)));
    }
}

const updatedNameList = (id, name) => {
    return {
        type: actionTypes.UPDATE_NAME_LIST,
        id: id,
        name: name
    }
}

export const addList = (listName) => {
    return (dispatch) => {
        const newListItem = {name: listName};
        axios.post('/lists.json', newListItem)
            .then(response => {
                dispatch(addedList(newListItem, response.data.name));
            })
            .catch(error=> (console.log(error)));
    }
}

export const selectList = (index) => {
    return {
        type: actionTypes.SELECT_LIST,
        listIndex: index
    }
}

export const addTask = (taskName) => {
    const newTask =  {
        name: taskName,
        selected: false 
    }

    return (dispatch, getState) => {
        const updatedItem = {
            ...getState().list[getState().selectedList],
            tasks: {
                ...getState().list[getState().selectedList].tasks,
                [uuidv4()]: newTask
            }
        };

        axios.put('/lists/'+getState().selectedList+'/.json', updatedItem)
            .then(response => {
                dispatch(addedTask(updatedItem.tasks));
            })
            .catch(error=> (console.log(error)));
    }
}

export const addedTask = (tasks) => {
    return {
        type: actionTypes.ADD_TASK,
        tasks: tasks
    }
}

export const selectTask = (taskIndex) => {
    return (dispatch, getState) => {
        const updatedItem = {
            ...getState().list[getState().selectedList],
            tasks: {
                ...getState().list[getState().selectedList].tasks,
                [taskIndex]: {
                    ...getState().list[getState().selectedList].tasks[taskIndex],
                    selected: !getState().list[getState().selectedList].tasks[taskIndex].selected
                }
            }
        };

        axios.put('/lists/'+getState().selectedList+'/.json', updatedItem)
            .then(response => {
                dispatch(addedTask(updatedItem.tasks));
            })
            .catch(error=> (console.log(error)));
    }
}

export const selectedTask = (tasks) => {
    return {
        type: actionTypes.SELECT_TASK,
        tasks: tasks
    }
}

export const deleteTask = (taskIndex) => {
    return (dispatch, getState) => {
        let currentTasks = {...getState().list[getState().selectedList].tasks};
        delete currentTasks[taskIndex];
        const updatedItem = {
            ...getState().list[getState().selectedList],
            tasks: {
                ...currentTasks
            }
        };

        axios.put('/lists/'+getState().selectedList+'/.json', updatedItem)
            .then(response => {
                dispatch(deletedTask(taskIndex));
            })
            .catch(error=> (console.log(error)));
    }
}

const deletedTask = (id) => {
    return {
        type: actionTypes.DELETE_TASK,
        id: id
    }
}