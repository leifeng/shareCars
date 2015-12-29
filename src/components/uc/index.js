var React = require('react');
var ReactDom = require('react-dom');
import { Router } from 'react-router'
var CenterLeft = require('./centerLeft.js').default;
var Dashboard = require('./dashboard.js').default;
var MyOrder = require('./myOrder.js').default;
var MyAccount = require('./myAccount.js').default;
var SafeCenter = require('./safeCenter.js').default;
var UserInfo = require('./userInfo.js').default;
var RentRecord = require('./rentRecord.js').default;
var RecordDetail = require('./recordDetail.js').default;
var CostRecord = require('./costRecord').default;
var MyAppeal = require('./myAppeal').default;
var EditPassword = require('./password').default;
var EditPhone=require('./phone').default;
var EditEmail=require('./email').default;
var recharge = require('./recharge').default;
var Coupons=require('./coupons').default;
const routeConfig = [
    {
        path: '/',
        component: CenterLeft,
        indexRoute: {component: Dashboard},
        childRoutes: [
            {path: 'myOrder', component: MyOrder},
            {path: 'editPassword', component: EditPassword},
            {path: 'editPhone', component: EditPhone},
            {path: 'editEmail', component: EditEmail},
            {path: 'recharge', component: recharge},
            {path: 'coupons', component: Coupons},
            {
                path: 'myAccount',
                component: MyAccount
            },
            {
                path: 'safeSetting',
                component: SafeCenter
            },
            {path: 'myInfo', component: UserInfo},
            {
                path: 'rentalRecord',
                component: RentRecord,
                childRoutes: [
                    {path: '/rentNum/:rentNum', component: RecordDetail}
                ]
            },
            {path: 'costRecord', component: CostRecord},
            {path: 'myAppeal', component: MyAppeal}
        ]
    }
];

ReactDom.render(<Router routes={routeConfig}/>, document.getElementById('main'));

