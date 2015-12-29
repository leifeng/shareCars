var React = require('react');
var ReactDom = require('react-dom');
var safeCenter = require('../ajax/safeCenter').default;
var Header = require('../public/header').default;
var tool = require('../public/tools').default;
var EmailValid = React.createClass({
    mixins: [safeCenter, tool],
    getInitialState(){
        return {
            t: 5,
            icon: '',
            msg: '',
            isHide: true
        }
    },
    componentDidMount(){

        var code = this.getQuery('code');
        var memberId = this.getQuery('memberId');
        if (!code || !memberId) {
            return;
        }
        this.emailVerifyCode(memberId, code, (data)=> {
            if (data.flag === 1) {
                this.setState({icon: './images/bank_ok.png', msg: '恭喜你，邮箱验证成功', isHide: false});
                this.timeHandle('/zd/uc.html');
            } else {
                this.setState({icon: './images/bank_no.png', msg: data.msg + ',请重新验证', isHide: true});
            }
        });
    },
    timeHandle(url){
        var t = 5;
        this.timer = setInterval(()=> {
            if (t === 0) {
                clearInterval(this.timer);
                location.href = url;
            } else {
                t--;
                this.setState({t: t});
            }
        }, 1000);
    },
    componentWillUnmount(){
        clearInterval(this.timer);
    },
    render(){
        var timeDisplay = {
            display: this.state.isHide ? 'none' : 'block'
        }
        return (
            <div>
                <Header/>

                <div className="emailValid">
                    <div className="middle">
                        <div className="stateIcon">
                            <img src={this.state.icon}/>{this.state.msg}
                        </div>
                        <div className="timer" style={timeDisplay}>
                            {this.state.t}s后自动关闭
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
ReactDom.render(
    <EmailValid/>,
    document.getElementById('main')
)