import * as types from '../constants/ActionTypes'

export const addTodo = ({ text }) => ({ type: types.ADD_TODO, text })
export const deleteTodo = ({ id }) => ({ type: types.DELETE_TODO, id: parseInt(id) })
export const editTodo = ({ id, text }) => ({ type: types.EDIT_TODO, id: parseInt(id), text })
export const completeTodo = ({ id }) => ({ type: types.COMPLETE_TODO, id: parseInt(id) })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const removeFirst = () => ({ type: types.REMOVE_FIRST })
