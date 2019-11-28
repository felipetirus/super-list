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