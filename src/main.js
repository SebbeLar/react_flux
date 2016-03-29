$ = jQuery = require('jquery');
var ReactDOM = require('react-dom'),
    React = require('react'),
    Home = require('./components/homepage'),
    About = require('./components/about/aboutpage'),
    Header = require('./components/common/header'),
    Authors = require('./components/authors/authorpage');

var App = React.createClass({
    render: function() {
        var Child;
        
        switch(this.props.route) {
        
        case 'about': Child = About; break;
        case 'authors': Child = Authors; break;
        default: Child = Home;
        }
        
        return (
           <div>
               <Header/>
               <Child/>
           </div>
        );
    }
});

function render() {
    var route = window.location.hash.substr(1);
    ReactDOM.render(<App route={route} />, app);
}

window.addEventListener('hashchange', render);
render();
