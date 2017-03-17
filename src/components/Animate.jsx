import React, {Component} from 'react'
import Layout from './Layout'
import Code from './Code'
import SweetAnimate from './SweetAnimate'

export default class Animate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			show: true,
			animateName: ''
		}
	}
	componentDidMount() {
		this.run = false
	}
	render() {
		const div = this.state.show ? <div className="demo">demo</div> : ''
		const lis = ['bounceIn', 'flash', 'pulse', 'rubberBand', 'shake', 'swing',
		'tada', 'wobble', 'jello', 'bounceIn', 'bounceInLeft', 'fadeIn', 'fadeInLeft',
		'flipInX', 'lightSpeedIn', 'rotateIn', 'slideInLeft', 'slideInRight',
		'slideOutLeft', 'slideOutRight', 'zoomIn'].map((v, k) => {
			return <li key={k} onClick={this.setAnimate.bind(this, v)}>{v}</li>
		})
const codes = `<SweetAnimate
	enter="fadeIn"
	leave="fadeOut"
	durationEnter={1000}
	durationLeave={1000}
>
	...动画作用对象
</SweetAnimate>`
		return (
			<Layout name="Animate Library">
				<div className="animatedemo">
					<Code codes={codes} />
					<div className="line"></div>
					<SweetAnimate
						component="span"
					    enter={this.state.animateName}
					    leave={this.state.animateName}
					    durationEnter={1000}
					    durationLeave={1000}
					>
					    {div}
					</SweetAnimate>
					<ul>
						{lis}
					</ul>
				</div>
			</Layout>
		)
	}
	setAnimate(animateName) {
		if(this.run) {
			return
		}
		this.run = true
		this.setState({
			show: false,
			animateName
		}, () => {
			this.setState({show: true})
		})
		setTimeout(() => this.run = false, 2000)
	}
}