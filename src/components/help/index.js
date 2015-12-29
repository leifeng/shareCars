var React = require('react');
var ReactDom = require('react-dom');
import {Router} from 'react-router';
var SideBar = require('./sideBar.js').default;
var Header = require('../public/header.js').default;
var Footer = require('../public/footer.js').default;
var new_1 = require('./new_1.js').default;
var new_2 = require('./new_2.js').default;
var new_3 = require('./new_3.js').default;
var cost_1 = require('./cost_1.js').default;
var cost_2 = require('./cost_2.js').default;
var cost_3 = require('./cost_3.js').default;
var help_1 = require('./help_1.js').default;
var help_2 = require('./help_2.js').default;
var help_3 = require('./help_3.js').default;
var Index = React.createClass({
    render()
    {
        return (
            <div>
                <Header index={5}/>

                <div className="help content">
                    <SideBar/>

                    <div className="detail">{this.props.children}</div>
                </div>
                <Footer/>
            </div>

        )
    }
});
const routeConfig = [
    {
        path: '/',
        component: Index,
        indexRoute: {component: new_1},
        childRoutes: [
            {path: '/new_1', component: new_1},
            {path: '/new_2', component: new_2},
            {path: '/new_3', component: new_3},
            {path: '/cost_1', component: cost_1},
            {path: '/cost_2', component: cost_2},
            {path: '/cost_3', component: cost_3},
            {path: '/help_1', component: help_1},
            {path: '/help_2', component: help_2},
            {path: '/help_3', component: help_3}
        ]
    }
];

ReactDom.render(<Router routes={routeConfig}/>, document.getElementById('main'));