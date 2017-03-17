import React, {Component} from 'react'
import Layout from './components/Layout'
import {Link} from 'react-router'
import {DialogBox} from './components/Dialog'

export default class Demos extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dialog: {
				show: false
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		//console.log(nextProps)
    }
    shouldComponentUpdate(nextProps, nextState) {
		return true
    }
	render() {
		return (
			<Layout name="Demo Previews" right={{icon: 'pinglun', callback: this.showTip.bind(this)}}>
				<div className="demos">
					<ul>
						<li>
							<Link to="/demo/tab">
								<span><i className="iconfont icon-zonghe"></i></span>
								<span>Tab</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/slide">
								<span><i className="iconfont icon-tupian"></i></span>
								<span>Slide</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/totop">
								<span><i className="iconfont icon-shouqi"></i></span>
								<span>ToTop</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/actionsheet">
								<span><i className="iconfont icon-fenxiang"></i></span>
								<span>ActionSheet</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/animate">
								<span><i className="iconfont icon-daohang"></i></span>
								<span>Animate</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/dialog">
								<span><i className="iconfont icon-pinglun"></i></span>
								<span>Dialog</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/toast">
								<span><i className="iconfont icon-xinxi"></i></span>
								<span>Toast</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/fullpage">
								<span><i className="iconfont icon-shouji"></i></span>
								<span>FullPage</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/fullpagex">
								<span><i className="iconfont icon-shouji"></i></span>
								<span>FullPageX</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/gesture">
								<span><i className="iconfont icon-qita"></i></span>
								<span>Gesture</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/switch">
								<span><i className="iconfont icon-xiangqu"></i></span>
								<span>Switch</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/countdown">
								<span><i className="iconfont icon-24xiaoshiqiantai"></i></span>
								<span>CountDown</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/refresh">
								<span><i className="iconfont icon-yuding"></i></span>
								<span>Refresh</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/infiniteload">
								<span><i className="iconfont icon-mai"></i></span>
								<span>InfiniteLoad</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/progress">
								<span><i className="iconfont icon-tingchechang"></i></span>
								<span>Progress</span>
							</Link>
						</li>
						<li>
							<Link to="/demo/citypicker">
								<span><i className="iconfont icon-zhusu"></i></span>
								<span>CityPicker</span>
							</Link>
						</li>
						<li className="disabled">
							<a>
								<span><i className="iconfont icon-youji"></i></span>
								<span>Upload</span>
							</a>
						</li>
						<li className="disabled">
							<a>
								<span><i className="iconfont icon-shijian"></i></span>
								<span>DatePicker</span>
							</a>
						</li>
						<li className="disabled">
							<a>
								<span><i className="iconfont icon-ziyouanpai"></i></span>
								<span>Form</span>
							</a>
						</li>
						<li className="disabled">
							<a>
								<span><i className="iconfont icon-geren"></i></span>
								<span>Login</span>
							</a>
						</li>
						<li className="disabled">
							<a>
								<span><i className="iconfont icon-dianping"></i></span>
								<span>Regist</span>
							</a>
						</li>
						<li className="disabled">
							<a>
								<span><i className="iconfont icon-zhongzhuan"></i></span>
								<span>Slider</span>
							</a>
						</li>
						<li className="disabled">
							<a>
								<span>未完待续</span>
							</a>
						</li>
					</ul>
					<DialogBox {...this.state.dialog} hidden={this.hidden.bind(this)} />
				</div>
			</Layout>
		)
	}
	showTip() {
		this.setState({
			dialog: {
				show: true,
				title: '┑(￣▽ ￣)┍',
				content: `灰色部分功能暂时未完成`,
				confirmText: '嗯~'
			}
		})
	}
	hidden() {
		this.setState({
			dialog: {
				show: false
			}
		})
	}
}