import{a as e,c as t,f as n,h as r,o as i,p as a,r as o,s,t as c,u as l}from"./statConfig-wnUllKdD.js";var u=document.querySelector(`#app`),d=[],f={...c},p=`PLAYER`,m=!1,h=``,g=``;function _(e){h=e,P()}async function v(t){let n=new Set(t),i=await r.scene.items.getItems(t=>t.metadata?.[e]===!0&&n.has(t.metadata?.[s]));i.length>0&&await r.scene.items.deleteItems(i.map(e=>e.id))}async function y(t=!0){let n=await r.scene.items.getItems(t=>t.metadata?.[e]===!0);n.length>0&&await r.scene.items.deleteItems(n.map(e=>e.id)),t&&_(`${n.length} eski kalıcı bubble temizlendi. Yeni bubble’lar sadece token üstüne gelince görünür.`)}async function b(e=!0){await y(!1),e&&_(`Eski kalıcı harita bubble’ları temizlendi. Artık statlar sadece token üzerine gelince görünecek.`)}function x(e,t){let n=new Blob([JSON.stringify(t,null,2)],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=e,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r)}function S(){return m?d.length===0?`Token seçilmedi`:d.length===1?d[0].name||`İsimsiz token`:`${d.length} token seçildi`:`Sahne açık değil`}async function C(){if(!r.isAvailable||!m){d=[],P();return}let e=await r.player.getSelection()??[];if(e.length===0){d=[],f={...c},P();return}d=await r.scene.items.getItems(e);let t=d[0];f=t?l(t):{...c},P()}async function w(e){if(d.length===0){_(`Önce bir karakter/token seç.`);return}let t=a(e);await r.scene.items.updateItems(d,e=>{for(let n of e)n.metadata=n.metadata??{},n.metadata[o]=t}),f=t,await k(!1),await v(d.map(e=>e.id)),_(`Statlar kaydedildi. Bubble’lar token üzerine gelince görünecek.`)}async function T(){if(d.length===0){_(`Önce bir karakter/token seç.`);return}await r.scene.items.updateItems(d,e=>{for(let t of e)t.metadata&&delete t.metadata[o]}),f={...c},await k(!1),await v(d.map(e=>e.id)),_(`Seçili token statları ve eski bubble’ları temizlendi.`)}function E(e){let t=e.map(e=>({id:e.id,name:e.name??``,layer:e.layer,stats:l(e)})).filter(e=>n(e.stats));return{version:1,extension:`Stat Bubbles`,exportedAt:new Date().toISOString(),tokenCount:t.length,tokens:t}}async function D(){return await r.scene.items.getItems(e=>e.layer===`CHARACTER`||n(e.metadata?.[o]))}async function O(){let e=E(await D());x(`stat-bubbles-${new Date().toISOString().slice(0,10)}.json`,e),_(`${e.tokenCount} token JSON olarak indirildi.`)}async function k(e=!0){let t=E(await D());return await r.scene.setMetadata({[i]:t}),e&&_(`${t.tokenCount} token Owlbear sahne metadata veritabanına kaydedildi.`),t}function A(e){let t=JSON.parse(e);if(Array.isArray(t))return{version:1,tokens:t};if(Array.isArray(t.tokens))return t;if(t.stats&&(t.id||t.name))return{version:1,tokens:[t]};throw Error(`JSON içinde tokens dizisi bulunamadı.`)}async function j(e){let t=A(e),n=await D(),i=new Map(n.map(e=>[e.id,e])),s=new Map(n.map(e=>[e.name,e])),l=new Map,u=[];for(let e of t.tokens){let t=e.id&&i.get(e.id)||e.name&&s.get(e.name);if(!t)continue;let n=a(e.stats??e);l.set(t.id,n),u.push(t)}if(u.length===0){_(`İçe aktarılacak eşleşen token bulunamadı. JSON’daki id veya name, sahnedeki token ile aynı olmalı.`);return}await r.scene.items.updateItems(u,e=>{for(let t of e)t.metadata=t.metadata??{},t.metadata[o]=l.get(t.id)??{...c}}),await k(!1),await v(u.map(e=>e.id)),await C(),_(`${u.length} token JSON’dan içe aktarıldı. Bubble’lar token üzerine gelince görünecek.`)}async function M(e){e&&(g=await e.text(),P())}function N(){return t.map(e=>`
    <label class="field">
      <span>${e.label}</span>
      <input
        data-stat-key="${e.key}"
        value="${String(f[e.key]??``).replaceAll(`"`,`&quot;`)}"
        placeholder="-"
        ${p===`GM`?``:`disabled`}
      />
    </label>
  `).join(``)}function P(){u.innerHTML=`
    <section class="panel">
      <header class="header">
        <div>
          <h1>Stat Bubbles</h1>
          <p>STR/DEX/CON ve yönetim statlarını token hover baloncuğu olarak gösterir.</p>
        </div>
      </header>

      <div class="notice ${r.isAvailable?``:`warning`}">
        ${r.isAvailable?`Durum: ${m?`sahne hazır`:`sahne bekleniyor`}. Rol: ${p}.`:`Bu panel Owlbear Rodeo içinde çalışacak şekilde tasarlandı. Yerel test için manifest’i Owlbear profilinden ekle.`}
      </div>

      <section class="card">
        <div class="card-title">
          <strong>${S()}</strong>
          <button id="refresh" type="button">Yenile</button>
        </div>
        <p class="muted">Kaydet dediğinde statlar token metadata’sına yazılır. Bubble’lar haritada sürekli görünmez; token üzerine gelince üst katmanda açılır.</p>
        <div class="grid">
          ${N()}
        </div>
        <div class="actions">
          <button id="save" type="button" ${p!==`GM`||d.length===0?`disabled`:``}>Seçili token’a kaydet</button>
          <button id="clear" type="button" ${p!==`GM`||d.length===0?`disabled`:``}>Statları sil</button>
        </div>
      </section>

      <section class="card">
        <h2>Session yedekleme</h2>
        <p class="muted">Veriler token metadata’sına yazılır. Ek güvenlik için GM her session sonunda JSON indirebilir veya sahne metadata veritabanını güncelleyebilir.</p>
        <div class="actions stacked">
          <button id="export" type="button" ${m?``:`disabled`}>JSON indir</button>
          <button id="sync" type="button" ${p!==`GM`||!m?`disabled`:``}>Owlbear sahne metadata DB’ye kaydet</button>
          <button id="rebuild-bubbles" type="button" ${p!==`GM`||!m?`disabled`:``}>Eski kalıcı bubble’ları temizle</button>
        </div>
      </section>

      <section class="card">
        <h2>JSON içe aktar</h2>
        <input id="import-file" type="file" accept="application/json,.json" ${p===`GM`?``:`disabled`} />
        <textarea id="import-text" placeholder="JSON’u buraya yapıştır..." ${p===`GM`?``:`disabled`}>${g}</textarea>
        <button id="import" type="button" ${p!==`GM`||!m?`disabled`:``}>JSON’u içe aktar</button>
      </section>

      <section class="card help">
        <h2>GitHub yayınlama</h2>
        <ol>
          <li><code>npm install</code></li>
          <li><code>npm run build</code></li>
          <li><code>dist/</code> klasörünü GitHub Pages’e yayınla.</li>
          <li>Bu paket için Owlbear manifest URL’si: <code>https://grndgcc.github.io/trybb/manifest.json</code></li>
        </ol>
      </section>

      ${h?`<div class="status">${h}</div>`:``}
    </section>
  `,u.querySelectorAll(`input[data-stat-key]`).forEach(e=>{e.addEventListener(`input`,e=>{f[e.target.dataset.statKey]=e.target.value})}),u.querySelector(`#refresh`)?.addEventListener(`click`,C),u.querySelector(`#save`)?.addEventListener(`click`,()=>w(f)),u.querySelector(`#clear`)?.addEventListener(`click`,T),u.querySelector(`#export`)?.addEventListener(`click`,O),u.querySelector(`#sync`)?.addEventListener(`click`,()=>k(!0)),u.querySelector(`#rebuild-bubbles`)?.addEventListener(`click`,()=>b(!0)),u.querySelector(`#import-file`)?.addEventListener(`change`,e=>M(e.target.files?.[0])),u.querySelector(`#import-text`)?.addEventListener(`input`,e=>{g=e.target.value}),u.querySelector(`#import`)?.addEventListener(`click`,async()=>{try{await j(g)}catch(e){_(`JSON içe aktarılamadı: ${e.message}`)}})}async function F(){P(),r.isAvailable&&await r.onReady(async()=>{p=await r.player.getRole(),m=await r.scene.isReady(),r.player.onChange(C),r.scene.onReadyChange(async e=>{m=e,await C()}),r.action.setBadgeText(void 0),await C()})}F();