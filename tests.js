var TESTS = {
  singleDiv: function(timerStart, timerEnd, onDone) {
    var mountNode = document.getElementById('mountNode');
    timerStart();
    for (var ii = 0; ii < 500; ii++) {
      React.renderComponent(React.DOM.div({}, ii), mountNode);
    }
    timerEnd();
    React.unmountAndReleaseReactRootNode(mountNode);
    onDone();
  },
  
  changeClassName: function(timerStart, timerEnd, onDone) {
    var mountNode = document.getElementById('mountNode');
    timerStart();
    for (var ii = 0; ii < 500; ii++) {
      React.renderComponent(React.DOM.div({className: ii}), mountNode);
    }
    timerEnd();
    React.unmountAndReleaseReactRootNode(mountNode);
    onDone();
  }
};
