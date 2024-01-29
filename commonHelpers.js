import{S as l,i as u}from"./assets/vendor-5b791d57.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const p="https://pixabay.com/api",f="42057283-adafa6fc2ce046555d94b0faa";let c=document.querySelector(".loading");const a={form:document.querySelector(".form"),input:document.querySelector(".form-input"),gallery:document.querySelector(".gallery"),resultContainer:document.querySelector(".resultContainer"),searchBtn:document.querySelector(".search-button")};function d(n){u.show({position:"topLeft",message:n,backgroundColor:"#EF4040",messageColor:"#FAFAFB",messageSize:"16px",close:!1,closeOnClick:!0,closeOnEscape:!0})}const h=new l(".gallery-item a",{captionsData:"alt",captionDelay:250});a.form.addEventListener("submit",y);function m(){setTimeout(()=>{c.classList.add("is-hidden")},500)}function g(){c.classList.remove("is-hidden")}function y(n){n.preventDefault(),a.resultContainer.innerHTML="";const t=n.currentTarget,o=t.elements.input.value.trim();if(g(),!o){d("Please enter a search term");return}b(o).then(i=>{const s=i.hits.map(r=>v(r)).join(" ");a.resultContainer.innerHTML=s,h.refresh()}).finally(()=>t.reset()).finally(m())}function b(n){return fetch(`${p}/?key=${f}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true`).then(t=>{if(!t.ok){createMessage("The search field can't be empty! Please, enter your request!");return}return t.json()})}function v({webformatURL:n,largeImageURL:t,tags:o,likes:i,views:e,comments:s,downloads:r}){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${t}">
      <img
        class="gallery-image"
        src="${n}"
        alt="${o}"
      />
        <p class="gallery-descr">
        <span class="cont-in-p">
        <svg
        width="20"
        height="20"
        class="icon-in-block">
        <use href="./icons.svg#icon-heart"></use>
        </svg>
        <span class="descr-span">${i}</span> 
        </span>
        <span class="cont-in-p">
        <svg
        width="20"
        height="20"
        class="icon-in-block">
        <use href="./icons.svg#icon-eye"></use>
        </svg>
        <span class="descr-span">${e}</span> 
        </span>
        <span class="cont-in-p">
        <svg
        width="20"
        height="20"
        class="icon-in-block">
        <use href="./icons.svg#icon-bubble2"></use>
        </svg>
        <span class="descr-span">${s}</span> 
        </span>
        <span class="cont-in-p">
        <svg
        width="20"
        height="20"
        class="icon-in-block">
        <use href="./icons.svg#icon-arrow-down"></use>
        </svg>
        <span class="descr-span">${r}</span>
        </span>
        </p>
      </a>
    </li>`}
//# sourceMappingURL=commonHelpers.js.map
