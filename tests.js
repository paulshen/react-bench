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
  },

  numbersTable: function(timerStart, timerEnd, onDone) {
    var mountNode = document.getElementById('mountNode');

    var data = [];
    for (var ii = 0; ii < 50; ii++) {
      data[ii] = [];
      for (var jj = 0; jj < 50; jj++) {
        data[ii][jj] = ii * 50 + jj;
      }
    }
    var Cell = React.createClass({
      render: function() {
        return React.DOM.td({}, this.props.value);
      }
    });
    var Row = React.createClass({
      render: function() {
        var cells = [];
        for (var jj = 0; jj < this.props.data.length; jj++) {
          cells.push(Cell({value: this.props.data[jj]}));
        }
        return React.DOM.tr({}, cells);
      }
    });
    var Table = React.createClass({
      render: function() {
        var rows = [];
        for (var jj = 0; jj < this.props.data.length; jj++) {
          rows.push(Row({data: this.props.data[jj]}));
        }
        return React.DOM.table({}, rows);
      }
    });

    var numRender = 0;
    var renderPass = function() {
      timerStart();
      React.renderComponent(Table({data: data}), mountNode);
      timerEnd();

      numRender++;
      if (numRender === 4) {
        React.unmountAndReleaseReactRootNode(mountNode);
        onDone();
      } else {
        setTimeout(renderPass, 50);
      }
    }
    renderPass();
  }
};
