import{a as e,c as t,f as n,g as r,h as i,m as a,o,p as s,r as c,s as l,t as u,u as d}from"./statConfig-wnUllKdD.js";var f=document.querySelector(`#app`),p=[],m={...u},h=`PLAYER`,g=!1,_=``,v=``;function y(e){_=e,z()}function b(e){return new Set([`STR`,`DEX`,`CON`,`WIS`,`INT`,`CHA`]).has(e.label)?`${e.label}: ${e.value}`:`${e.label} ${e.value}`}async function x(t){let n=new Set(t),r=await i.scene.items.getItems(t=>t.metadata?.[e]===!0&&n.has(t.metadata?.[l]));r.length>0&&await i.scene.items.deleteItems(r.map(e=>e.id))}async function S(){let t=await i.scene.items.getItems(t=>t.metadata?.[e]===!0);t.length>0&&await i.scene.items.deleteItems(t.map(e=>e.id))}async function C(t,n=new Map){let o=[];for(let c of t){let t=a(s(n.get(c.id)??d(c)));if(t.length===0)continue;let u;try{u=await i.scene.items.getItemBounds([c.id])}catch(e){console.warn(`Stat Bubbles: token bounds could not be read`,e);continue}let f=Math.min(5,t.length),p=Math.ceil(t.length/f),m=u.center.x-(f-1)*66/2,h=u.min.y-22-p*25;t.forEach((t,n)=>{let i=n%f,a=Math.floor(n/f);o.push(r().id(`${e}/${c.id}/${t.key}/${crypto.randomUUID()}`).name(`Stat Bubble ${c.name??c.id} ${t.label}`).plainText(b(t)).width(`AUTO`).height(`AUTO`).padding(4).fontFamily(`Inter, Arial, sans-serif`).fontSize(13).fontWeight(800).lineHeight(1).textAlign(`CENTER`).textAlignVertical(`MIDDLE`).fillColor(`#ffffff`).fillOpacity(1).strokeColor(`#000000`).strokeOpacity(.35).strokeWidth(1).backgroundColor(`#111827`).backgroundOpacity(.92).cornerRadius(8).position({x:m+i*66,y:h+a*25}).layer(`TEXT`).attachedTo(c.id).locked(!0).disableHit(!0).disableAutoZIndex(!0).disableAttachmentBehavior([`ROTATION`,`SCALE`]).metadata({[e]:!0,[l]:c.id}).build())})}o.length>0&&await i.scene.items.addItems(o)}async function w(e,t=new Map){await x(e.map(e=>e.id)),await C(e,t)}async function T(e=!0){let t=(await M()).filter(e=>e.layer===`CHARACTER`||n(e.metadata?.[c])).filter(e=>n(d(e)));await S(),await C(t),e&&y(`${t.length} token için harita bubble'ları yeniden oluşturuldu.`)}function E(e,t){let n=new Blob([JSON.stringify(t,null,2)],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=e,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r)}function D(){return g?p.length===0?`Token seçilmedi`:p.length===1?p[0].name||`İsimsiz token`:`${p.length} token seçildi`:`Sahne açık değil`}async function O(){if(!i.isAvailable||!g){p=[],z();return}let e=await i.player.getSelection()??[];if(e.length===0){p=[],m={...u},z();return}p=await i.scene.items.getItems(e);let t=p[0];m=t?d(t):{...u},z()}async function k(e){if(p.length===0){y(`Önce bir karakter/token seç.`);return}let t=s(e);await i.scene.items.updateItems(p,e=>{for(let n of e)n.metadata=n.metadata??{},n.metadata[c]=t}),m=t,await P(!1);let n=new Map(p.map(e=>[e.id,t]));await w(p,n),y(`Statlar kaydedildi ve harita bubble’ları oluşturuldu.`)}async function A(){if(p.length===0){y(`Önce bir karakter/token seç.`);return}await i.scene.items.updateItems(p,e=>{for(let t of e)t.metadata&&delete t.metadata[c]}),m={...u},await P(!1),await x(p.map(e=>e.id)),y(`Seçili token statları ve harita bubble’ları temizlendi.`)}function j(e){let t=e.map(e=>({id:e.id,name:e.name??``,layer:e.layer,stats:d(e)})).filter(e=>n(e.stats));return{version:1,extension:`Stat Bubbles`,exportedAt:new Date().toISOString(),tokenCount:t.length,tokens:t}}async function M(){return await i.scene.items.getItems(e=>e.layer===`CHARACTER`||n(e.metadata?.[c]))}async function N(){let e=j(await M());E(`stat-bubbles-${new Date().toISOString().slice(0,10)}.json`,e),y(`${e.tokenCount} token JSON olarak indirildi.`)}async function P(e=!0){let t=j(await M());return await i.scene.setMetadata({[o]:t}),e&&y(`${t.tokenCount} token Owlbear sahne metadata veritabanına kaydedildi.`),t}function F(e){let t=JSON.parse(e);if(Array.isArray(t))return{version:1,tokens:t};if(Array.isArray(t.tokens))return t;if(t.stats&&(t.id||t.name))return{version:1,tokens:[t]};throw Error(`JSON içinde tokens dizisi bulunamadı.`)}async function I(e){let t=F(e),n=await M(),r=new Map(n.map(e=>[e.id,e])),a=new Map(n.map(e=>[e.name,e])),o=new Map,l=[];for(let e of t.tokens){let t=e.id&&r.get(e.id)||e.name&&a.get(e.name);if(!t)continue;let n=s(e.stats??e);o.set(t.id,n),l.push(t)}if(l.length===0){y(`İçe aktarılacak eşleşen token bulunamadı. JSON’daki id veya name, sahnedeki token ile aynı olmalı.`);return}await i.scene.items.updateItems(l,e=>{for(let t of e)t.metadata=t.metadata??{},t.metadata[c]=o.get(t.id)??{...u}}),await P(!1),await w(l,o),await O(),y(`${l.length} token JSON’dan içe aktarıldı ve bubble’ları oluşturuldu.`)}async function L(e){e&&(v=await e.text(),z())}function R(){return t.map(e=>`
    <label class="field">
      <span>${e.label}</span>
      <input
        data-stat-key="${e.key}"
        value="${String(m[e.key]??``).replaceAll(`"`,`&quot;`)}"
        placeholder="-"
        ${h===`GM`?``:`disabled`}
      />
    </label>
  `).join(``)}function z(){f.innerHTML=`
    <section class="panel">
      <header class="header">
        <div>
          <h1>Stat Bubbles</h1>
          <p>STR/DEX/CON ve yönetim statlarını token hover baloncuğu olarak gösterir.</p>
        </div>
      </header>

      <div class="notice ${i.isAvailable?``:`warning`}">
        ${i.isAvailable?`Durum: ${g?`sahne hazır`:`sahne bekleniyor`}. Rol: ${h}.`:`Bu panel Owlbear Rodeo içinde çalışacak şekilde tasarlandı. Yerel test için manifest’i Owlbear profilinden ekle.`}
      </div>

      <section class="card">
        <div class="card-title">
          <strong>${D()}</strong>
          <button id="refresh" type="button">Yenile</button>
        </div>
        <p class="muted">Kaydet dediğinde token üstüne harita bubble’ları eklenir. Eski kayıtlar görünmüyorsa alttaki yeniden oluştur düğmesini kullan.</p>
        <div class="grid">
          ${R()}
        </div>
        <div class="actions">
          <button id="save" type="button" ${h!==`GM`||p.length===0?`disabled`:``}>Seçili token’a kaydet</button>
          <button id="clear" type="button" ${h!==`GM`||p.length===0?`disabled`:``}>Statları sil</button>
        </div>
      </section>

      <section class="card">
        <h2>Session yedekleme</h2>
        <p class="muted">Veriler token metadata’sına yazılır. Ek güvenlik için GM her session sonunda JSON indirebilir veya sahne metadata veritabanını güncelleyebilir.</p>
        <div class="actions stacked">
          <button id="export" type="button" ${g?``:`disabled`}>JSON indir</button>
          <button id="sync" type="button" ${h!==`GM`||!g?`disabled`:``}>Owlbear sahne metadata DB’ye kaydet</button>
          <button id="rebuild-bubbles" type="button" ${h!==`GM`||!g?`disabled`:``}>Harita bubble’larını yeniden oluştur</button>
        </div>
      </section>

      <section class="card">
        <h2>JSON içe aktar</h2>
        <input id="import-file" type="file" accept="application/json,.json" ${h===`GM`?``:`disabled`} />
        <textarea id="import-text" placeholder="JSON’u buraya yapıştır..." ${h===`GM`?``:`disabled`}>${v}</textarea>
        <button id="import" type="button" ${h!==`GM`||!g?`disabled`:``}>JSON’u içe aktar</button>
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

      ${_?`<div class="status">${_}</div>`:``}
    </section>
  `,f.querySelectorAll(`input[data-stat-key]`).forEach(e=>{e.addEventListener(`input`,e=>{m[e.target.dataset.statKey]=e.target.value})}),f.querySelector(`#refresh`)?.addEventListener(`click`,O),f.querySelector(`#save`)?.addEventListener(`click`,()=>k(m)),f.querySelector(`#clear`)?.addEventListener(`click`,A),f.querySelector(`#export`)?.addEventListener(`click`,N),f.querySelector(`#sync`)?.addEventListener(`click`,()=>P(!0)),f.querySelector(`#rebuild-bubbles`)?.addEventListener(`click`,()=>T(!0)),f.querySelector(`#import-file`)?.addEventListener(`change`,e=>L(e.target.files?.[0])),f.querySelector(`#import-text`)?.addEventListener(`input`,e=>{v=e.target.value}),f.querySelector(`#import`)?.addEventListener(`click`,async()=>{try{await I(v)}catch(e){y(`JSON içe aktarılamadı: ${e.message}`)}})}async function B(){z(),i.isAvailable&&await i.onReady(async()=>{h=await i.player.getRole(),g=await i.scene.isReady(),i.player.onChange(O),i.scene.onReadyChange(async e=>{g=e,await O()}),i.action.setBadgeText(void 0),await O()})}B();