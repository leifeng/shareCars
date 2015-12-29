var React = require('react');
var ReactDom = require('react-dom');
import { Router} from 'react-router'
var CarInfo = require('./carInfo.js').default;
var Appointment = require('./appointment.js').default;
var Header = require('../public/header.js').default;
var Footer = require('../public/footer.js').default;
var Index = React.createClass({

    render() {
        return (
            <div>
                <Header index={2}/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
});
const routeConfig = [
    {
        path: '/',
        component: Index,
        indexRoute: {component: Appointment},
        childRoutes: [
            {path: 'appointment', component: Appointment},
            {path: 'carInfo/vin/:vin/num/:num', component: CarInfo}
        ]
    }
];

ReactDom.render(<Router routes={routeConfig}/>, document.getElementById('main'));