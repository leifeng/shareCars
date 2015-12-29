var React = require('react'),
    serviceMixin = require('../ajax/service').default;
var popY = React.createClass({
    mixins: [serviceMixin],
    getInitialState(){
        return {
            value: '',
            msg: ''
        }
    },

    componentWillReceiveProps(nextProps){
        clearTimeout(this.timer);
        this.setState({value: '', msg: ''});

    },
    componentWillUnmount(){
        clearTimeout(this.timer);
    },
    onChange(event){
        var val = event.target.value;
        if(val==0){
            this.setState({value: ''});
        }else if(val!==''){
            if (!isNaN(parseInt(val))) {
                this.setState({value: event.target.value});
            }
        }
    },
    confirm(){
        if (this.state.value === '') {
            this.setState({msg: '请输入预约时长！'});
            this.clearMsg();
            return
        }
        if(this.state.value.toString().indexOf('.')!==-1){
            this.setState({msg: '请输入整数！'});
            this.clearMsg();
            return
        }
        if (this.props.categoryId == 1) {
            this.appointmentForCar(this.props.id, this.state.value, (data)=> {
                if (data.flag === 1) {
                    this.setState({msg: '预约成功！'});
                } else {
                    this.setState({msg: data.msg});
                    this.clearMsg();
                }
            });
        } else {
            this.appointmentForPile(this.props.id, this.state.value, (data)=> {
                if (data.flag === 1) {
                    this.setState({msg: '预约成功！'});
                } else {
                    this.setState({msg: data.msg});
                    this.clearMsg();
                }
            });
        }
    },
    clearMsg(){
        clearTimeout(this.timer);
        this.timer = setTimeout(()=> {
            this.setState({msg: ''});
        }, 4000);
    },

    render(){
        var style = {
            display: this.props.isHide ? 'none' : 'block'
        };
        var height = {
            height: document.body.scrollHeight + 'px'
        };
        var title = this.props.categoryId == 1 ? '预约车' : '预约桩';
        var freeNumber = this.props.data.freeNumber - this.props.data.scheduleNum > 0 ? this.props.data.freeNumber - this.props.data.scheduleNum : 0;
        var v = this.state.value - this.props.data.freeTime;
        var money = v > 0 ? Math.ceil(v / this.props.data.unitTime * this.props.data.unitPrice) : 0;

        return (
            <div style={style}>
                <div className="mask" style={height}></div>
                <div className="pop pop-yy">
                    <div className="title">{title}<a onClick={this.props.closeHandle}><i
                        className="fa fa-times"></i></a></div>
                    <div className="body">
                        <dl>
                            <dd>预约时长：<input type="text" value={this.state.value} onChange={this.onChange}/>分钟
                                <i>{money}</i>元
                            </dd>
                            <dd>当天免费预约次数：{this.props.data.freeNumber}次，剩余次数：{freeNumber}次</dd>
                            <dd>免费预约时长：{this.props.data.freeTime}分钟，超出部分{this.props.data.unitPrice}元/{this.props.data.unitTime}分钟</dd>
                            <dd className="msg">{this.state.msg}</dd>
                        </dl>
                        <a className="cancel" onClick={this.props.closeHandle}>取消</a><a className="ok"
                                                                                        onClick={this.confirm}>确定</a>
                    </div>
                </div>
            </div>
        )
    }
});
exports['default'] = popY;