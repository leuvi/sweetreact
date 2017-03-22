import React, {Component} from 'react'
import Layout from './Layout'
import Des from './Des'



export class TabBox extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cur: this.props.start || 0
		}
	}
	render() {
		const len = this.props.title.length
		const TabMenu = this.props.title.map((v, k) => {
			return (
				<li 
					key={k} 
					className={k === this.state.cur ? 'on' : ''}
					onClick={this.clickHandler.bind(this, k)}
				>{v}</li>
			)
		})
		const TabCont = this.props.cont.map((v, k) => {
			return (
				<dd key={k}>{v}</dd>
			)
		})
		const blockStyle = {
			width: `${100 / len}%`,
			transform: `translateX(${this.state.cur * 100}%)`
		}
		const contStyle = {
			width: `${len * 100}%`,
			transform: `translateX(-${this.state.cur * 100 / len}%)`
		}
		return (
			<div className="tab">
				<div className="tabhd">
					<ul>
						{TabMenu}
					</ul>
					<div className="block" style={blockStyle}></div>
				</div>
				<div className="tabcont">
					<dl style={contStyle}>
						{TabCont}
					</dl>
				</div>
			</div>
		)
	}
	clickHandler(k) {
		this.setState({
			cur: k
		})
	}
}

export default class Tab extends Component {
	render() {
		const tab1 = {
			title: ['tab1', 'tab2', 'tab3'],
			cont: ['cont1', 'cont2', 'cont3']
		}
		const tab2 = {
			title: ['長澤まさみ-1', '長澤まさみ-2', '長澤まさみ-3'],
			cont: [<img src='http://www.sweetui.com/demo/api/imgs/cz1.jpg' alt=""/>, 
			<img src='http://www.sweetui.com/demo/api/imgs/cz2.jpg' alt=""/>, 
			<img src='http://www.sweetui.com/demo/api/imgs/cz3.jpg' alt=""/>]
		}
		return (
			<Layout name="Tab">
				<Des info="默认效果" />
				<TabBox {...tab1} />
				<Des info="指定位置：<TabBox {...tab} start={1} />" />
				<TabBox {...tab2} start={1} />
			</Layout>
		)
	}
}