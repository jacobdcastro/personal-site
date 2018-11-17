"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.init = init;
exports.shouldUpdateScroll = shouldUpdateScroll;
exports.RouteUpdates = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _loader = _interopRequireDefault(require("./loader"));

var _redirects = _interopRequireDefault(require("./redirects.json"));

var _apiRunnerBrowser = require("./api-runner-browser");

var _emitter = _interopRequireDefault(require("./emitter"));

var _router = require("@reach/router");

var _parsePath2 = _interopRequireDefault(require("./parse-path"));

var _loadDirectlyOr = _interopRequireDefault(require("./load-directly-or-404"));

// Convert to a map for faster lookup in maybeRedirect()
const redirectMap = _redirects.default.reduce((map, redirect) => {
  map[redirect.fromPath] = redirect;
  return map;
}, {});

function maybeRedirect(pathname) {
  const redirect = redirectMap[pathname];

  if (redirect != null) {
    if (process.env.NODE_ENV !== `production`) {
      const pageResources = _loader.default.getResourcesForPathnameSync(pathname);

      if (pageResources != null) {
        console.error(`The route "${pathname}" matches both a page and a redirect; this is probably not intentional.`);
      }
    }

    window.___replace(redirect.toPath);

    return true;
  } else {
    return false;
  }
}

const onPreRouteUpdate = location => {
  if (!maybeRedirect(location.pathname)) {
    (0, _apiRunnerBrowser.apiRunner)(`onPreRouteUpdate`, {
      location
    });
  }
};

const onRouteUpdate = location => {
  if (!maybeRedirect(location.pathname)) {
    (0, _apiRunnerBrowser.apiRunner)(`onRouteUpdate`, {
      location
    }); // Temp hack while awaiting https://github.com/reach/router/issues/119

    window.__navigatingToLink = false;
  }
};

const navigate = (to, options = {}) => {
  // Temp hack while awaiting https://github.com/reach/router/issues/119
  if (!options.replace) {
    window.__navigatingToLink = true;
  }

  let _parsePath = (0, _parsePath2.default)(to),
      pathname = _parsePath.pathname;

  const redirect = redirectMap[pathname]; // If we're redirecting, just replace the passed in pathname
  // to the one we want to redirect to.

  if (redirect) {
    to = redirect.toPath;
    pathname = (0, _parsePath2.default)(to).pathname;
  } // If we had a service worker update, no matter the path, reload window


  if (window.GATSBY_SW_UPDATED) {
    window.location = pathname;
    return;
  } // Start a timer to wait for a second before transitioning and showing a
  // loader in case resources aren't around yet.


  const timeoutId = setTimeout(() => {
    _emitter.default.emit(`onDelayedLoadPageResources`, {
      pathname
    });

    (0, _apiRunnerBrowser.apiRunner)(`onRouteUpdateDelayed`, {
      location: window.location
    });
  }, 1000);

  _loader.default.getResourcesForPathname(pathname).then(pageResources => {
    if ((!pageResources || pageResources.page.path === `/404.html`) && process.env.NODE_ENV === `production`) {
      clearTimeout(timeoutId);
      (0, _loadDirectlyOr.default)(pageResources, to).then(() => (0, _router.navigate)(to, options));
    } else {
      (0, _router.navigate)(to, options);
      clearTimeout(timeoutId);
    }
  });
};

function shouldUpdateScroll(prevRouterProps, {
  location
}) {
  const pathname = location.pathname,
        hash = location.hash;
  const results = (0, _apiRunnerBrowser.apiRunner)(`shouldUpdateScroll`, {
    prevRouterProps,
    // `pathname` for backwards compatibility
    pathname,
    routerProps: {
      location
    },
    getSavedScrollPosition: args => this._stateStorage.read(args)
  });

  if (results.length > 0) {
    return results[0];
  }

  if (prevRouterProps) {
    const oldPathname = prevRouterProps.location.pathname;

    if (oldPathname === pathname) {
      // Scroll to element if it exists, if it doesn't, or no hash is provided,
      // scroll to top.
      return hash ? hash.slice(1) : [0, 0];
    }
  }

  return true;
}

function init() {
  // Temp hack while awaiting https://github.com/reach/router/issues/119
  window.__navigatingToLink = false;
  window.___loader = _loader.default;

  window.___push = to => navigate(to, {
    replace: false
  });

  window.___replace = to => navigate(to, {
    replace: true
  });

  window.___navigate = (to, options) => navigate(to, options); // Check for initial page-load redirect


  maybeRedirect(window.location.pathname);
} // Fire on(Pre)RouteUpdate APIs


class RouteUpdates extends _react.default.Component {
  constructor(props) {
    super(props);
    onPreRouteUpdate(props.location);
  }

  componentDidMount() {
    onRouteUpdate(this.props.location);
  }

  componentDidUpdate(prevProps, prevState, shouldFireRouteUpdate) {
    if (shouldFireRouteUpdate) {
      onRouteUpdate(this.props.location);
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      onPreRouteUpdate(this.props.location);
      return true;
    }

    return false;
  }

  render() {
    return this.props.children;
  }

}

exports.RouteUpdates = RouteUpdates;
RouteUpdates.propTypes = {
  location: _propTypes.default.object.isRequired
};