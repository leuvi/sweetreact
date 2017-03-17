import React, {Component} from 'react'
import Layout from './Layout'
import Des from './Des'

class ToTopBox extends Component {
	constructor(props) {
		super(props)
		this.state = {
			show: false
		}
	}
	componentWillMount() {
		this.top = 0
		this.pos = this.props.pos || 300
		this.time = this.props.time || 200
	}
	componentDidMount() {
		window.addEventListener('scroll', this.scrollHandler, !1)
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollHandler)
	}
	render() {
		return (
			<div 
				className={this.state.show ? 'totop show' : 'totop'}
				onClick={this.moveTo.bind(this, this.top)}
			>
				<i className="iconfont icon-shouqi"></i>
			</div>
		)
	}
	scrollHandler = () => {
		this.top = Math.max(window.pageYOffset, document.body.scrollTop)
		this.top > this.pos ? this.setState({
			show: true
		}) : this.setState({
			show: false
		})
	}
	moveTo(top) {
		const start = Date.now()
		const self = this
		function _animate() {
			let now = Date.now()
			let fraction = (now - start) / self.time
			if(fraction < 1){
				window.scrollTo(0, top * (1 - fraction))
				setTimeout(_animate, 5)
			}else{
				window.scrollTo(0, 0)
			}
		}
		_animate()
	}
}

export default class ToTop extends Component {
	render() {
		return (
			<Layout name="ToTop">
				<Des info="<ToTopBox pos={200} time={300} />" />
				<ToTopBox pos={200} time={300} />
				<div className="totoppage">
					<p>一个四川人在街边遇见一个卖切糕的新疆人，四川人想买块切糕，顺手比了手指头大小的一条，新疆人切下来足球大小的一块，要500块钱。</p>
					<p>四川人吓了一跳，惊呼“ 啷个楞个贵！我到哪里搞点子弹哟？”</p>
					<p>旁边经过的北京人一听子弹赶紧拿起电话，拨打110：“喂，我是朝阳群众，有一群暴恐分子……”谁知刚才在线看澳门首家线上赌场开头的片子把手机电量用光了，挂到一半手机就没电了，幸好一个台湾人在旁边用爱发电才报了警。</p>
					<p>四川人吓得赶紧拔腿就跑，新疆人拿起刀就开始追，追着追着四川人不见了，原来是掉进了河南人昨天晚上偷走井盖的下水道里了。新疆人四处乱瞅想把四川人找出来，结果旁边冲上来一个戴着大金链子的东北人：“你瞅啥！”</p>
					<p>新疆人和东北人扭打在一起，一个山东大哥过来劝架说不要打了，一张嘴大葱的味道喷涌而出熏晕了新疆人， 熏得旁边几个嚼着槟榔的湖南人biajibiaji满地吐口水， 东北人嘴里含着老妹给扒的蒜所以安然无恙。</p>
					<p>掉到下水道的四川人摔得昏头胀脑，一抬头忽然发现自己眼前有个广东人正在吃一个昨天晚上喝多了掉到下水道里的内蒙大汉。四川人吓得赶紧从下水道里窜了出来，结果撞到了一个看热闹的上海人身上，上海人惊叫一声“西开啦，侬个安徽赤佬！”就吓晕了，旁边的西藏人一看这是自己睡过的进藏文青，以为他被吓死赶紧掏出转经轮来帮他超度。这时候一个福建人走到北京人的身边，问是不是他刚才打电话报的警，北京人说是，福建人点点头说：“ 我系福（胡）警官，里（你）滴报告灰常及席，现在公安集捷定奖励里伍万元钱，请里先交给我五百块钱的手续会。 ”</p>
					<p>北京人说糟了，自己打工的江南皮革厂倒闭了，王八蛋浙江老板吃喝嫖赌欠下三个亿带着小姨子跑路了，现在自己身上只有包没有钱，旁边刚买完路虎和车模的山西人见状不屑一笑，刚准备说什么，旁边吸毒的云南人听说福建人自称警官，赶紧掏出来一颗手雷要跟大家同归于尽。摆摊的陕西人见状大叫“你娃个瓜批，甭炸了卧滴宝贝”，一边手忙脚乱的把自己在工地挖出来的古董包了起来，开兰州拉面馆的青海人拿出刀，大喊一声“我把你妈的皮尕娃，泥钱还米有格腻! ”提着刀就把陕西人按倒在地，结果甘肃人栓在旁边的骆驼受了惊，踢翻了煤球炉子，顿时浓烟滚滚什么都看不见，天津人大叫“介四到河北僧了吗”，湖北人趁机逃了两碗面的单，西服革履的香港人冷冷一笑：“ 孤寒鬼 ”，优雅的放下手中的馍和清水昂首走出了面馆。大家一哄而散，现场只剩下1024个江苏人还在一起互相吵的面红耳赤。</p>
					<p>这时候新疆人苏醒了过来，觉得这一切实在是太匪夷所思了，他要找一个远离东北人的地方重新开始。他先是来到了广西，结果被骗进了一个江西人开设的传销窝点，差点血本无归，幸好一个云南姑娘与他一见钟情，施展祖传的金蚕蛊救了他。然而姑娘跟他一起逃出传销窝点的时候被一个贵州人的脑袋撞到了膝盖，不幸逝世。万念俱灰的新疆人到了祖国的最南端——海南岛，当他推着自己的切糕车在三亚左顾右盼的寻找他在这个城市的第一个顾客时，一个熟悉的声音在他耳边响起：</p>
					<p>“你瞅啥？”</p>
				</div>
			</Layout>
		)
	}
}