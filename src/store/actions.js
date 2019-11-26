import * as actionTypes from './actionTypes';

export const initList = () => {
    return {
        type: actionTypes.INIT_LIST,
        
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
        ]
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