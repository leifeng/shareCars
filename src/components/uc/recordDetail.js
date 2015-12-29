var React = require('react');
var PopBBs = require('./_popBBs').default;
var PopAppeal = require('./_popAppeal').default;
import {Link} from 'react-router';
var serviceSelectMixin = require('../ajax/serviceSelect.js').default;
var record = React.createClass({
    mixins: [serviceSelectMixin],
    getDefaultProps(){
        return {
            rentState: {1: '已还车', 2: '非法还车', 3: '未还车'}
        }
    },
    getInitialState(){
        return {
            rentNum: this.props.params.rentNum,
            numberPlate: '',
            startTime: '',
            startStation: '',
            endTime: '',
            endStation: '',
            currentSOC: '',
            currentMileage: '',
            totalCost: '',
            cost: '',
            costTime: '',
            leasFee: '',
            leasVName: '',
            rentState: 0,
            bbsIsHide: true,
            appealIsHide: true
        }
    },
    componentWillMount(){
        this.rentDetail(this.props.params.rentNum, (data)=> {
            this.setState({
                numberPlate: data.numberPlate,
                startTime: data.startTime,
                startStation: data.startStation,
                endTime: data.endTime,
                endStation: data.endStation,
                currentSOC: data.currentSOC,
                currentMileage: data.currentMileage,
                totalCost: data.totalCost,
                cost: data.cost,
                costTime: data.costTime,
                leasFee: data.leasFee,
                leasVName: data.leasVName,
                rentState: data.rentState
            });
        });
    },
    closeHandle(name){
        if(name==='appeal'){
            this.setState({appealIsHide: true})
        }else{
            this.setState({bbsIsHide: true})
        }
    },
    openPop(name){
        if(name==='appeal'){
            this.setState({appealIsHide: false,bbsIsHide:true})
        }else{
            this.setState({bbsIsHide: false,appealIsHide:true})
        }
    },
    render(){
        var src = this.state.rentState === 1 ? 'yes' : 'no';
        return (
            <div>
            <PopBBs id={this.state.rentNum } isHide={this.state.bbsIsHide} closeHandle={this.closeHandle}/>
            <PopAppeal id={this.state.rentNum} isHide={this.state.appealIsHide} closeHandle={this.closeHandle}/>
            <div className="recordDetail">
                <div className="stateImg"><img width="36" height="36"
                                               className={src}/>{this.props.rentState[this.state.rentState]}</div>
                <table>
                    <thead>
                    <tr>
                        <td>订单号：{this.state.rentNum}</td>
                        <td><a onClick={this.openPop.bind(null,'appeal')}>申诉</a><a onClick={this.openPop.bind(null,'bbs')}>评论</a></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>车牌</td>
                        <td>{this.state.numberPlate}</td>
                    </tr>
                    <tr>
                        <td>租车时间</td>
                        <td>{this.state.startTime}</td>
                    </tr>
                    <tr>
                        <td>租车地点</td>
                        <td>{this.state.startStation}</td>
                    </tr>
                    <tr>
                        <td>还车时间</td>
                        <td>{this.state.endTime}</td>
                    </tr>
                    <tr>
                        <td>还车地点</td>
                        <td>{this.state.endStation}</td>
                    </tr>
                    <tr>
                        <td>还车时SOC</td>
                        <td>{this.state.currentSOC}</td>
                    </tr>
                    <tr>
                        <td>还车时续航里程</td>
                        <td>{this.state.currentMileage}</td>
                    </tr>
                    <tr>
                        <td>总费用</td>
                        <td>{this.state.totalCost}</td>
                    </tr>
                    <tr>
                        <td>租车费用</td>
                        <td>{this.state.cost}</td>
                    </tr>
                    <tr>
                        <td>扣时长</td>
                        <td>{this.state.costTime}</td>
                    </tr>
                    <tr>
                        <td>违章费用</td>
                        <td>{this.state.leasFee}</td>
                    </tr>
                    <tr>
                        <td>违章内容</td>
                        <td>{this.state.leasVName}</td>
                    </tr>
                    </tbody>
                </table>
                <Link to="/rentalRecord" className="toRecord">返回列表</Link>
            </div>
        </div>
        )
    }
});
exports['default'] = record;