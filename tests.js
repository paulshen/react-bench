var TESTS = {
  changeTextContent: function() {
    var mountNode = document.getElementById('mountNode');
    // --
    for (var ii = 0; ii < 10; ii++) {
      React.renderComponent(React.DOM.div({}, ii), mountNode);
    }
    // --
    React.unmountAndReleaseReactRootNode(mountNode);
  },

  changeClassName: function() {
    var mountNode = document.getElementById('mountNode');
    // --
    for (var ii = 0; ii < 10; ii++) {
      React.renderComponent(React.DOM.div({className: ii}), mountNode);
    }
    // --
    React.unmountAndReleaseReactRootNode(mountNode);
  },

  // This test renders a very deep element
  deepElement: function() {
    var mountNode = document.getElementById('mountNode');
    // --
    var div = React.DOM.div({});
    for (var ii = 0; ii < 100; ii++) {
      div = React.DOM.div({}, div);
    }
    React.renderComponent(div, mountNode);
    // --
    React.unmountAndReleaseReactRootNode(mountNode);
  },

  // This test exercises hiding and displaying a node
  toggleElement: function() {
    var mountNode = document.getElementById('mountNode');
    // --
    React.renderComponent(React.DOM.div({}, React.DOM.div({})), mountNode);
    React.renderComponent(React.DOM.div({}, null), mountNode);
    // --
    React.unmountAndReleaseReactRootNode(mountNode);
  },

  // This test exercises scrolling through a list of elements in a table.
  // At every step, the first row is deleted and a new row is added at the end.
  rollingTable: function() {
    var mountNode = document.getElementById('mountNode');
    // --
    for (var ii = 0; ii < 20; ii++) {
      var rows = {};
      for (var jj = 0; jj < 20; jj++) {
        rows[ii + jj] =
          React.DOM.tr({},
            [React.DOM.td({}, ii), React.DOM.td({}, jj)]
          );
      }
      var table = React.DOM.table({},
        React.DOM.tbody({},
          rows
        )
      );

      React.renderComponent(table, mountNode);
    }
    // --
    React.unmountAndReleaseReactRootNode(mountNode);
  },

  numbersTable: function() {
    var mountNode = document.getElementById('mountNode');
    var N = 10;

    var data = [];
    for (var ii = 0; ii < N; ii++) {
      data[ii] = [];
      for (var jj = 0; jj < N; jj++) {
        data[ii][jj] = ii * N + jj;
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

    // --
    React.renderComponent(Table({data: data}), mountNode);
    // --
    React.unmountAndReleaseReactRootNode(mountNode);
  }
};
