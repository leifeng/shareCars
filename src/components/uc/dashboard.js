var React = require('react');
var Pile = require('./_pile.js').default;
var CarAppointment = require('./_carAppointment.js').default;
var Car = require('./_car.js').default;
var serviceSelectMixin = require('../ajax/serviceSelect.js').default;
var accountManageMixin = require('../ajax/accountManage').default;
var userManageMixix = require('../ajax/userManage').default;
var serviceMixin = require('../ajax/service').default;
var PopBase = require('../public/_popBase').default;
var Cookies = require('cookies-js');
import {Link} from 'react-router';
var Dashboard = React.createClass({
    mixins: [serviceSelectMixin, userManageMixix, serviceMixin,accountManageMixin],
    getInitialState(){
        return {
            myCars: [],
            rentalCars: [],
            rentalStakes: [],
            name: '',
            img: './images/member_face.png',
            isHide: true,

            hide: true,
            handleRemark: '',
            processState: 0
        }
    },
    componentWillMount() {
        if (Cookies('www_evcoming_com_user_name')) {
            this.setState({name: Cookies('www_evcoming_com_user_name')});
        }
        this.headPhoto((flag, isIn, photo)=> {
            if (flag === 1) {
                var src = (isIn == 0 ? './images/member_face.png' : 'data:image/png;base64,' + photo);
                this.setState({img: src});
            } else {
                location.href = '/zd/user.html?cb=' + location.pathname;
            }

        });
        this.getProcess(()=> {
            this.getData();
        });
    },
    getData(){
        this.myCar((myCars)=> {
            this.appointment((appointmentList)=> {
                var cars = [], stakes = [];
                for (var i = 0; i < appointmentList.length; i++) {
                    if (appointmentList[i].type === 0) {
                        cars.push(appointmentList[i]);
                    } else {
                        stakes.push(appointmentList[i]);
                    }
                }
                this.setState({myCars: myCars, rentalCars: cars, rentalStakes: stakes});
            });
        });
    },
    getProcess(cb){
        this.accountProcess((flag, data)=> {
            if (flag === 1) {
                if (data.handleState === 4) {
                    this.setState({processState: 4});
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
    clickHandle(event){
        var target = event.target, id, typee;
        if (target.className === 'rc') {
            id = target.getAttribute('data-id');
            this.returnCar(id, ()=> {
                this.setState({msg: '还车成功', isHide: false});
                this.getData();
            });
        } else if (target.className === 'yy') {

        } else if (target.className === 'qx') {
            id = target.getAttribute('data-id');
            typee = target.getAttribute('data-type');
            if (typee === 'car') {
                this.appointmentForCarDelete(id, ()=> {
                    this.setState({msg: '取消预约车成功', isHide: false});
                    this.getData();
                });
            } else {
                this.appointmentForPileDelete(id, ()=> {
                    this.setState({msg: '取消预约桩成功！', isHide: false});
                    this.getData();
                });
            }

        }
    },
    closeHandle(){
        this.setState({isHide: true});
    },
    render() {
        var display = {
            display: this.state.processState === 4 ? 'block' : 'none'
        };
        return (
            <div>
                <PopBase isHide={this.state.isHide} msg={this.state.msg} closeHandle={this.closeHandle}/>

                <div className="centerIndex">
                    <div className="info">
                        <div>
                            <img src={this.state.img} width="100" height="100"/>您好，{this.state.name}
                        </div>
                        <dl style={display}>
                            <dt><i className="icon-member_icon1"></i></dt>
                            <dd>我的车辆:{this.state.myCars.length}</dd>
                        </dl>
                        <dl style={display}>
                            <dt><i className="icon-member_icon2"></i></dt>
                            <dd>预约的车:{this.state.rentalCars.length}</dd>
                        </dl>
                        <dl style={display}>
                            <dt><i className="icon-member_icon3"></i></dt>
                            <dd>预约的桩:{this.state.rentalStakes.length}</dd>
                        </dl>
                    </div>
                    <div className="tab">
                        <div className="myOrderTab">当前订单</div>
                        <div className="grayBg"><Link to="/myOrder">查看全部订单</Link></div>
                    </div>
                    <div className="orders" onClick={this.clickHandle}>
                        {this.state.myCars.map(function (item) {
                            return <Car data={item} key={item.rentNum}/>;
                        })}
                        {this.state.rentalCars.map(function (item) {
                            return <CarAppointment data={item} key={item.num}/>;
                        })}
                        {this.state.rentalStakes.map(function (item) {
                            return <Pile data={item} key={item.num}/>;
                        })}
                    </div>
                </div>
            </div>

        )
    }
});
exports['default'] = Dashboard;





