import React, {Component} from 'react'
import Layout from './Layout'
import SweetGesture from './SweetGesture'

export default class extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cur: 0
		}
	}
	componentWillMount() {
		this.lis = ['長澤まさみ', '新垣結衣', '堀北真希', '石原さとみ']
	}
	render() {
		const length = this.lis.length
		const style = {
			width: `${this.lis.length * 100}%`,
			transform: `translate3d(-${this.state.cur * 100 / length}%, 0, 0)`
		}
		const lis = this.lis.map((v, k) => {
			return (
				<li key={k} className={this.state.cur === k ? 'on' : ''}>
					<div className="animated zoomIn">{v}</div>
				</li>
			)
		})
		return (
			<Layout name="FullPageX">
				<div className="fullpage fullpagex" onTouchMove={e => e.preventDefault()}>
					<SweetGesture
						onSwipeLeft={this.swipeLeft.bind(this)}
						onSwipeRight={this.swipeRight.bind(this)}
					>
						<ul style={style}>
							{lis}
						</ul>
					</SweetGesture>
					<div className="tipsx"><i className="iconfont icon-xiayibu"></i></div>
					<div className="pages">{this.state.cur + 1} / {length}</div>
				</div>
			</Layout>
		)
	}
	swipeLeft() {
		if(this.state.cur < this.lis.length - 1) {
			this.setState({
				cur: this.state.cur + 1
			})
		}
	}
	swipeRight() {
		if(this.state.cur > 0) {
			this.setState({
				cur: this.state.cur - 1
			})
		}
	}
}