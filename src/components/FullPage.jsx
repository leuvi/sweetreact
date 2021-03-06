import React, {Component} from 'react'
import Layout from './Layout'
import SweetGesture from './SweetGesture'
import {DialogBox} from './Dialog'
import Code from './Code'

export default class extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cur: 0,
			dialog: {
				show: false
			}
		}
	}
	componentWillMount() {
		const codes = `<SweetGesture
	onSwipeUp={this.swipeUp}
	onSwipeDown={this.swipeDown}
	direction='DIRECTION_ALL'
>	
	<ul style={style}>
		{lis}
	</ul>
</SweetGesture>`
		this.lis = [<Code codes={codes} />, '長澤まさみ', '新垣結衣', '堀北真希', '石原さとみ']
	}
	render() {
		const length = this.lis.length
		const style = {transform: `translate3d(0, -${this.state.cur * 100}%, 0)`}
		const lis = this.lis.map((v, k) => {
			return (
				<li key={k} className={this.state.cur === k ? 'on' : ''}>
					<div className="animated fadeInLeft">{v}</div>
				</li>
			)
		})
		return (
			<Layout name="FullPage" right={{icon: 'pinglun', callback: this.showCode.bind(this)}}>
				<div className="fullpage" onTouchMove={e => e.preventDefault()}>
					<SweetGesture
						onSwipeUp={this.swipeUp.bind(this)}
						onSwipeDown={this.swipeDown.bind(this)}
						direction='DIRECTION_ALL'
					>
						<ul style={style}>
							{lis}
						</ul>
					</SweetGesture>
					<div className="tips"><i className="iconfont icon-shouqi"></i></div>
					<div className="pages">{this.state.cur + 1} / {length}</div>
					<DialogBox {...this.state.dialog} hidden={this.hidden.bind(this)} />
				</div>
			</Layout>
		)
	}
	swipeUp() {
		if(this.state.cur < this.lis.length - 1) {
			this.setState({
				cur: this.state.cur + 1,
				dialog: {
					show: false
				}
			})
		}
	}
	swipeDown() {
		if(this.state.cur > 0) {
			this.setState({
				cur: this.state.cur - 1,
				dialog: {
					show: false
				}
			})
		}
	}
	showCode() {
		this.setState({
			dialog: {
				show: true,
				title: '提示',
				content: `垂直方向的事件默认不开启，设置direction='DIRECTION_ALL'开启`
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