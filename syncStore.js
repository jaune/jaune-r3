/* global window */

module.exports = function (store) {
  window.history.replaceState(store.getState().router, store.getState().page.title);

  window.addEventListener('popstate', function (event) {
    store.dispatch(Object.assign({
      type: 'router/POP_HISTORY_STATE',
      payload: event.state
    }));
  });
}
