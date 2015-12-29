var React = require('react');
import {Link} from 'react-router';
class SideBar extends React.Component {
    render() {
        return (
            <div className="sideBar">
                <ul>
                    <li className="title">新手教程</li>
                    <li><Link activeClassName="active" to="/new_1">开通汽车共享业务流程</Link></li>
                    <li><Link activeClassName="active" to="/new_2">手机app使用说明</Link></li>
                    <li><Link activeClassName="active" to="/new_3">租车规则</Link></li>
                    <li className="title">费用及结算</li>
                    <li><Link activeClassName="active" to="/cost_1">价格、费用明细</Link></li>
                    <li><Link activeClassName="active" to="/cost_2">支付与退款</Link></li>
                    <li><Link activeClassName="active" to="/cost_3">结算流程</Link></li>
                    <li className="title">帮助中心</li>
                    <li><Link activeClassName="active" to="/help_1">常见问题</Link></li>
                    <li><Link activeClassName="active" to="/help_2">违章查询</Link></li>
                    <li><Link activeClassName="active" to="/help_3">服务电话</Link></li>
                </ul>
            </div>
        )
    }
}
exports['default'] = SideBar;