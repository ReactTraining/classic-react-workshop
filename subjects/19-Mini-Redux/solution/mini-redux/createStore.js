function createStore(reducer) {
  let state = reducer(undefined, { type: "@INIT" });
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(item => item !== listener);
    };
  };

  return {
    getState,
    dispatch,
    subscribe
  };
}

export default createStore;
