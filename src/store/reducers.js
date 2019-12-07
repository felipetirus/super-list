import * as actionTypes from './actionTypes';
import {updateObject} from '../shared/utility';

const initialState = { 
    list: null,
    selectedList: null,
    tasks: null
}; 

const initList = (state, action) => {
    let newList = action.list; 
    if (state.list) {
        newList = state.list;
    }

    return updateObject(state, {
        list: newList,
        selectedList: null,
        tasks: null
    });
}

const addList = (state, action) => {
    const newList = {...state.list};
    newList[action.id] = action.newListItem;
    return updateObject(state, {list: newList});
}

const deleteList = (state, action) => {
    const newList = {...state.list};
    delete newList[action.id];
    return updateObject(state, {list: newList});
}

const selectList = (state, action) => {
    return updateObject(state, {
        selectedList: action.listIndex,
        tasks: state.list[action.listIndex].tasks
    })
}

const addTask = (state, action) => {
    const newList = {...state.list};
    newList[state.selectedList].tasks = action.tasks;
    return updateObject(state, {
        list: newList,
        tasks: action.tasks
    });
}

const selectTask = (state, action) => {
    const newList = {...state.list};
    newList[state.selectedList].tasks = action.tasks;
    return updateObject(state, {
        list: newList,
        tasks: action.tasks
    });
}

const updateNameList = (state, action) => {
    const newList = {...state.list};
    newList[action.id].name = action.name;
    return updateObject(state, {
        list: newList
    });
}

const deleteTask = (state, action) => {
    const newTasks = {...state.list[state.selectedList].tasks};
    delete newTasks[action.id];
    const newList = {
        ...state.list,
        [state.selectedList]: {
            ...state.list[state.selectedList],
            tasks: newTasks
        }
    };
    delete newList[action.id];
    return updateObject(state, {
        list: newList,
        tasks: newTasks
    });
}

const reducer = (state =initialState, action) => {
    switch(action.type) {
        case actionTypes.INIT_LIST: return initList(state, action);
        case actionTypes.ADD_LIST: return addList(state, action);
        case actionTypes.SELECT_LIST: return selectList(state, action);
        case actionTypes.UPDATE_NAME_LIST: return updateNameList(state, action);
        case actionTypes.DELETE_LIST: return deleteList(state, action);
        case actionTypes.ADD_TASK: return addTask(state, action);
        case actionTypes.SELECT_TASK: return selectTask(state, action);
        case actionTypes.DELETE_TASK: return deleteTask(state, action);
        default: return state;
    }
}

export default reducer;