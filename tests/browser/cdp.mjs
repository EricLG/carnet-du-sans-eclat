import { mkdir, writeFile } from 'node:fs/promises';
export async function browser() {
  await mkdir('.browser-check', { recursive: true });
  const pages = await fetch('http://127.0.0.1:9222/json/list').then(response => response.json());
  const page = pages.find(page => page.type === 'page' && (page.url === 'about:blank' || page.url.startsWith('http://127.0.0.1:8081')));
  if (!page) throw new Error('No isolated test page');
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  const pending = new Map(); const errors = []; let id = 0;
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push(message.params.args);
    const request = pending.get(message.id);
    if (request) {
      clearTimeout(request.timer);
      pending.delete(message.id);
      if (message.error) request.reject(new Error(JSON.stringify(message.error)));
      else request.resolve(message.result);
    }
  };
  function send(method, params = {}) {
    return new Promise((resolve, reject) => { const requestId = ++id; const timer = setTimeout(() => { pending.delete(requestId); reject(new Error(`Timeout ${method}`)); }, 30000);
      pending.set(requestId, { resolve, reject, timer }); socket.send(JSON.stringify({ id: requestId, method, params })); });
  }
  async function evaluate(expression) {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  }
  async function wait(text) {
    await evaluate(`new Promise((resolve,reject)=>{ const deadline=Date.now()+25000; const timer=setInterval(()=>{
      if(document.body.innerText.includes(${JSON.stringify(text)})){clearInterval(timer);resolve(true);}
      else if(Date.now()>deadline){clearInterval(timer);reject(new Error('Missing text: '+${JSON.stringify(text)}));}
    },100) })`);
  }
  async function click(label) {
    await evaluate(`(()=>{const el=[...document.querySelectorAll('[role="button"],button,[role="tab"],[role="checkbox"],[role="radio"]')].filter(el=>el.getClientRects().length && !el.closest('[aria-hidden="true"]')).find(el=>el.getAttribute('aria-label')===${JSON.stringify(label)} || el.textContent.trim()===${JSON.stringify(label)});if(!el)throw new Error('Missing control '+${JSON.stringify(label)});el.click()})()`);
  }
  async function fill(label, text) {
    await evaluate(`document.querySelector('input[aria-label=${JSON.stringify(label)}]').focus()`);
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'a', code: 'KeyA', windowsVirtualKeyCode: 65, modifiers: 2 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'a', code: 'KeyA', windowsVirtualKeyCode: 65, modifiers: 2 });
    if (text) await send('Input.insertText', { text });
    else await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Backspace', code: 'Backspace', windowsVirtualKeyCode: 8 });
  }
  async function layout(name, width, height) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: true });
    await evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
    const overflow = await evaluate(`Array.from(document.querySelectorAll('body *')).filter(el=>el.clientWidth>0 && el.scrollWidth>el.clientWidth+1 && getComputedStyle(el).overflowX!=='hidden').map(el=>({tag:el.tagName,text:el.textContent.slice(0,80),overflow:el.scrollWidth-el.clientWidth}))`);
    if (overflow.length) throw new Error(JSON.stringify(overflow));
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    await writeFile(`.browser-check/${name}-${width}.png`, Buffer.from(shot.data, 'base64'));
    console.log(`${name} ${width}x${height}: no horizontal overflow`);
  }
  await send('Page.enable'); await send('Runtime.enable');
  return { send, evaluate, wait, click, fill, layout, errors, close: () => socket.close() };
}
