var React = require('react');
var Bar = require('./bar.js').default;
var Cookies = require('cookies-js');
var DropDown = require('./province_city_area.js').default;
var userMixin = require('../ajax/userManage.js').default;
var Cookie = require('cookies-js');
var PopBase = require('../public/_popBase').default;
var EditHeadImg = React.createClass({
    mixins: [userMixin],
    getInitialState(){
        return {
            isHide: true,
            imgPath: this.props.imgSrc,
            imgId: '',
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            ow: 0,
            msg: ''
        }
    },
    componentDidMount(){
        var previewImg = document.getElementById('previewImg');
        var photo = $('#photo');
        var preview = (img, selection) => {
            if (!selection.width || !selection.height)
                return;
            var bl = this.state.ow / 500;
            var scaleX = 100 / selection.width;
            var scaleY = 100 / selection.height;
            previewImg.style.cssText = 'width:' + Math.round(scaleX * photo.outerWidth()) + 'px;height:' + Math.round(scaleY * photo.outerHeight()) + 'px;margin-left:' + -Math.round(scaleX * selection.x1) + 'px;margin-top:' + -Math.round(scaleY * selection.y1) + 'px;';
            this.state.x = Math.round(selection.x1 * bl);
            this.state.y = Math.round(selection.y1 * bl);
            this.state.w = Math.round(selection.width * bl);
            this.state.h = Math.round(selection.height * bl);
        };
        this.ias = photo.imgAreaSelect({
            aspectRatio: '1:1',
            handles: true,
            onSelectChange: preview,
            instance: true
        });

        var fileHead = document.getElementById('fileHead');
        new ss.SimpleUpload({
            button: fileHead,
            url: '/zd/member/uploadPhoto',
            name: 'fileHead',
            multipart: true,
            hoverClass: 'hover',
            focusClass: 'focus',
            responseType: 'json',
            allowedExtensions: ["jpg", "jpeg", "png", "gif"],
            accept: 'image/*',
            maxSize: 4096,
            encodeCustomHeaders: true,
            onComplete: (filename, response)=> {
                if (response.flag === 1) {
                    var img = new Image();
                    img.onload = ()=> {
                        this.setState({
                            imgPath: response.imgPath,
                            imgId: response.imgId,
                            ow: img.width,
                            w: img.width,
                            h: img.height
                        });
                    };
                    img.src = response.imgPath;
                } else {

                }
            },
            onError: function () {

            }
        });
    },
    componentWillUnmount(){
        this.ias = null
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.isHide !== '') {
            this.setState({isHide: nextProps.isHide});
        }
    },
    close(){
        this.ias.cancelSelection();
        this.props.hideHandle();
    },
    save(){
        this.setState({msg: ''});
        if (!this.state.imgId) {
            this.setState({msg: '请先上传图片'});
            return
        }
        this.saveHeadPhoto(this.state.imgId, this.state.x, this.state.y, this.state.w, this.state.h, this.state.ow, (data)=> {
            this.props.headImg();
            var img = new Image();
            img.onload = ()=> {
                this.setState({imgPath: data.imgPath, imgId: data.imgId, ow: img.width});
                this.close();
            };
            img.src = data.imgPath;
        });
    },
    render(){
        var style = {
            display: this.state.isHide ? 'none' : 'block'
        };
        var maskStyle = {
            height: document.body.clientHeight + 'px',
            display: this.state.isHide ? 'none' : 'block'
        };
        var infoDisplay = {
            display: this.state.msg === '' ? 'none' : 'block'
        };
        return (
            <div>
                <div className="mask" style={maskStyle}></div>
                <div className="editHeadImg" style={style}>
                    <div className="title">修改头像<a onClick={this.close}><i className="fa fa-times"></i></a></div>
                    <div className="body">
                        <div className="clear">
                            <img id="photo" src={this.state.imgPath}/>

                            <div id="preview">
                                <img src={this.state.imgPath} id="previewImg"/>
                            </div>
                        </div>
                        <div className="btns">
                            <h5 style={infoDisplay}>{this.state.msg}</h5>
                            <a id="fileHead">选择图片...</a>
                            <a onClick={this.save} className="savePhoto">保存头像</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
var userInfo = React.createClass({
    mixins: [userMixin],
    getInitialState(){
        return {
            isPhotoIn: 0,
            headPhoto: '',
            userName: '',
            realName: '',
            qq: '',
            sex: '',
            age: '',
            province: '--省--',
            city: '--市--',
            county: '--区域--',
            address: '',
            isHide: true,
            integrity: 0,
            name: '',
            popBaseHide: true,
            msg: ''
        }
    },
    componentWillMount(){
        this.userInfo(data=> {
            if (data.flag === 1) {
                this.setState({
                    integrity: data.integrity,
                    userName: data.user.nickName,
                    realName: data.user.vName,
                    qq: data.user.qq,
                    sex: data.user.sex,
                    age: data.user.age,
                    address: data.user.address,
                    name: Cookie('www_evcoming_com_user_name')
                });
            } else if (data.flag === -1) {
                location.href = '/zd/user.html?cb=' + encodeURIComponent(location.pathname + location.hash);
            }
        });
        this.setHeadImg();
    },
    handleChange(event){
        var newState = {};
        var target = event.target;
        newState[target.name] = target.value;
        this.setState(newState)
    },
    saveUser(){
        this.saveUserInfo(this.state.userName, this.state.realName, this.state.qq, this.state.sex, this.state.age, this.state.province, this.state.city, this.state.county, this.state.address, (data)=> {
            this.setState({
                userName: data.nickName,
                realName: data.vName,
                qq: data.qq,
                sex: data.sex,
                age: data.age,
                address: data.address,
                msg: '保存成功！',
                popBaseHide: false
            });
        })
    },
    handlePCA(stateName, value){
        var newState = {};
        newState[stateName] = value;
        this.setState(newState);
    },
    setSex(sex){
        this.setState({sex: sex});
    },
    openEditHeadImg(){
        this.setState({isHide: false});
    },
    closeEditHeadImg(){
        this.setState({isHide: true});
    },
    setHeadImg(){
        this.headPhoto((flag,isIn, photo)=> {
            this.setState({
                isPhotoIn: isIn,
                headPhoto: photo
            })
        });
    },
    closePopBase(){
        this.setState({popBaseHide: true});
    },
    render(){
        var src = this.state.isPhotoIn == 0 ? './images/member_face.png' : 'data:image/png;base64,'+this.state.headPhoto;
        return (
            <div>
                <EditHeadImg isHide={this.state.isHide} imgSrc={src} hideHandle={this.closeEditHeadImg}
                             headImg={this.setHeadImg}/>
                <PopBase msg={this.state.msg} isHide={this.state.popBaseHide} closeHandle={this.closePopBase}/>

                <div className="title">个人信息</div>
                <div className="userInfo">
                    <div className="zlBar">
                        <div className="editHead">
                            <a href="javascript:;" onClick={this.openEditHeadImg}>
                                <img src={src} width="80" height="80"/>
                            </a>
                            欢迎您，{this.state.name}
                        </div>
                        资料完整度：<Bar value={this.state.integrity} w="300"/> {this.state.integrity}%
                    </div>
                    <div>
                        <ul>
                            <li><label>您的昵称</label>
                                <input type="text" value={this.state.userName} name="userName"
                                       onChange={this.handleChange}/></li>
                            <li><label>真实姓名</label>
                                <input type="text" value={this.state.realName} name="realName"
                                       onChange={this.handleChange}/></li>
                            <li><label>QQ</label>
                                <input type="text" value={this.state.qq} name="qq" onChange={this.handleChange}/></li>
                            <li className="sex"><label>性别</label>

                                <div><i className={this.state.sex==0?'selected':''}
                                        onClick={this.setSex.bind(this,0)}></i>男
                                </div>
                                <div><i className={this.state.sex==1?'selected':''}
                                        onClick={this.setSex.bind(this,1)}></i>女
                                </div>
                            </li>
                            <li><label>年龄</label>
                                <input type="text" value={this.state.age} name="age" onChange={this.handleChange}/></li>
                            <li><label>所在省市</label>
                                <DropDown w="390" parent={this} pName={this.state.province} cName={this.state.city}
                                          aName={this.state.county}/>
                            </li>
                            <li>
                                <label>详细地址</label>
                                <input type="text" className="address" value={this.state.address} name="address"
                                       onChange={this.handleChange}/>
                            </li>
                            <li>
                                <a className="save" onClick={this.saveUser}>保存</a>
                            </li>
                            <li>
                                <i>郑重承诺：我们将尊重您的个人隐私，您的个人信息不会被公开</i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});
exports['default'] = userInfo;