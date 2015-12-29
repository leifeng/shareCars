var React = require('react');
var IsOpen = React.createClass({

    render(){
        var state = this.props.processState;
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
                    <br/>您开通汽车共享业务的申请审核未通过，原因如下：<br/>{this.props.handleRemark}<br/><a href="openService.html">重新申请</a>
                </div>;
                break;
            default:
                msg = null;
                break;
        }
        var display = {
            display: this.props.hide ? 'none' : 'block'
        };
        return (
            <div className="isOpen" style={display}>{msg}</div>
        )
    }
});

exports['default'] = IsOpen;