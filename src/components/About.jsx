import React, {Component} from 'react'
import Layout from './Layout'

export default class About extends Component {
	render() {
		return (
			<Layout name="About SweetReact">
				<div className="about">
					<div className="cont">
						<p>基于React的一些常用组件集合，多数组件会从<a href="http://www.sweetui.com">SweetVue</a>移植过来，也会添加一些通用的功能组件。</p>
						<p>敬请关注！</p>
					</div>
				</div>
			</Layout>
		)
	}
}