import React, {Component, PropTypes} from 'react'
import Layout from './Layout'

export default class About extends Component {
	static contextTypes = {
	    router: PropTypes.object,
	}
	render() {
		return (
			<Layout name="About SweetReact">
				<div className="about">
					<div className="cont">
						<p>基于ReactJS的一些常用组件集合，多数组件会从<a href="http://www.sweetui.com">SweetVue</a>移植过来。</p>
						<p>也添加了一些通用的功能组件。</p>
						<p>如<a onClick={
							() => {
								this.context.router.push('/demo/animate')
							}
						}>动画组件</a>、<a onClick={
							() => {
								this.context.router.push('/demo/gesture')
							}
						}>手势操作组件</a>等。</p>
						<p>敬请关注，谢谢！</p>
					</div>
				</div>
			</Layout>
		)
	}
}