/*
const listener = createMediaListener({
  mobile: "(max-width: 767px)",
  small: "(max-width: 568px), (max-height: 400px)"
})

listener.listen((state) => {})
listener.getState()
listenter.dispose()
*/

function createMediaListener(queries) {
  let transientListener = null;

  const keys = Object.keys(queries);

  const queryLists = keys.reduce((queryLists, key) => {
    queryLists[key] = window.matchMedia(queries[key]);
    return queryLists;
  }, {});

  const mediaState = keys.reduce((state, key) => {
    state[key] = queryLists[key].matches;
    return state;
  }, {});

  const notify = () => {
    if (transientListener != null) transientListener(mediaState);
  };

  const listeners = keys.reduce((listeners, key) => {
    listeners[key] = event => {
      mediaState[key] = event.matches;
      notify();
    };

    return listeners;
  }, {});

  const listen = listener => {
    transientListener = listener;
    keys.forEach(key => {
      queryLists[key].addListener(listeners[key]);
    });
  };

  const dispose = () => {
    transientListener = null;
    keys.forEach(key => {
      queryLists[key].removeListener(listeners[key]);
    });
  };

  const getState = () => mediaState;

  return { listen, dispose, getState };
}

export default createMediaListener;
