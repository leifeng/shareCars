var React = require('react');
var ReactDom = require('react-dom');
var Header = require('../public/header').default;
var Footer = require('../public/footer').default;
var PopCb = require('../public/_popCb').default;
var Alert = require('../public/_alert').default;
var baseSelectMixin = require('../ajax/baseSelect').default;
var Code = require('../public/code').default;
var Cookies = require('cookies-js');
var Process = require('../public/process').default;
var accountManageMixin = require('../ajax/accountManage').default;

var IsValidPhone = React.createClass({
    render(){
        var display = {
            display: this.props.isHide ? 'none' : 'block'
        };
        var height = {
            height: document.body.scrollHeight + 'px'
        };
        return (
            <div style={display}>
                <div className="mask" style={height}></div>
                <div className="pop pop-base">
                    <div className="title">提示<a className="close" onClick={this.props.closeHandle}><i
                        className="fa fa-times"></i></a></div>
                    <div className="body">
                        {this.props.msg}
                    </div>
                </div>
            </div>
        )
    }
});

var OpenService = React.createClass({
    mixins: [baseSelectMixin, accountManageMixin],
    getInitialState(){
        return {
            areaList: [],
            areaCode: 0,
            idFrontImgId: '',
            idBackImgId: '',
            driverImgId: '',
            emergencyContact: '',
            emergencyTel: '',
            idNumber: '',
            isTrue: false,
            sfz1: './images/open_idfront_tu1.png',
            sfz2: './images/open_idback_tu2.png',
            jsz: './images/open_drive_tu3.png',
            isHide: true,
            popCbHide: true,
            flag: 1,
            msg: '',
            step: 1,
            phone: '',
            code: '',
            isMobileVerify: false,
            isAlertHide: true
        }
    },
    componentWillMount(){
        this.isMobileValidated((flag, isValidated)=> {
            if (flag !== 1) {
                this.setState({popCbHide: false, flag: flag});
                return
            }

            if (!isValidated) {
                this.setState({step: 1});
            } else {
                this.setState({step: 2});
                if (Cookies('areaList')) {
                    let list = JSON.parse(decodeURIComponent(Cookies('areaList')));
                    this.setState({areaList: list, areaCode: list[0].areaCode});
                } else {
                    this.rentAreaSimple((data)=> {
                        this.setState({areaList: data, areaCode: data[0].areaCode});
                        Cookies.set('areaList', encodeURIComponent(JSON.stringify(data)), {expires: 1800});
                    });
                }
            }
        });
    },
    componentDidMount(){
        var sfz1 = document.getElementById('sfz1');
        var sfz2 = document.getElementById('sfz2');
        var jsz = document.getElementById('jsz');
        new ss.SimpleUpload({
            button: sfz1,
            url: '/zd/member/uploadPhoto',
            name: 'sfz1',
            multipart: true,
            responseType: 'json',
            allowedExtensions: ["jpg", "jpeg", "png", "gif"],
            accept: 'image/*',
            maxSize: 4096,
            encodeCustomHeaders: true,
            hoverClass: 'ui-state-hover',
            focusClass: 'ui-state-focus',
            disabledClass: 'ui-state-disabled',
            onComplete: (filename, response)=> {

                if (response.flag === 1) {
                    this.setState({idFrontImgId: response.imgId, sfz1: response.imgPath});
                } else {
                    this.setState({popCbHide: false, flag: response.flag});
                }
            },
            onError: function () {

            }
        });
        new ss.SimpleUpload({
            button: sfz2,
            url: '/zd/member/uploadPhoto',
            name: 'sfz2',
            multipart: true,
            responseType: 'json',
            allowedExtensions: ["jpg", "jpeg", "png", "gif"],
            accept: 'image/*',
            maxSize: 4096,
            encodeCustomHeaders: true,
            hoverClass: 'ui-state-hover',
            focusClass: 'ui-state-focus',
            disabledClass: 'ui-state-disabled',
            onComplete: (filename, response)=> {

                if (response.flag === 1) {
                    this.setState({idBackImgId: response.imgId, sfz2: response.imgPath});
                } else {
                    this.setState({popCbHide: false, flag: response.flag});
                }
            },
            onError: function () {

            }
        });
        new ss.SimpleUpload({
            button: jsz,
            url: '/zd/member/uploadPhoto',
            name: 'jsz',
            multipart: true,
            responseType: 'json',
            allowedExtensions: ["jpg", "jpeg", "png", "gif"],
            accept: 'image/*',
            maxSize: 4096,
            encodeCustomHeaders: true,
            hoverClass: 'ui-state-hover',
            focusClass: 'ui-state-focus',
            disabledClass: 'ui-state-disabled',
            onComplete: (filename, response)=> {
                if (response.flag === 1) {
                    this.setState({driverImgId: response.imgId, jsz: response.imgPath});
                } else {
                    this.setState({popCbHide: false, flag: response.flag});
                }
            },
            onError: function () {

            }
        });
    },
    changeHandle(event){
        var target = event.target;
        var nodeName = target.nodeName;
        var newState = {};
        if (nodeName === 'SELECT') {
            this.setState({areaCode: target.value});
        } else {
            newState[target.name] = target.value;
            this.setState(newState);
        }
    },
    onClick(event){
        var target = event.target;
        var s = location.search;
        var href = '#';
        if (s.substr(1).length > 0) {
            href = decodeURIComponent(s.substr(4));
        }
        if (target.className === 'btn') {
            if(this.state.idNumber===''){
                this.setState({msg:'请检查身份证号码是否正确！',isAlertHide:false});
                return
            }
            if(this.state.idFrontImgId===''){
                this.setState({msg:'请上传身份证正面图片！',isAlertHide:false});
                return
            }
            if(this.state.idBackImgId===''){
                this.setState({msg:'请上传身份证背面图片！',isAlertHide:false});
                return
            }
            if(this.state.driverImgId===''){
                this.setState({msg:'请上传驾驶证图片！',isAlertHide:false});
                return
            }
            if(this.state.areaCode===0){
                this.setState({msg:'请选择区域！',isAlertHide:false});
                return
            }
            if(this.state.emergencyContact===''){
                this.setState({msg:'请输入紧急联系人姓名！',isAlertHide:false});
                return
            }
            if(this.state.emergencyTel===''){
                this.setState({msg:'请输入紧急联系人电话！',isAlertHide:false});
                return
            }
            if(this.state.emergencyTel.length!==11){
                this.setState({msg:'紧急联系人电话格式错误！',isAlertHide:false});
                return
            }

            this.applyOpenService(this.state.idNumber, this.state.idFrontImgId, this.state.idBackImgId, this.state.driverImgId, this.state.areaCode, this.state.emergencyContact, this.state.emergencyTel, function (data) {
                if (data === 1) {
                    location.href = href;
                } else {
                    this.setState({isHide: false});
                }
            });
        } else if (target.className === 'donot') {
            location.href = href;
        }

    },
    closeHandle(){
        this.setState({popCbHide: true, isHide: true, isAlertHide: true});
    },
    setCodeVerifyMsg(msg){
        this.setState({msg: msg, isHide: false});
    },
    onValidPhone(){
        this.state.phoneMsg = '';
        this.state.codeMsg = '';
        if (this.state.phone === '') {
            this.setState({msg: '请输入手机号码', isHide: false});
            return;
        }

        if (this.state.code === '') {
            this.setState({msg: '请输入验证码', isHide: false});
            return;
        }

        this.mobileVerify(this.state.phone, this.state.code, (data)=> {
            if (data.flag === 1) {
                this.setState({step: 2});
            } else {
                this.setState({msg: data.msg, isHide: false});
            }
        })
    },
    render(){
        var arealist = this.state.areaList.map(function (item) {
            return (<option value={item.areaCode} key={item.areaCode}>{item.areaName}</option>)
        });
        var sfz1Style = {
            display: this.state.sfz1 != '' ? 'inline-block' : 'none'
        };
        var sfz2Style = {
            display: this.state.sfz2 != '' ? 'inline-block' : 'none'
        };
        var jszStyle = {
            display: this.state.jsz != '' ? 'inline-block' : 'none'
        };
        var step1Display = {
            display: this.state.step === 1 ? 'block' : 'none'
        };
        var step2Display = {
            display: this.state.step === 2 ? 'block' : 'none'
        };
        return (
            <div>
                <PopCb popCbHide={this.state.popCbHide} flag={this.state.flag} onClosePopCb={this.closeHandle}/>
                <IsValidPhone isHide={this.state.isHide} msg={this.state.msg} closeHandle={this.closeHandle}/>
                <Alert isHide={this.state.isAlertHide} msg={this.state.msg} closeHandle={this.closeHandle}/>
                <Process stateIndex={2}/>

                <div className="open_s content">
                    <div className="title">申请开通汽车共享业务</div>
                    <div className="body">
                        <ul className="step1" style={step1Display}>
                            <li><label>手机号码</label>
                                <input type="text" onChange={this.changeHandle} name="phone" value={this.state.phone}
                                       onBlur={this.onBlur}/></li>
                            <li className="code"><label>验证码：</label>
                                <input type="text" onChange={this.changeHandle} name="code"
                                       value={this.state.code}/><Code mobile={this.state.phone}
                                                                      mobileVerify={this.state.isMobileVerify}
                                                                      handle={this.setCodeVerifyMsg}/></li>

                            <li><a onClick={this.onValidPhone} className="next">下一步</a><a className="donot"
                                                                                          href="index.html">暂不开通</a>
                            </li>
                        </ul>
                        <div className="step2" style={step2Display}>
                            <ul>
                                <li><label>身份证号码</label><input type="text" name="idNumber" onChange={this.changeHandle}
                                                               value={this.state.idNumber}/></li>
                                <li><label>所在区域</label>
                                    <select value={this.state.areaCode} onChange={this.changeHandle}>
                                        {arealist}
                                    </select>
                                </li>
                                <li><label>身份证正面</label>
                                    <img width="160" height="79" src={this.state.sfz1} style={sfz1Style}/>
                                    <a id="sfz1">单击上传身份证</a>
                                </li>
                                <li><label>身份证反面</label>
                                    <img width="160" height="79" src={this.state.sfz2} style={sfz2Style}/>
                                    <a id="sfz2">单击上传身份证</a>
                                </li>
                                <li><label>驾驶证</label>
                                    <img width="160" height="79" src={this.state.jsz} style={jszStyle}/>
                                    <a id="jsz">单击上传驾驶证</a>
                                </li>
                                <li><label>紧急联系人</label><input type="text" name="emergencyContact"
                                                               onChange={this.changeHandle}
                                                               value={this.state.emergencyContact}/></li>
                                <li><label>紧急联系电话</label><input type="text" name="emergencyTel"
                                                                onChange={this.changeHandle}
                                                                value={this.state.emergencyTel}/>
                                </li>
                                <li><a className="btn" onClick={this.onClick}>提交</a>
                                </li>
                            </ul>
                        </div>

                    </div>
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
                <OpenService/>
                <Footer/>
            </div>
        )
    }
});
ReactDom.render(<Index/>, document.getElementById('main'));
