import {createStore} from 'redux'

const reducer = (state = false, action) => {
	switch (action.type) {
		case 'SHOW':
			return action.display
		case 'HIDDEN':
			return action.display
		default:
			return state
	}
}

const store = createStore(reducer)

export default store