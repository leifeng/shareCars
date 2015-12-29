var React = require('react');
var bbsMixin = require('../ajax/bbs').default;
var bbs = React.createClass({
    mixins: [bbsMixin],
    getInitialState(){
        return {
            score:1,
            id: this.props.id,
            msg: '',
            isHide: this.props.isHide,
            isSuccess: false,
            txt:''
        }
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.id !== '') {
            this.setState({isSuccess: false,id:nextProps.id,score:1});
        }
    },
    changeHandle(event){
        var target=event.target;
        console.log(target);
        if(target.nodeName.toLowerCase()==='textarea'){
            this.setState({
                msg: target.value
            });
        }else{
            this.setState({
                score: target.value
            });
        }

    },

    sendHandle(){
        if(this.state.msg===''){
            this.setState({isSuccess: true,txt:'请输入您的评价'});
            return
        }
        if (this.state.id) {
            this.addBBs(this.state.id,this.state.score, this.state.msg,  ()=> {
                this.setState({msg: '', isSuccess: true,txt:'发表成功'});
            });
        }
    },
    render(){
        var display = {
            display: this.props.isHide ? 'none' : 'block'
        };
        var isSuccess = {
            display: !this.state.isSuccess ? 'none' : 'block'
        };
        var height = {
            height: document.body.scrollHeight + 'px'
        };
        return (
            <div style={display}>
                <div className="mask" style={height}></div>
                <div className="pop pop-bbs">
                    <div className="title">评论<a className="close" onClick={this.props.closeHandle.bind(null,'bbs')}>x</a></div>
                    <div className="body">
                        <h2 style={isSuccess}>{this.state.txt}</h2>
                        <label>评分：</label>
                        <select value={this.state.score} onChange={this.changeHandle}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <textarea value={this.state.msg} onChange={this.changeHandle}/>
                        <a onClick={this.sendHandle}>发表评论</a>
                    </div>
                </div>
            </div>
        )

    }
});
exports['default'] = bbs;