const React = require('react');

module.exports = React.createClass({
  displayName: 'router/Link',
  contextTypes: require('../contextTypes.js'),
  propTypes: {
    path: React.PropTypes.string,
    children: React.PropTypes.any
  },

  getInitialState: function () {
    const route = this.context.router.resolve(this.props.path);

    if (!route) {
      console.log('Warning: Missing route for path `' + this.props.path + '`');
      return { route: null };
    }

    return {
      route: route
    }
  },
  onClick: function (event) {
    if ((event.button === 0) && !event.ctrlKey) {
      event.preventDefault();
      this.context.router.push(this.state.route);
    }
  },
  render: function() {
    const route = this.state.route;

    if (!route) {
      return (<a href="#no-where">{this.props.children}</a>);
    }

    if (!route.virtual) {
      return (<a href={route.url}>{this.props.children}</a>);
    }
    return (<a href={route.url} onClick={this.onClick}>{this.props.children}</a>);
  }
});
