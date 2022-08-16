/* 进程和线程的区别？ */

//  进程： 计算机用来分配任务和调度任务
//  进程中包含着线程

//  浏览器有多个进程组成的（每一个tab页是一个进程）
//  浏览器主要进程： 主进程 网络进程  绘图进程  插件

/* tab页: 渲染进程 ——> 渲染线程
 渲染进程中：*/
//  ui线程： 负责页面渲染，布局，绘制
//  js线程： js引擎线程, 执行js代码与ui线程互斥
//  主线程： 代码从上到下执行, webworker(不能操作dom元素) 同步代码
//  定时器，请求，用户的事件操作,都是异步操作


/* 测试一 */
document.body.style.background = 'red';
console.log(1);
Promise.resolve().then(() => {
  console.log(2);
  document.body.style.background = 'yellow';
})
console.log(3);

/* 测试二: 事件任务 */
button.addEventListener('click',() => {
  console.log('listener1')
  Promise.resolve().then(() => console.log('task1'))
})

button.addEventListener('click',() => {
  console.log('listener2')
  Promise.resolve().then(() => console.log('task2'))
})

/* 用户点击,放入宏任务队列 */
button.click(); // 这种情况,宏任务直接出发。 结果 listener1 listener2 task1 task2

/* 测试三: 定时器任务 */
Promise.resolve().then(() => {
  console.log('Promise1')
  setTimeout(() => {
    console.log('setTimeout2')
  }, 0)
})

setTimeout(() => {
  console.log('setTimeout1');
  Promise.resolve().then(() => {
    console.log('Promise2')
  })
},0)

// Promise1 setTimeout1 Promise2 setTimeout2

/* 测试四 */
console.log(1);
async function async() {
  console.log(2);
  await console.log(3);
  console.log(4);
}

setTimeout(() => {
  console.log(5)
}, 0)

const promise = new Promise((resolve, reject) => {
  console.log(6)
  resolve(7)
})

promise.then(res => {
  console.log(res)
})

async();
console.log(8);

// result: 1 6 2 3 8 7 4 5
