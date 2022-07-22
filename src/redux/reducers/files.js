const initState = {
	dirId: null
}

const files = (state = initState, action) => {
	switch (action.type) {
		case "SET_DIR":
			return { dirId: action.dirId }
		default:
			return state
	}
}
export default files
