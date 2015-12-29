import { Router,IndexRoute } from 'react-router';
var React = require('react')
    , ReactDom = require('react-dom')
    , Login = require('./login.js').default
    , Reg = require('./reg.js').default
    , MobileReg = require('./mobileReg.js').default
    , UserNameReg = require('./usernameReg.js').default
    , Forget = require('./forget.js').default
    , ByMobile = require('./byMobile').default
    , ByEmail = require('./byEmail').default
    , FindPwdFromEmail = require('./findPwdFromEmail').default;
class Index extends React.Component {
    render() {
        return (
            <div>
                <div className="h5Green"></div>
                <div className="user">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
const routeConfig = [
    {
        path: '/',
        component: Index,
        indexRoute: {component: Login},
        childRoutes: [
            {path: 'login', component: Login},
            {
                path: 'reg',
                component: Reg,
                indexRoute: MobileReg,
                childRoutes: [
                    {path: 'mobile', component: MobileReg},
                    {path: 'username', component: UserNameReg}
                ]
            },
            {
                path: 'forget',
                component: Forget,
                indexRoute: ByMobile,
                childRoutes: [
                    {path: 'byMobile', component: ByMobile},
                    {path: 'byEmail', component: ByEmail},
                    {path: 'findPwd', component: FindPwdFromEmail}
                ]
            }
        ]
    }
];

ReactDom.render(<Router routes={routeConfig}/>, document.getElementById('main'));