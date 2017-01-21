const React = require('react');
const ReactRedux = require('react-redux');

module.exports = React.createClass({
  displayName: 'router/Provider',
  childContextTypes: require('../contextTypes.js'),
  propTypes: {
    routeKey: React.PropTypes.string.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    router: React.PropTypes.shape({
      getLayout: React.PropTypes.func.isRequired,
      createElements: React.PropTypes.func.isRequired,
      getComponents: React.PropTypes.func.isRequired,
      resolve: React.PropTypes.func.isRequired
    })
  },

  getChildContext() {
    return {
      router: {
        resolve: this.props.router.resolve,
        push: (route) => {
          this.props.dispatch({
            type: 'router/PUSH_HISTORY_STATE',
            payload: route
          });
        }
      }
    };
  },

  fetchData: function (routeKey) {
    for (let comp of this.props.router.getComponents(routeKey)) {
      if (typeof comp.fetchData === 'function') {
        this.props.dispatch(comp.fetchData());
      }
    }
  },

  componentWillReceiveProps: function (props) {
    if (props.routeKey !== this.props.routeKey) {
      this.fetchData(props.routeKey);
    }
  },

  componentDidMount: function () {
    this.fetchData(this.props.routeKey);
  },

  render: function() {
    const routeKey = this.props.routeKey;
    const Layout = this.props.router.getLayout(routeKey);
    const elements = this.props.router.createElements(routeKey);

    return React.createElement(Layout, elements);
  }
});

module.exports = ReactRedux.connect(
  function mapStateToProps (state, ownProps) {
    return Object.assign({}, ownProps, {
      routeKey: state.routing.key
    });
  },
  function mapDispatchToProps (dispatch, ownProps) {
    return Object.assign({}, ownProps, {
      dispatch: dispatch
    });
  }
)(module.exports);
