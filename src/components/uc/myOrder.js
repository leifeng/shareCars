var React = require('react');
var Pile = require('./_pile.js').default;
var Car = require('./_car.js').default;
var CarAppointment = require('./_carAppointment.js').default;
var serviceSelectMixin = require('../ajax/serviceSelect.js').default;
var ServiceMixin = require('../ajax/service.js').default;
var accountManageMixin = require('../ajax/accountManage').default;
var PopBase = require('../public/_popBase').default;
var IsOpenService = require('../public/accountIsOpen').default;
var MyOrder = React.createClass({
    mixins: [ServiceMixin, serviceSelectMixin, accountManageMixin],
    getDefaultProps(){
        return {
            tabs: [{i: 1, name: '我的车辆'}, {i: 2, name: '预约的车'}, {i: 3, name: '预约的桩'}]
        }
    },
    getInitialState(){
        return {
            myCars: [],
            rentalCars: [],
            rentalStakes: [],
            tab: 1,
            isHide: true,
            msg: '',
            hide: true,
            handleRemark: '',
            processState: 4
        }
    },
    componentWillMount() {
        this.getProcess(()=> {
            this.getData();
        });
    },
    tabHandel(index){
        this.setState({tab: index});
    },
    closeHandle(){
        this.setState({isHide: true});
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
    render() {
        var tab = this.props.tabs.map((item)=> {
            if (item.i === this.state.tab) {
                return ( <a className="active" onClick={this.tabHandel.bind(this,item.i)} key={item.i}>{item.name}</a>);
            } else {
                return ( <a onClick={this.tabHandel.bind(this,item.i)} key={item.i}>{item.name}</a>);
            }
        });
        var list = [];
        if (this.state.tab === 1) {
            list = this.state.myCars.map(function (item) {
                return <Car data={item} key={item.rentNum}/>;
            });
        } else if (this.state.tab === 2) {
            list = this.state.rentalCars.map(function (item) {
                return <CarAppointment data={item} key={item.num}/>;
            });
        } else if (this.state.tab === 3) {
            list = this.state.rentalStakes.map(function (item) {
                return <Pile data={item} key={item.num}/>;
            });
        }
        var display = {
            display: this.state.hide ? 'block' : 'none'
        };
        return (
            <div>
                <PopBase isHide={this.state.isHide} msg={this.state.msg} closeHandle={this.closeHandle}/>


                <div className="title">我的订单</div>
                <div className="myOrder" style={display}>
                    <div className="tab">
                        {tab}
                    </div>
                    <div className="orders" onClick={this.clickHandle}>
                        {list}
                    </div>
                </div>
                <IsOpenService isHide={this.state.hide} processState={this.state.processState}
                               handleRemark={this.state.handleRemark}/>
            </div>
        )
    }
});
exports['default'] = MyOrder;