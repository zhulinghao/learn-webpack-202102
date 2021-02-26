// 操作 DOM 元素，把 content 显示到网页上
export default function show() {
  const contentDom = document.createElement('div')
  contentDom.className = 'content'

  window.document.getElementById('app').appendChild(contentDom)
}
