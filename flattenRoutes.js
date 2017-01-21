function flattenRoutes(routes) {
  let result = [];

  if (typeof routes.pattern === 'string' && routes.component) {
    result.push({
      pattern: routes.pattern
    });
  }

  if (Array.isArray(routes.routes)) {
    let a = [];

    a = a.concat.apply(a, routes.routes.map(function (route) {
      return flattenRoutes(route);
    }));

    if (typeof routes.pattern === 'string') {
      a = a.map(function (route) {
        return Object.assign(route, { pattern: routes.pattern + route.pattern });
      });
    }

    result = result.concat(a);
  }
  return result;
}

module.exports = flattenRoutes;
