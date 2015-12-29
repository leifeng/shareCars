var React = require('react');
var Header = require('../public/header.js').default;
var Footer = require('../public/footer').default;
import { Link} from 'react-router';
class CenterLeft extends React.Component {
    render() {
        return (
            <div>
                <Header index={4}/>

                <div className="uc content">
                    <div className="centerLeft">
                        <div className="title"><Link to='/'>会员中心</Link></div>
                        <ul className="sideBar">
                            <li><Link to='/myOrder/' activeClassName="active">我的订单</Link></li>
                            <li>我的账户<i></i></li>
                            <li className="children">
                                <ul>
                                    <li><Link to="/myAccount" activeClassName="active">账户信息</Link></li>
                                    <li><Link to="/coupons" activeClassName="active">优惠券</Link></li>
                                </ul>
                            </li>
                            <li>个人中心<i></i></li>
                            <li className="children">
                                <ul>
                                    <li><Link to="/safeSetting" activeClassName="active">安全设置</Link></li>
                                    <li><Link to="/myInfo" activeClassName="active">个人信息</Link></li>
                                </ul>
                            </li>
                            <li>业务查询<i></i></li>
                            <li className="children">
                                <ul>
                                    <li><Link to="/rentalRecord" activeClassName="active">租赁记录</Link></li>
                                    <li><Link to="/costRecord" activeClassName="active">消费记录</Link></li>
                                    <li><Link to="/myAppeal" activeClassName="active">我的申诉</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className="centerRight">
                        {this.props.children}
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
exports['default'] = CenterLeft;
