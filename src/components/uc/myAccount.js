var React = require('react');
var accountMixin = require('../ajax/accountManage.js').default;
var Bar = require('./bar.js').default;
var Lost = require('./../public/lost.js').default;
var MyAccount = React.createClass({
    mixins: [accountMixin],
    getDefaultProps(){
        return {
            processName: {1: '未处理', 2: '已付款', 3: '审核未通过', 4: '已办理'}
        }
    },
    getInitialState(){
        return {
            level: 0,
            exp: 0,
            integral: 0,
            amount: 0,
            lineOfCredit: 0,
            areaName: '',
            deposit: 0,
            discount: 0,
            isHide: true,
            handleState: 5,
            handleRemark: '',
            flag: 1
        }
    },
    componentWillMount(){
        this.accountInfo((flag, applyProcess, data)=> {
            if (flag === 1) {
                this.setState({
                    flag: flag,
                    handleState: applyProcess.handleState,
                    handleRemark: applyProcess.handleRemark,
                    level: data.memberLevel,
                    exp: data.empiricValue,
                    integral: data.integral,
                    amount: data.amount,
                    lineOfCredit: data.lineOfCredit,
                    areaName: data.areaName,
                    deposit: data.deposit,
                    discount: data.discount
                })
            } else if (flag === -1) {
                location.href = '/zd/user.html?cb=' + encodeURIComponent(location.pathname + location.hash);
            }else{
                this.setState({
                    flag: flag
                })
            }
        });
    },
    onLost(){
        this.setState({isHide: false});
    },
    render() {
        var state = this.state.flag === -2 ? -2 : this.state.handleState;
        var msg = '';
        switch (state) {
            case -2:
                msg = <div className="warning">
                    <img src="./images/member_prompt_icon5.png"/>
                    <br/>您尚未开通汽车共享业务&nbsp;&nbsp;|&nbsp;&nbsp; <a href="openService.html">立即开通</a></div>;
                break;
            case 1:
                msg = <div className="warning">
                    <img src="./images/member_prompt_icon1.png"/>
                    <br/>您尚未缴纳保证金，未开通汽车共享业务！&nbsp;&nbsp;|&nbsp;&nbsp; <a href="pay.html?type=bzj">立即缴纳</a></div>;
                break;
            case 2:
                msg = <div className="warning">
                    <img src="./images/member_prompt_icon3.png"/>
                    <br/>您已申请开通汽车共享业务并缴纳保证金，请尽快前往网点确认并领取会员卡。</div>;
                break;
            case 3:
                msg = <div className="warning">
                    <img src="./images/member_prompt_icon2.png"/>
                    <br/>您开通汽车共享业务的申请审核未通过，原因如下：<br/>{this.state.handleRemark}<br/><a href="openService.html">重新申请</a>
                </div>;
                break;
            case 4:
                msg = (
                    <div>
                        <div className="info">
                            <dl>
                                <dd>会员等级：<span className="orange">{this.state.level}</span><Bar value={this.state.exp}
                                                                                                  w="100"/></dd>
                                <dd className="orange">普通会员</dd>
                                <dd>积分：<span className="orange">{this.state.integral}</span></dd>
                                <dd> 经验值：<span className="orange">{this.state.exp}</span></dd>
                                <dd onClick={this.onLost}><a href="javascript:;"><i></i>会员挂失</a></dd>
                            </dl>
                        </div>
                        <div>
                            <ul>
                                <li><label>剩余金额：</label>{this.state.amount}元 <a href="pay.html?type=cz" target="_blank">充值</a>
                                </li>
                                <li><label>信用额度：</label>{this.state.lineOfCredit}</li>
                                <li><label>押金：</label>{this.state.deposit}元</li>
                                <li><label>所属区域：</label>{this.state.areaName}</li>
                                <li><label>会员折扣：</label>{this.state.discount}</li>
                            </ul>
                        </div>
                    </div>
                );
                break;
            default:
                msg = null;
                break;
        }

        return (
            <div>
                <Lost isHide={this.state.isHide}/>

                <div className="title">我的账户</div>
                <div className="myAccount">
                    {msg}
                </div>
            </div>
        )
    }
});
exports['default'] = MyAccount;