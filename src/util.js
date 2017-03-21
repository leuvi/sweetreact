export let remLayout = () => {
	let rootDoc = document.documentElement,
		resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = () => {
			let clientWidth = Math.max(rootDoc.clientWidth, window.innerWidth)
			if(!clientWidth) return
			rootDoc.style.fontSize = 20 * (clientWidth / 320) + 'px'
		}
	recalc()
	window.addEventListener(resizeEvent, recalc, !1)
	window.addEventListener('DOMContentLoaded', recalc, !1)
}

export let getJSON = url => new Promise((resolve, reject) => {
	let xhr = new XMLHttpRequest()
	xhr.open('GET', url)
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				resolve(xhr.response)
			} else {
				reject(new Error('加载失败'))
			}
		}
	}
	xhr.responseType = 'json'
	xhr.send()
})

export let timeFormat = (time, item = 'y-m-d') => {
	time = time - 0 > 1e10 ? time : time * 1000
	let t = new Date(time)
	let tf = i => (i < 10 ? '0' : '') + i

	return item.replace(/y|m|d/g, imatch => imatch === 'y' 
		? tf(t.getFullYear()) : imatch === 'm' 
		? tf(t.getMonth() + 1) : tf(t.getDate()))
}