(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-7",headers:{authorization:"9e423efd-ffc7-45e3-bdfa-06918c55be9f","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(){return fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t)},r=document.querySelector("#card-template").content.querySelector(".places__item");function o(n,o,a){var u=r.cloneNode(!0),i=u.querySelector(".card__image"),l=u.querySelector(".card__title"),s=u.querySelector(".card__delete-button"),d=u.querySelector(".card__like-count"),p=u.querySelector(".card__like-button");return s.addEventListener("click",(function(n){var r=n.target.closest(".card");(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)})(o).then((function(){return r.remove()})).catch((function(e){return console.log(e)}))})),p.addEventListener("click",(function(n){p.classList.toggle("card__like-button_is-active"),function(n,r,o){n.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}(r).then((function(e){return c(e.likes.length,o)})).catch((function(e){return console.log(e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(r).then((function(e){c(e.likes.length,o)})).catch((function(e){return console.log(e)}))}(p,o,d)})),i.addEventListener("click",a),i.src=n.link,l.textContent=n.name,i.alt=n.name,u}function c(e,t){e?(t.style.visible="visible",t.textContent=e):(t.style.visible="hidden",t.textContent="")}function a(e){e.classList.add("popup_is-opened"),e.querySelector(".popup__close").focus(),e.addEventListener("keydown",i),e.addEventListener("click",l)}function u(e){e.classList.remove("popup_is-opened"),e.removeEventListener("keydown",i),e.removeEventListener("click",l)}function i(e){"Escape"===e.key&&u(this)}function l(e){(e.target.classList.contains("popup__close")||e.target.classList.contains("popup"))&&u(this)}function s(e,t,n){var r=e.querySelector(".".concat(t.name,"-error"));t.classList.remove(n.inputErrorClass),r.textContent="",r.classList.remove(n.errorClass)}function d(e,t,n){var r;r=e,Array.from(r).some((function(e){return!e.validity.valid}))?(t.disabled=!0,t.classList.add(n.inactiveButtonClass)):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))}function p(e,t){var n=e.querySelectorAll(t.inputErrorClass),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){s(e,n,t)})),r.disabled=!0,r.classList.add(t.inactiveButtonClass)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}document.querySelectorAll(".popup").forEach((function(e){return e.classList.add("popup_is-animated")}));var _,y=document.querySelector(".places__list"),m=document.querySelector(".profile__add-button"),h=document.querySelector(".profile__edit-button"),v=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_edit"),b=document.querySelector('[name="new-place"]'),q=document.querySelector('[name="edit-profile"]'),g=document.querySelector(".popup_type_new-avatar"),E=document.querySelector('[name="edit-avatar"]'),L=document.querySelector(".profile__image"),k=document.querySelector(".profile__title"),C=document.querySelector(".profile__description"),A=q.querySelector(".popup__input_type_name"),x=q.querySelector(".popup__input_type_description"),w=b.querySelector(".popup__input_type_card-name"),U=b.querySelector(".popup__input_type_url"),j=E.querySelector(".popup__input_type_url"),O=document.querySelector(".popup_type_image"),T=document.querySelector(".popup__image"),B=document.querySelector(".popup__caption"),P={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function D(){n().then((function(e){k.textContent=e.name,C.textContent=e.about,A.value=k.textContent,x.value=C.textContent})).catch((function(e){return console.log(e)}))}function I(e){L.style.backgroundImage="url(".concat(e,")")}function M(e,t){t.textContent=e?"Cохранение...":"Сохранить"}function N(e){T.src=e.target.src,B.alt=e.target.alt,B.textContent=e.target.alt,a(O)}m.addEventListener("click",(function(){a(v)})),h.addEventListener("click",(function(){p(b,P),a(S)})),L.addEventListener("click",(function(){return a(g)})),b.addEventListener("submit",(function(n){var r,c;n.preventDefault(),M(!0,b.querySelector(".popup__button")),(r=w.value,c=U.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r,link:c})}).then(t)).then((function(e){y.prepend(o({name:e.name,link:e.link},e._id,N))})).catch((function(e){return console.log(e)})).finally((function(){return M(!1,b.querySelector(".popup__button"))})),u(v),p(b,P),b.reset()})),q.addEventListener("submit",(function(n){var r,o;n.preventDefault(),M(!0,q.querySelector(".popup__button")),(r=A.value,o=x.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t)).catch((function(e){return console.log(e)})).finally((function(){return M(!1,q.querySelector(".popup__button"))})),D(),u(S)})),E.addEventListener("submit",(function(n){var r;n.preventDefault(),(r=j.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){return I(e.avatar)})).catch((function(e){return console.log(e)})),u(g)})),Promise.all([n(),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=r[0],u=r[1];I(a.avatar),D(),u.forEach((function(e){var t=o(e,e._id,N);!function(e,t,n,r){c(e.likes.length,n),Array.from(e.likes).forEach((function(e){e._id===t&&r.classList.add("card__like-button_is-active")}))}(e,a._id,t.querySelector(".card__like-count"),t.querySelector(".card__like-button")),a._id!==e.owner._id&&t.querySelector(".card__delete-button").remove(),y.append(t)}))})).catch((function(e){return console.log(e)})),_=P,Array.from(document.querySelectorAll(_.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);d(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.name,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),d(n,r,t)}))}))}(e,_)}))})();