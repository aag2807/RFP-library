

let initialState = {counter: 0}




function reducer(state:any, action:any) {
    if(action.type === 'INCREMENT'){
        state = Object.assign({},state, {counter: state.counter + 1})
    }
    return state
}

/*
    function incrementCounter() {
        store.dispatch({
            type:'INCREMENT'
        })
    }
*/

function createStore(reducer:any, preloadedState:any) {
    let currentReducer = reducer;
    let currentState = preloadedState;
    let currentListeners = [];
    let nextListeners = currentListeners;

    function getState() {
        return currentState;
    }


    function dispatch(action){
        currentState = currentReducer(currentState, action);
        const listeners = currentListeners = nextListeners;
        for(let i = 0; i < listeners.length; i++) {
            const listener = listeners[i]
            listener();
        }
        return action
    }

    function subscribe(listener){
        nextListeners.push(listener)
    }

    return {
        getState,
        dispatch,
        subscribe
    }

}

function render(state) {
    document.getElementById('counter').textContent = state.counter;
}

let store = createStore(reducer, initialState)

store.subscribe(function(){
    render(store.getState())
})

function loadRedux(){
    render(store.getState())
}