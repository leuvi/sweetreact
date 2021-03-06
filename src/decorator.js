export let timeNow = (time) => {
	const hours = time.getHours() > 9 ? time.getHours() : '0' + time.getHours()
	const minutes = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes()
	const seconds = time.getSeconds() > 9 ? time.getSeconds() : '0' + time.getSeconds()
	return `${hours}时${minutes}分${seconds}秒`
}

//自动绑定
export function autoBind(target, name, descriptor) {
	let fn = descriptor.value
	let defineProperty = false

	return {
		configurable: true,
		get() {
			if(defineProperty 
				|| this === target.prototype 
				|| this.hasOwnProperty(name)
				|| typeof fn !== 'function') {
				return fn
			}
			let boundFn = fn.bind(this)
			defineProperty = true
			Object.defineProperty(this, name, {
				configurable: true,
				get() {
					return boundFn
				},
				set(value) {
					fn = value
					delete this[name]
				}
			})
			defineProperty = false
			return boundFn
		}
	}
}

//操作日志
export function log(target, name, descriptor) {
	const fn = descriptor.value
	return {
		...descriptor,
		value() {
			console.log(`%c${timeNow(new Date())} %c执行了${name}操作`, 'color: red', 'color: #333')
			return fn.apply(this, arguments)
		}
	}
}

//任务耗时
export function time(target, name, descriptor) {
	const fn = descriptor.value
	return {
		...descriptor,
		value(...args) {
			console.time('任务耗时')
			const result = fn.apply(this, args)
			console.timeEnd('任务耗时')
			return result
		}
	}
}

//防抖
export function debounce(wait = 300, immediate = false) {
	return (target, name, descriptor) => {
		const fn = descriptor.value
		let timeout
		return {
			...descriptor,
			value(...args) {
				const callNow = immediate && !timeout
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					timeout = null
					if(!immediate) {
						fn.apply(this, [...args])
					}
				}, wait)
				if(callNow) {
					fn.apply(this, [...args])
				}
			}
		}
	}
}

//克隆
export function clone(source) {
	return (target) => {
		const _prototype = Object.assign({}, target.prototype)
		const _target = Object.assign({}, target)
		Object.setPrototypeOf(target.prototype, source.prototype)
		Object.setPrototypeOf(target, source)
		Object.assign(target.prototype, _prototype)
		Object.assign(target, _target)
	}
}