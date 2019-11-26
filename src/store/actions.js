import * as actionTypes from './actionTypes';

export const initList = () => {
    return {
        type: actionTypes.INIT_LIST,
        
        list: {
            '1': {
                id: '1',
                name: "Groceries",
                tasks: {
                    '1': {
                        id:'1',
                        name: "Bread",
                        selected: false 
                    },
                    '2':{
                        id:'2',
                        name: "Cheese",
                        selected: false 
                    },
                    '3':{
                        id:'3',
                        name: "Chocolate",
                        selected: false 
                    }
                }
            },
            '2': {
                id: '2',
                name: "GYM",
                tasks: {
                    '1':{
                        id:'1',
                        name: "Chest 3x10",
                        selected: false 
                    },
                    '2':{
                        id:'2',
                        name: "Sholders 3x12",
                        selected: false 
                    },
                    '3':{
                        id:'3',
                        name: "Legs 3x8",
                        selected: false 
                    }
                }
            },
            '3': {
                id: '3',
                name: "Expenses",
                tasks: {
                    '1':{
                        id:'1',
                        name: "Hair Cut $10",
                        selected: false 
                    },
                    '2':{
                        id:'2',
                        name: "Street food $5",
                        selected: false 
                    },
                    '3':{
                        id:'3',
                        name: "Bus $2",
                        selected: false 
                    }
                }
            },
            '4': {
                id: '4',
                name: "Others",
                tasks: {
                    '1':{
                        id:'1',
                        name: "Renew license",
                        selected: false 
                    },
                    '2':{
                        id:'2',
                        name: "Study React",
                        selected: false 
                    },
                    '3':{
                        id:'3',
                        name: "Study HTML/CSS",
                        selected: false 
                    }                    
                }
            }
        }
    }
}

export const addList = (listName) => {
    return {
        type: actionTypes.ADD_LIST,
        listName: listName
    }
}

export const selectList = (index) => {
    return {
        type: actionTypes.SELECT_LIST,
        listIndex: index
    }
}

export const addTask = (taskName) => {
    return {
        type: actionTypes.ADD_TASK,
        taskName: taskName
    }
}

export const selectTask = (taskIndex) => {
    return {
        type: actionTypes.SELECT_TASK,
        taskIndex: taskIndex
    }
}