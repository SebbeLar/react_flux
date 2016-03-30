'use strict';

var React = require('react');

var Home = React.createClass({
    render: function() {
        return (
            <div className="jumbotron">
                <h1>Task Administration</h1>
                <p>Made with react, react-router and flux</p>
            </div>
        );
    }
});

module.exports = Home;
