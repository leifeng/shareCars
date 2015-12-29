var React = require('react');
class Footer extends React.Component {
    render() {
        return (
            <div className="footerPanel">
                <div className="footer">
                    <div className="content">
                        <dl>
                            <dt>帮助中心</dt>
                            <dd><a>租车流程</a></dd>
                            <dd><a>支付与退款</a></dd>
                            <dd><a>常见问题</a></dd>
                        </dl>
                        <dl>
                            <dt><a>服务支持</a></dt>
                            <dd><a>服务保障</a></dd>
                            <dd><a>保险条款</a></dd>
                            <dd><a>用户协议</a></dd>
                        </dl>
                        <dl>
                            <dt><a>关于我们</a></dt>
                            <dd><a>会员政策</a></dd>
                            <dd><a>公司信息</a></dd>
                            <dd><a>联系我们</a></dd>
                        </dl>
                        <dl>
                            <dt><a>关注我们</a></dt>
                            <dd><a>新浪微博</a></dd>
                            <dd><a>官方微信</a></dd>

                        </dl>
                        <dl>
                            <dt>联系我们</dt>
                            <dd className="phone">
                                <span>010-58784862</span>
                                <span>通话电话联系我们</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>下载APP</dt>
                            <dd></dd>
                            <dd></dd>
                        </dl>
                    </div>
                </div>
                <div className="footerSmall">
                    <em>知豆会员|新大洋|ZD</em>
                    <em>@zd.com 京ICP证110507号 京ICP备10046444号 京公网安备1101080212535号 京网文[2014]0059-0009号</em>
                </div>
            </div>
        )
    }
}
exports["default"] = Footer;