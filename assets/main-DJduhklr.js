import{g as c,O as r}from"./video-utils-BTDqA1ss.js";const d="com.example.token-intro",y=`${d}.play`,u=`${d}/cinematic`;let l="PLAYER",n={videoUrl:"",sourceMode:"auto",duration:0};const h=document.querySelector("#app");h.innerHTML=`
  <main class="shell">
    <header class="topbar">
      <div class="brand-mark" aria-hidden="true"><span></span></div>
      <div class="brand-copy">
        <h1>Scene</h1>
        <p>Room-wide video playback</p>
      </div>
      <span id="role" class="role">CONNECTING</span>
    </header>

    <section id="gmPanel" class="panel hidden">
      <div class="section-heading">
        <div>
          <h2>Video source</h2>
          <p>Paste a public video link. Playback starts automatically for connected players.</p>
        </div>
      </div>

      <label for="videoUrl">Video link</label>
      <input id="videoUrl" type="url" inputmode="url" placeholder="https://…" autocomplete="url" spellcheck="false" />

      <div class="source-row">
        <div class="source-field">
          <label for="sourceMode">Link type</label>
          <select id="sourceMode">
            <option value="auto">Auto detect</option>
            <option value="file">Direct video file</option>
            <option value="embed">Embedded player link</option>
          </select>
        </div>
        <p class="hint source-help">Use a public MP4, WebM, or OGG file link, or a provider's embed/player link.</p>
      </div>

      <div class="preview-heading"><span>Preview</span><span id="providerLabel">No video loaded</span></div>
      <div class="video-preview" id="videoPreview">
        <div class="preview-placeholder">
          <div class="preview-icon">▶</div>
          <b>Video preview</b>
          <small>Paste a link, then select Preview</small>
        </div>
      </div>
      <button id="preview" class="button button-secondary preview-button" type="button">Preview video</button>

      <div class="duration-row">
        <label for="duration">Auto-close after</label>
        <div class="number-wrap"><input id="duration" type="number" min="0" max="3600" value="0" /><span>sec</span></div>
      </div>
      <p class="hint">Set to 0 to keep the video open until it ends or you stop it.</p>

      <div class="button-row">
        <button id="save" class="button button-secondary" type="button">Save</button>
        <button id="play" class="button button-primary" type="button"><span aria-hidden="true">▶</span> Play for everyone</button>
      </div>
      <button id="stop" class="button button-stop" type="button">Stop for everyone</button>
      <div id="status" class="status" role="status" aria-live="polite">Paste a public video link to get started.</div>
      <div class="footer-note">Local files must be hosted online first. Room players need a link they can access.</div>
    </section>

    <section id="playerPanel" class="panel hidden">
      <div class="player-ready">
        <div class="ready-icon"><span></span></div>
        <p class="eyebrow">READY</p>
        <h2>Waiting for the Game Master</h2>
        <p class="ready-copy">The video will open automatically when the Game Master starts playback.</p>
      </div>
    </section>
  </main>
`;document.querySelector("#boot")?.remove();const a=e=>document.getElementById(e);function s(e,o=!1){const t=a("status");t.textContent=e,t.classList.toggle("error",o)}function p(){const e=Math.max(0,Math.min(3600,Number.parseInt(a("duration").value||"0",10)||0));return{videoUrl:a("videoUrl").value.trim(),sourceMode:a("sourceMode").value,duration:e}}function w(){a("videoPreview").innerHTML=`
    <div class="preview-placeholder">
      <div class="preview-icon">▶</div>
      <b>Video preview</b>
      <small>Paste a link, then select Preview</small>
    </div>`,a("providerLabel").textContent="No video loaded"}function m(e={}){if(n={videoUrl:String(e.videoUrl||""),sourceMode:["auto","file","embed"].includes(e.sourceMode)?e.sourceMode:"auto",duration:Math.max(0,Math.min(3600,Number(e.duration)||0))},a("videoUrl").value=n.videoUrl,a("sourceMode").value=n.sourceMode,a("duration").value=String(n.duration),w(),n.videoUrl)try{const o=c(n.videoUrl,n.sourceMode);a("providerLabel").textContent=o.provider}catch{}}async function f(){const o=(await r.scene.getMetadata())?.[d]||{};if(o.video&&typeof o.video=="object"){m(o.video);return}const i=Object.values(o.scripts||{}).find(b=>b?.videoUrl);i&&(m(i),await v(n),s("Previous saved video settings were imported."))}async function v(e){const o=await r.scene.getMetadata();await r.scene.setMetadata({[d]:{...o?.[d]||{},video:e}}),n={...e}}async function M(e){const o=new URL("/cinema.html",window.location.origin);o.searchParams.set("intro",JSON.stringify(e));try{await r.modal.close(u)}catch{}await r.modal.open({id:u,url:o.toString(),fullScreen:!0,hideBackdrop:!1,hidePaper:!0})}async function g(){try{await r.modal.close(u)}catch{}}function P(){let e;try{const t=p();e=c(t.videoUrl,t.sourceMode)}catch(t){s(t.message,!0);return}const o=a("videoPreview");if(o.innerHTML="",a("providerLabel").textContent=e.provider,e.kind==="embed"){const t=document.createElement("iframe"),i=new URL(e.src);i.searchParams.set("autoplay","0"),i.searchParams.set("mute","1"),i.searchParams.set("muted","1"),t.src=i.toString(),t.title=`${e.provider} preview`,t.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen",t.allowFullscreen=!0,t.referrerPolicy="strict-origin-when-cross-origin",o.append(t)}else{const t=document.createElement("video");t.src=e.src,t.controls=!0,t.muted=!0,t.playsInline=!0,t.preload="metadata",t.addEventListener("error",()=>s("Preview could not be loaded. Check that the link is public and points directly to a video file.",!0),{once:!0}),o.append(t)}s(`Preview loaded · ${e.provider}`)}a("preview").addEventListener("click",P);a("save").addEventListener("click",async()=>{const e=p();try{c(e.videoUrl,e.sourceMode),await v(e),s("Video settings saved to this scene.")}catch(o){s(o.message||"Could not save video settings.",!0)}});a("play").addEventListener("click",async()=>{const e=p();let o;try{o=c(e.videoUrl,e.sourceMode)}catch(i){s(i.message,!0);return}const t={type:"PLAY_INTRO_VIDEO",videoUrl:e.videoUrl,sourceMode:e.sourceMode,videoKind:o.kind,provider:o.provider,duration:e.duration,sentAt:Date.now()};try{if(await v(e),await M(t),!r.broadcast||typeof r.broadcast.sendMessage!="function")throw new Error("Broadcast API is unavailable. Check the Owlbear SDK installation.");await r.broadcast.sendMessage(y,t,{destination:"REMOTE"}),s("Playback started locally and sent to connected players.")}catch(i){console.error("Scene playback failed:",i),s(`Could not start playback: ${i?.message||"Check the console for details."}`,!0)}});a("stop").addEventListener("click",async()=>{try{await r.broadcast.sendMessage(y,{type:"STOP_INTRO_VIDEO",sentAt:Date.now()},{destination:"REMOTE"}),await g(),s("Stop command sent to everyone.")}catch(e){console.error("Scene stop failed:",e),s("Could not stop playback for everyone.",!0)}});r.onReady(async()=>{try{l=await r.player.getRole(),a("role").textContent=l==="GM"?"GAME MASTER":"PLAYER",l==="GM"?(a("gmPanel").classList.remove("hidden"),await f()):a("playerPanel").classList.remove("hidden")}catch(e){console.error("Scene initialization failed:",e),a("role").textContent="OFFLINE",l==="GM"?a("gmPanel").classList.remove("hidden"):a("playerPanel").classList.remove("hidden")}});
