let cfDialog = {
  mask: '',
  dialogArr: [],
  index: 0,
  hashReflect: {},
  option: {
   
  },
  show(option) {
    let hashNum = this.getHash(JSON.stringify(option))
    let currentIndex = this.hashReflect[`hash${hashNum}`];
    if (typeof currentIndex === 'number') {
      this.dialogArr[currentIndex].className = 'dialog show'
      this.mask.className = 'cf-mask show'
      return
    } else {
      this.hashReflect[`hash${hashNum}`] = this.index
    }
    if (option && typeof option === 'object') {
      Object.assign(this.option, {
        showCancelButton: false,
        cancelText: '取消',
        cancelEvent: '',
        confirmText: '确定',
        confirmEvent: '',
        title: 'success',
        content: '',
        contentStyle: ''
      }, option)
    }

    return this.init()
  },
  hide(index) {
    this.mask.className = 'cf-mask'
    this.dialogArr[index].className = 'dialog'
  },
  init() {
    if (!this.mask) {
      this.createMask()
    }
    let option = this.option
    let contentStyle = ''
    if (option.contentStyle) {
      if (Object.prototype.toString.call(option.contentStyle) === "[object Object]") {
        
        for (let key in option.contentStyle) {
          contentStyle += `${ key.replace(/([A-Z])/g,"-$1").toLowerCase()}:${option.contentStyle[key]};`
        }
      } else {
        console.error('contentStyle必须为Object类型')
      }
    }
    let dialog = document.createElement('div')
    dialog.className = 'dialog show'
    dialog.innerHTML = `<div class="title">${option.title}</div>
    <div class="content" style="${contentStyle}">${option.content}</div>
    <div class="buttons">
      <div class="button confirm">${option.confirmText}</div>
      <div class="button cancel" style="background: #357ebd;display:${option.showCancelButton ? 'block' : 'none'}">${option.cancelText}</div>
    </div>`
    let dialogDom = this.mask.appendChild(dialog)
    this.initEvent(dialogDom)
    this.dialogArr.push(dialogDom)
    return this.index++
  },
  // 创建背景
  createMask() {
    let mask = document.createElement('div')
    mask.className = 'cf-mask show'
    
    this.mask = document.querySelector('body').appendChild(mask)
  },
  initEvent(dialogDom) {
    let _this = this
    let executeWithClosure = function(fn) {
      let index = _this.index;
      return function() {
        fn && fn();
        _this.hide(index)
      }
    }
    dialogDom.querySelector('.cancel').addEventListener('click', executeWithClosure(this.option.cancelEvent))
    dialogDom.querySelector('.confirm').addEventListener('click', executeWithClosure(this.option.confirmEvent))
  },
  // 生成唯一hash值
  getHash(str) {
    var hash = 0, i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  }
}