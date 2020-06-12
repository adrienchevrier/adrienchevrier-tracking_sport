const initialState = {
    activities: [],
    activity: {}
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_AACTIVITIES' :
        return {
            ...state,
            articles: action.articles
        }
        default:
            return state
    }
}