var React = require('react');
var PopBBs = require('./_popBBs').default;
var PopAppeal = require('./_popAppeal').default;
import {Link} from 'react-router';
var serviceSelectMixin = require('../ajax/serviceSelect.js').default;
var Pager = require('../public/pager').default;
var IsOpenService = require('../public/accountIsOpen').default;
var accountManageMixin = require('../ajax/accountManage').default;
var StateList = React.createClass({
    getDefaultProps(){
        return {
            states: [{name: '全部', id: ''}, {name: '正常还车', id: '1'}, {name: '非法还车', id: '2'}, {name: '未还车', id: '3'}]
        }
    },
    render(){
        var style = {
            display: this.props.hide ? 'none' : 'block'
        };
        return (
            <div className="stateType dropdown">
                {this.props.stateName}
                <div className="list state" style={style}>
                    {this.props.states.map(function (item,index) {
                        return <a key={index} data-id={item.id}>{item.name}</a>
                    })}
                </div>
            </div>
        )
    }
});
var TimeList = React.createClass({
    getDefaultProps(){
        return {
            times: [{name: '一周', id: '7'}, {name: '一月', id: '30'}, {name: '半年', id: '180'}, {name: '半年以上', id: ''}]
        }
    },
    render(){
        var style = {
            display: this.props.hide ? 'none' : 'block'
        };
        return (
            <div className="timeType dropdown">
                {this.props.timeName}
                <div className="list time" style={style}>
                    {this.props.times.map(function (item,index) {
                        return <a key={index} data-id={item.id}>{item.name}</a>
                    })}
                </div>
            </div>
        )
    }
});
var PanelBig = React.createClass({
    getDefaultProps(){
        return {
            rentState: {1: '已还车', 2: '非法还车', 3: '未还车'}
        }
    },
    render()
    {
        return (
            <div className="panel">
                <div className="title">订单号：{this.props.data.rentNum}<i>{this.props.data.startTime}</i></div>
                <div className="panelBig">
                    <div>
                        <Link to={"/rentNum/"+this.props.data.rentNum}>{this.props.data.numberPlate}</Link>
                        <i>还车时间：{this.props.data.endTime}</i>
                    </div>
                    <div className="state">
                        {this.props.rentState[this.props.data.rentState]}
                    </div>
                    <div className="cost">
                        {this.props.data.totalCost}元
                    </div>
                    <div className="btns">
                        <a className="bbsClick" data-id={this.props.data.rentNum}>评论</a><a className="appealClick"
                                                                                           data-id={this.props.data.rentNum}>申诉</a>
                    </div>
                </div>
            </div>
        )
    }
});
var PanelSmall = React.createClass({
    getDefaultProps(){
        return {
            rentState: {1: '已还车', 2: '非法还车', 3: '未还车'}
        }
    },
    render()
    {
        return (
            <div className="panel">
                <div className="title">订单号：{this.props.data.rentNum}<i>{this.props.data.startTime}</i></div>
                <div className="panelSmall">
                    <div>
                        <Link to={"/rentNum/"+this.props.data.rentNum}>{this.props.data.numberPlate}</Link>
                    </div>
                    <div className="state">
                        {this.props.rentState[this.props.data.rentState]}
                    </div>
                    <div className="cost">
                        &nbsp;
                    </div>
                    <div className="btns">
                        <a>还车</a>
                    </div>
                </div>
            </div>
        )
    }
});
var rentRecord = React.createClass({
    mixins: [serviceSelectMixin,accountManageMixin],
    getInitialState(){
        return {
            stateName: '全部',
            stateId: '',
            stateHide: true,
            timeName: '一周',
            timeId: '7',
            timeHide: true,
            list: [],
            bbsIsHide: true,
            appealIsHide: true,
            rentNum: '',

            hide: true,
            handleRemark: '',
            processState: 4,

            pageSize: 10,
            pageNo: 1,
            totalPage: 0,
            totalCount: 0,
            prePage: 0,
            nextPage: 2,
            firstPage: true,
            lastPage: false,
            locked: false
        }
    },
    componentWillMount(){
        this.getProcess(()=>{
            this.getData();
        });

    },
    getData(){
        this.rentRecord(this.state.timeId, this.state.stateId, '', '', 1, this.state.pageSize, (data)=> {
            this.setState({
                list: data.list,
                pageNo: 1,
                totalPage: data.totalPage,
                totalCount: data.totalCount,
                prePage: data.prePage,
                nextPage: data.nextPage,
                firstPage: data.firstPage,
                lastPage: data.lastPage,
                locked: false
            })
        });
    },
    getProcess(cb){
        this.accountProcess((flag, data)=> {
            if (flag === 1) {
                if (data.handleState === 4) {
                    cb()
                } else {
                    this.setState({processState: data.handleState, handleRemark: data.handleRemark, hide: false})
                }

            } else if (flag === -2) {
                this.setState({processState: -2, hide: false})
            } else {
                location.href = '/zd/user.html?cb=' + encodeURIComponent(location.pathname + location.hash);
            }
        })
    },
    onClick(event){
        var target = event.target, cls = target.className;
        if (target.nodeName === 'A') {
            var name = target.innerHTML;
            var id = target.getAttribute('data-id');
            cls = target.parentNode.className;
            if (cls.indexOf('state') !== -1) {
                this.setState({stateName: name, stateId: id, stateHide: true});
            } else {
                this.setState({timeName: name, timeId: id, timeHide: true});
            }
            setTimeout(()=> {
                this.getData();
            }, 0);

            return false;
        }
        if (target.nodeName === 'DIV' && cls.indexOf('dropdown') !== -1) {
            if (cls.indexOf('stateType') !== -1) {
                this.setState({stateHide: !this.state.stateHide, timeHide: true});
            } else {
                this.setState({timeHide: !this.state.timeHide, stateHide: true});
            }
            return false;
        }
    },
    onListClick(event){
        var target = event.target, id;
        if (target.className === 'bbsClick') {
            id = target.getAttribute('data-id');
            this.setState({bbsIsHide: false, appealIsHide: true, rentNum: id});
        } else if (target.className === 'appealClick') {
            id = target.getAttribute('data-id');
            this.setState({appealIsHide: false, bbsIsHide: true, rentNum: id});
        }
    },
    closeHandle(name){
        if (name === 'appeal') {
            this.setState({appealIsHide: true})
        } else {
            this.setState({bbsIsHide: true})
        }
    },
    pageHandle(pageNo){
        this.rentRecord(this.state.timeId, this.state.stateId, '', '', pageNo, this.state.pageSize, (data)=> {
            this.setState({
                list: data.list,
                pageNo: data.pageNo,
                totalPage: data.totalPage,
                totalCount: data.totalCount,
                prePage: data.prePage,
                nextPage: data.nextPage,
                firstPage: data.firstPage,
                lastPage: data.lastPage,
                locked: false
            })
        });

    },
    render(){
        var display = {
            display: this.state.hide ? 'block' : 'none'
        };
        return (
            <div>
                <PopBBs id={this.state.rentNum } isHide={this.state.bbsIsHide} closeHandle={this.closeHandle}/>
                <PopAppeal id={this.state.rentNum} isHide={this.state.appealIsHide} closeHandle={this.closeHandle}/>

                <div className="title">租赁记录</div>
                {this.props.children || <div className="rentRecord" style={display}>
                    <div onClick={this.onClick}>
                        <StateList stateName={this.state.stateName} hide={this.state.stateHide}/>
                        <TimeList timeName={this.state.timeName} hide={this.state.timeHide}/>
                    </div>
                    <div>
                        <div className="head"><span>记录</span><span>状态</span><span>费用</span><span>操作</span></div>
                        <div onClick={this.onListClick}>
                            {this.state.list.map(function(item,index) {
                                    if (item.rentState === 3) {
                                        return <PanelSmall data={item} key={index}/>
                                    } else {
                                        return <PanelBig data={item} key={index}/>
                                    }
                                }
                            )
                            }
                        </div>
                        <Pager pageHandle={this.pageHandle}
                               locked={this.state.locked}
                               pageNo={this.state.pageNo}
                               totalPage={this.state.totalPage}
                               totalCount={this.state.totalCount}
                               prePage={this.state.prePage}
                               nextPage={this.state.nextPage}
                               firstPage={this.state.firstPage}
                               lastPage={this.state.lastPage}
                            />
                    </div>
                </div>}

                <IsOpenService isHide={this.state.hide} processState={this.state.processState}
                               handleRemark={this.state.handleRemark}/>
            </div>
        )
    }
});
exports['default'] = rentRecord;