import{a as e,c as t,d as n,o as r,p as i,r as a,t as o,u as s}from"./statConfig-CTWwnNLI.js";var c=document.querySelector(`#app`),l=[],u={...o},d=`PLAYER`,f=!1,p=``,m=``;function h(e){p=e,k()}function g(e,t){let n=new Blob([JSON.stringify(t,null,2)],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=e,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r)}function _(){return f?l.length===0?`Token seçilmedi`:l.length===1?l[0].name||`İsimsiz token`:`${l.length} token seçildi`:`Sahne açık değil`}async function v(){if(!i.isAvailable||!f){l=[],k();return}let e=await i.player.getSelection()??[];if(e.length===0){l=[],u={...o},k();return}l=await i.scene.items.getItems(e);let n=l[0];u=n?t(n):{...o},k()}async function y(e){if(l.length===0){h(`Önce bir karakter/token seç.`);return}let t=n(e);await i.scene.items.updateItems(l,e=>{for(let n of e)n.metadata=n.metadata??{},n.metadata[a]=t}),u=t,await w(!1),h(`Statlar seçili token metadata’sına kaydedildi.`)}async function b(){if(l.length===0){h(`Önce bir karakter/token seç.`);return}await i.scene.items.updateItems(l,e=>{for(let t of e)t.metadata&&delete t.metadata[a]}),u={...o},await w(!1),h(`Seçili token statları temizlendi.`)}function x(e){let n=e.map(e=>({id:e.id,name:e.name??``,layer:e.layer,stats:t(e)})).filter(e=>s(e.stats));return{version:1,extension:`Stat Bubbles`,exportedAt:new Date().toISOString(),tokenCount:n.length,tokens:n}}async function S(){return await i.scene.items.getItems(e=>e.layer===`CHARACTER`||s(e.metadata?.[a]))}async function C(){let e=x(await S());g(`stat-bubbles-${new Date().toISOString().slice(0,10)}.json`,e),h(`${e.tokenCount} token JSON olarak indirildi.`)}async function w(t=!0){let n=x(await S());return await i.scene.setMetadata({[e]:n}),t&&h(`${n.tokenCount} token Owlbear sahne metadata veritabanına kaydedildi.`),n}function T(e){let t=JSON.parse(e);if(Array.isArray(t))return{version:1,tokens:t};if(Array.isArray(t.tokens))return t;if(t.stats&&(t.id||t.name))return{version:1,tokens:[t]};throw Error(`JSON içinde tokens dizisi bulunamadı.`)}async function E(e){let t=T(e),r=await S(),s=new Map(r.map(e=>[e.id,e])),c=new Map(r.map(e=>[e.name,e])),l=new Map,u=[];for(let e of t.tokens){let t=e.id&&s.get(e.id)||e.name&&c.get(e.name);if(!t)continue;let r=n(e.stats??e);l.set(t.id,r),u.push(t)}if(u.length===0){h(`İçe aktarılacak eşleşen token bulunamadı. JSON’daki id veya name, sahnedeki token ile aynı olmalı.`);return}await i.scene.items.updateItems(u,e=>{for(let t of e)t.metadata=t.metadata??{},t.metadata[a]=l.get(t.id)??{...o}}),await w(!1),await v(),h(`${u.length} token JSON’dan içe aktarıldı.`)}async function D(e){e&&(m=await e.text(),k())}function O(){return r.map(e=>`
    <label class="field">
      <span>${e.label}</span>
      <input
        data-stat-key="${e.key}"
        value="${String(u[e.key]??``).replaceAll(`"`,`&quot;`)}"
        placeholder="-"
        ${d===`GM`?``:`disabled`}
      />
    </label>
  `).join(``)}function k(){c.innerHTML=`
    <section class="panel">
      <header class="header">
        <div>
          <h1>Stat Bubbles</h1>
          <p>STR/DEX/CON ve yönetim statlarını token hover baloncuğu olarak gösterir.</p>
        </div>
      </header>

      <div class="notice ${i.isAvailable?``:`warning`}">
        ${i.isAvailable?`Durum: ${f?`sahne hazır`:`sahne bekleniyor`}. Rol: ${d}.`:`Bu panel Owlbear Rodeo içinde çalışacak şekilde tasarlandı. Yerel test için manifest’i Owlbear profilinden ekle.`}
      </div>

      <section class="card">
        <div class="card-title">
          <strong>${_()}</strong>
          <button id="refresh" type="button">Yenile</button>
        </div>
        <p class="muted">Hover baloncuğunu görmek için Pointer aracındaki <strong>Stat Bubble Hover</strong> modunu seç.</p>
        <div class="grid">
          ${O()}
        </div>
        <div class="actions">
          <button id="save" type="button" ${d!==`GM`||l.length===0?`disabled`:``}>Seçili token’a kaydet</button>
          <button id="clear" type="button" ${d!==`GM`||l.length===0?`disabled`:``}>Statları sil</button>
        </div>
      </section>

      <section class="card">
        <h2>Session yedekleme</h2>
        <p class="muted">Veriler token metadata’sına yazılır. Ek güvenlik için GM her session sonunda JSON indirebilir veya sahne metadata veritabanını güncelleyebilir.</p>
        <div class="actions stacked">
          <button id="export" type="button" ${f?``:`disabled`}>JSON indir</button>
          <button id="sync" type="button" ${d!==`GM`||!f?`disabled`:``}>Owlbear sahne metadata DB’ye kaydet</button>
        </div>
      </section>

      <section class="card">
        <h2>JSON içe aktar</h2>
        <input id="import-file" type="file" accept="application/json,.json" ${d===`GM`?``:`disabled`} />
        <textarea id="import-text" placeholder="JSON’u buraya yapıştır..." ${d===`GM`?``:`disabled`}>${m}</textarea>
        <button id="import" type="button" ${d!==`GM`||!f?`disabled`:``}>JSON’u içe aktar</button>
      </section>

      <section class="card help">
        <h2>GitHub yayınlama</h2>
        <ol>
          <li><code>npm install</code></li>
          <li><code>npm run build</code></li>
          <li><code>dist/</code> klasörünü GitHub Pages’e yayınla.</li>
          <li>Owlbear profilinde manifest URL’si olarak <code>https://KULLANICI.github.io/REPO/manifest.json</code> ekle.</li>
        </ol>
      </section>

      ${p?`<div class="status">${p}</div>`:``}
    </section>
  `,c.querySelectorAll(`input[data-stat-key]`).forEach(e=>{e.addEventListener(`input`,e=>{u[e.target.dataset.statKey]=e.target.value})}),c.querySelector(`#refresh`)?.addEventListener(`click`,v),c.querySelector(`#save`)?.addEventListener(`click`,()=>y(u)),c.querySelector(`#clear`)?.addEventListener(`click`,b),c.querySelector(`#export`)?.addEventListener(`click`,C),c.querySelector(`#sync`)?.addEventListener(`click`,()=>w(!0)),c.querySelector(`#import-file`)?.addEventListener(`change`,e=>D(e.target.files?.[0])),c.querySelector(`#import-text`)?.addEventListener(`input`,e=>{m=e.target.value}),c.querySelector(`#import`)?.addEventListener(`click`,async()=>{try{await E(m)}catch(e){h(`JSON içe aktarılamadı: ${e.message}`)}})}async function A(){k(),i.isAvailable&&await i.onReady(async()=>{d=await i.player.getRole(),f=await i.scene.isReady(),i.player.onChange(v),i.scene.onReadyChange(async e=>{f=e,await v()}),i.action.setBadgeText(void 0),await v()})}A();