var React = require('react');
var ReactDom = require('react-dom');
var Header = require('../public/header').default;
var Footer = require('../public/footer').default;
var Process = require('../public/process').default;
var accountManage = require('../ajax/accountManage').default;
var tool = require('../public/tools').default;
var dir = require('../ajax/dir').default;
var PopCb = require('../public/_popCb').default;
var Pay = React.createClass({
    mixins: [accountManage, tool],
    getDefaultProps(){
        return {
            zd: {
                'yl': 2,
                'zfb': 1
            },
            wy: [
                {name: '银联', code: 'yl'},
                {name: '支付宝', code: 'zfb'}

            ],
            bz: [
                {name: '工商银行', code: 'ICBC'},
                {name: '农业银行', code: 'ABC'},
                {name: '中国银行（大额）', code: 'BOC'},
                {name: '中国银行', code: 'BOCSH'},
                {name: '建设银行', code: 'CCB'},
                {name: '招商银行', code: 'CMB'},
                {name: '浦发银行', code: 'SPDB'},
                {name: '广发银行', code: 'GDB'},
                {name: '交通银行', code: 'BOCOM'},
                {name: '中信银行', code: 'CNCB'},
                {name: '民生银行', code: 'CMBC'},
                {name: '兴业银行', code: 'CIB'},
                {name: '光大银行', code: 'CEB'},
                {name: '华夏银行', code: 'HXB'},
                {name: '上海银行', code: 'BOS'},
                {name: '上海农商', code: 'SRCB'},
                {name: '邮政储蓄', code: 'PSBC'},
                {name: '北京银行', code: 'BCCB'},
                {name: '北京农商', code: 'BRCB'},
                {name: '平安银行', code: 'PAB'}
            ]
        }

    },
    getInitialState(){
        return {
            code: '',
            link: '',
            type: '',
            payMethod: '',
            issInsCode: '',
            amount: 0,
            money: 0,
            flag: 1,
            isHide: true
        }
    },
    componentWillMount(){
        this.isLogin((data)=> {
            if (data.flag !== 1) {
                this.setState({flag: data.flag,isHide:false});
            }
        });

        var type = this.getQuery('type');
        if (type === 'cz') {
            this.setState({type: 'cz'});
        } else if (type === 'bzj') {
            this.setState({type: 'bzj', amount: 2000});
        }else{
            alert('参数异常')
        }
    },

    onClick(event){
        var target = event.target, code;
        if (target.nodeName === 'A') {
            code = target.getAttribute('data-code');
            if (code === 'yl' || code === 'zfb' || code === 'wx') {
                this.state.payMethod = this.props.zd[code];
                if (this.state.type === 'bzj') {
                    this.state.link = dir + '/pay/payDeposit';
                } else if(this.state.type==='cz'){
                    this.state.link = dir + '/pay/recharge';
                }else{

                }
            } else {
                if (this.state.type === 'bzj') {
                    this.state.link = dir + '/pay/payDepositByBank';
                } else if(this.state.type==='cz') {
                    this.state.link = dir + '/pay/rechargeByBank';
                }else{

                }
            }
            this.state.issInsCode = code;
            this.forceUpdate();
        }
    },
    submitHandle(event){
        if (this.state.issInsCode === '') {
            alert('请选择支付方式');
            event.preventDefault();
        }
    },
    onChange(event){
        var val = event.target.value;
        if (isNaN(val) && val !== '') {
            return;
        }
        if (val === '') {
            this.state.amount = 0;
        } else {
            this.state.amount = val;
        }
        this.setState({money: val});
    },
    onClosePopCb(){
        this.setState({isHide: true});
    },
    render(){
        var code = this.state.issInsCode;
        var wy = this.props.wy.map(function (item) {
            return <a className={code===item.code?"icon-"+item.code+"_  check":"icon-"+item.code} key={item.code}
                      data-code={item.code}><i className="fa fa-check"></i></a>
        });
        var bz = this.props.bz.map(function (item) {
            return <a className={code===item.code?"icon-"+item.code+"_ check":"icon-"+item.code} key={item.code}
                      data-code={item.code}><i className="fa fa-check"></i></a>
        });
        var bzj = {
            display: this.state.type === 'bzj' ? 'block' : 'none'
        };
        var cz = {
            display: this.state.type === 'cz' ? 'block' : 'none'
        };
        return (
            <div>
                <PopCb flag={this.state.flag} popCbHide={this.state.isHide} onClosePopCb={this.onClosePopCb}/>

                <div style={bzj}>
                    <Process stateIndex={3}/>
                </div>
                <div className="pay content" style={cz}>
                    <div className="title">充值金额</div>
                    <div className="amount"><label>请输入充值金额：</label>
                        <input type="text" value={this.state.money} onChange={this.onChange}/>
                    </div>
                </div>
                <div className="pay content">
                    <div className="title">网银支付</div>
                    <div className="banks" onClick={this.onClick}>
                        <div>
                            {wy}
                        </div>
                        <div>
                            {bz}
                        </div>
                    </div>

                </div>
                <div className="content">
                    <form target="_blank" action={this.state.link} method="post" onSubmit={this.submitHandle}>
                        <input type="hidden" name="payMethod" value={this.state.payMethod}/>
                        <input type="hidden" name="issInsCode" value={this.state.issInsCode}/>
                        <input type="hidden" name="amount" value={this.state.amount}/>

                        <div>应付金额：<strong className="orange">￥{this.state.amount}</strong></div>
                        <input type="submit" className="postData" value="确认支付"/>
                    </form>
                </div>
            </div>

        )
    }
});
var Index = React.createClass({
    render(){
        return (
            <div>
                <Header/>
                <Pay/>
                <Footer/>
            </div>
        )
    }
});
ReactDom.render(<Index/>, document.getElementById('main'));