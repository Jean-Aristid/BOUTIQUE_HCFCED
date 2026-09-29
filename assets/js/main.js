const market = marketplace();
const selectedShop = new URLSearchParams(location.search).get('boutique') || '';
const selectedSeller = market.sellers.find(s => s.id === selectedShop || s.name === selectedShop);
let active = 'all';
let cart = [];
const $ = selector => document.querySelector(selector);
const shopUrl = seller => 'index.html?boutique=' + encodeURIComponent(seller.id) + '#catalogue';
const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const sellerFor = p => market.sellers.find(s => s.id === p.sellerId);
const priceLabel = p => p.price === null ? 'Sur devis' : euro(p.price) + (p.unit ? ' / ' + p.unit : '');
const badge = s => s.local ? 'Votre aperçu local' : (s.membership === 'member' ? 'Membre du Haut Conseil · exemple' : 'Entrepreneure indépendante · exemple');
function logo(s) {
  // Logos locaux validés ou fichiers du dossier images livrés avec le site.
  const validLogo = /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(s.logo || '') || (/^assets\/images\/[a-zA-Z0-9_./ -]+\.(png|jpe?g|webp)$/.test(s.logo || '') && !s.logo.includes('..'));
  return validLogo
    ? `<img class="seller-logo" src="${escapeHTML(s.logo)}" alt="Logo de ${escapeHTML(s.name)}">`
    : `<span class="avatar" aria-label="Emplacement du logo">${escapeHTML(s.initials || s.name.slice(0,2).toUpperCase())}</span>`;
}
function setFilter(id) {
  active = id === 'Tous' ? 'all' : id;
  $('#category-select').value = active;
  const category = categoryById(active);
  $('#subcategory-select').innerHTML = '<option value="">Toutes les sous-catégories</option>' + (category?.items || []).map(x => `<option>${escapeHTML(x)}</option>`).join('');
  $('#subcategory-select').value = '';
  $('#subcategory-select').disabled = !category;
  renderProducts();
}
function filteredProducts() {
  const query = normalize($('#search').value);
  return market.products.filter(p => (!selectedShop || p.sellerId === selectedSeller?.id) && (active === 'all' || p.cat === active) && (!$('#subcategory-select').value || p.sub === $('#subcategory-select').value) && (!$('#type-select').value || p.type === $('#type-select').value) && normalize([p.name,sellerFor(p)?.name,p.sub,categoryById(p.cat)?.name].join(' ')).includes(query));
}
function renderProducts() {
  const products = filteredProducts();
  $('#products').innerHTML = products.map(p => `<article class="product"><div class="visual ${escapeHTML(p.v)}"><span>${escapeHTML(categoryById(p.cat)?.name)}</span></div><div class="product-info"><div class="seller"><a href="${escapeHTML(shopUrl(sellerFor(p)))}">${escapeHTML(sellerFor(p).name)}</a></div><h3>${escapeHTML(p.name)}</h3><p class="offer-meta">${p.type === 'service' ? 'Prestation' : 'Produit'} · ${escapeHTML(p.sub)}</p><div class="price-row"><span class="price">${escapeHTML(priceLabel(p))}</span></div><button class="offer-button" data-details="${escapeHTML(p.id)}">${p.type === 'service' ? 'Voir la prestation' : 'Voir le produit'} →</button>${p.type === 'product' ? `<button class="offer-button secondary" data-add="${escapeHTML(p.id)}">Ajouter au panier</button>` : ''}</div></article>`).join('');
  $('#empty').hidden = products.length > 0;
  $('#empty').style.display = products.length ? 'none' : 'block';
  $('#result-count').textContent = `${products.length} offre${products.length > 1 ? 's' : ''}`;
}
function addToCart(id) {
  const p = market.products.find(p => p.id === String(id));
  if (!p || p.type !== 'product' || p.price === null) return;
  cart.push(p);updateCart();showToast('Article ajouté au panier de démonstration');
}
function removeItem(index) {cart.splice(index,1);updateCart();}
function updateCart() {
  $('#count').textContent = cart.length;
  $('#cartList').innerHTML = cart.length ? market.sellers.filter(s => cart.some(p => p.sellerId === s.id)).map(s => `<section class="cart-group"><h3>${escapeHTML(s.name)}</h3>${cart.map((p,i) => p.sellerId !== s.id ? '' : `<div class="cart-item"><div><b>${escapeHTML(p.name)}</b><small>${escapeHTML(euro(p.price))}</small></div><button class="remove" data-remove="${i}" aria-label="Retirer ${escapeHTML(p.name)}">×</button></div>`).join('')}</section>`).join('') : '<p>Votre panier est vide.</p>';
  const cents = cart.reduce((sum,p) => sum + Math.round(p.price * 100),0);
  $('#cartTotal').innerHTML = cart.length ? `<div class="total-row"><span>Total hors livraison</span><span>${euro(cents/100)}</span></div><p>Panier de démonstration : aucune commande ni paiement. Les frais et conditions de livraison seront propres à chaque vendeuse.</p>` : '';
}
function toggleCart() {
  const dialog = $('#cart-dialog');
  if (dialog.open) dialog.close(); else dialog.showModal();
}
function showToast(text) {$('#toast').textContent = text;$('#toast').classList.add('show');setTimeout(() => $('#toast').classList.remove('show'),2500);}
function openDetails(id) {
  const p = market.products.find(p => p.id === id); if (!p) return;
  const seller = sellerFor(p);
  $('#detail-content').innerHTML = `<p class="eyebrow">${p.type === 'service' ? 'Prestation' : 'Produit'}</p><h2 id="detail-title">${escapeHTML(p.name)}</h2><a class="shop-link" href="${escapeHTML(shopUrl(seller))}">${escapeHTML(seller.name)}</a><p>${escapeHTML(p.description)}</p><p><strong>${escapeHTML(priceLabel(p))}</strong></p><p>${p.type === 'service' ? 'Modalités, disponibilité et devis à confirmer avec la prestataire. Aucune réservation n’est effectuée ici.' : 'Livraison en France : ' + escapeHTML(seller.deliveryFrance) + '<br>International : ' + escapeHTML(seller.deliveryInternational)}</p>${p.type === 'service' ? '<label for="request-text">Préparer votre demande (aucun envoi)</label><textarea id="request-text" rows="4" placeholder="Décrivez votre besoin, les dates et le lieu souhaités."></textarea><button class="offer-button" id="download-request">Télécharger ma demande</button><p>Ce document reste sur votre appareil. Il ne sera pas envoyé à la prestataire.</p>' : `<button class="offer-button" data-add="${escapeHTML(p.id)}">Ajouter au panier de démonstration</button>`}`;
  $('#detail-dialog').showModal();
  if (p.type === 'service') $('#download-request').onclick = () => downloadText(`Demande pour ${p.name}\nPrestataire : ${seller.name}\n\n${$('#request-text').value}`, 'demande-prestation.txt');
}
function downloadText(text,name) {
  const url = URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
  const a = document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(() => URL.revokeObjectURL(url),1000);
}
function renderProfile() {
  if (!selectedShop) return;
  if (!selectedSeller) {$('#shop-status').textContent='Boutique introuvable. Choisissez une entrepreneure dans la liste.';return;}
  const s=selectedSeller;
  document.title = s.name + ' — Boutique HCFCED';
  $('.hero h1').textContent=s.name;
  $('.hero p').textContent=s.description;
  const website=safeUrl(s.website);
  $('#seller-profile').hidden=false;
  $('#seller-profile').innerHTML=`<div class="profile-heading">${logo(s)}<div><p class="eyebrow">${badge(s)}</p><h2>${escapeHTML(s.name)}</h2><p>${escapeHTML(s.description)}</p></div></div><div class="profile-grid"><div><h3>Coordonnées</h3><p>${escapeHTML(s.email || 'E-mail à renseigner')}<br>${escapeHTML(s.phone || 'Téléphone à renseigner')}</p>${website ? `<a class="shop-link" href="${escapeHTML(website)}" target="_blank" rel="noopener noreferrer">Site professionnel ↗</a>` : ''}</div><div><h3>Livraison en France</h3><p>${escapeHTML(s.deliveryFrance)}</p><h3>Livraison internationale</h3><p>${escapeHTML(s.deliveryInternational)}</p></div><div><h3>Avis des clientes</h3><p>Aucun avis publié pour cette boutique. Les avis vérifiés seront disponibles après l’activation des commandes.</p></div></div>`;
}
$('#category-grid').innerHTML=catalogCategories.map(c => `<details class="category-card"><summary><span>${c.icon}</span><h3>${escapeHTML(c.name)}</h3><small>${c.items.length} sous-catégories</small></summary><button data-category="${c.id}">Tout explorer →</button><ul>${c.items.map((x,i) => `<li><button data-category="${c.id}" data-sub="${i}">${escapeHTML(x)}</button></li>`).join('')}</ul></details>`).join('');
$('#category-select').innerHTML='<option value="all">Toutes les catégories</option>'+catalogCategories.map(c=>`<option value="${c.id}">${escapeHTML(c.name)}</option>`).join('');
$('#shop-select').innerHTML='<option value="">Toutes les boutiques</option>'+market.sellers.map(s=>`<option value="${s.id}">${escapeHTML(s.name)}</option>`).join('');
if(selectedSeller) $('#shop-select').value=selectedSeller.id;
$('#shop-select').addEventListener('change',()=>{location.href=$('#shop-select').value ? shopUrl(market.sellers.find(s=>s.id===$('#shop-select').value)) : 'index.html#catalogue';});
$('#category-select').addEventListener('change',()=>setFilter($('#category-select').value));
$('#subcategory-select').addEventListener('change',renderProducts);
$('#type-select').addEventListener('change',renderProducts);
$('#reset-filters').addEventListener('click',()=>{$('#search').value='';$('#type-select').value='';setFilter('all');});
$('#seller-list').innerHTML=market.sellers.map(s=>`<article class="seller-card">${logo(s)}<div><small>${badge(s)}</small><h3>${escapeHTML(s.name)}</h3><p>${escapeHTML(s.description)}</p><a class="shop-link" href="${escapeHTML(shopUrl(s))}">Voir sa boutique →</a></div></article>`).join('');
document.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.dataset.category){setFilter(button.dataset.category);if(button.dataset.sub!==undefined){$('#subcategory-select').value=categoryById(active).items[Number(button.dataset.sub)];renderProducts();}location.hash='catalogue';}
  if(button.dataset.add)addToCart(button.dataset.add);
  if(button.dataset.details)openDetails(button.dataset.details);
  if(button.dataset.remove!==undefined)removeItem(Number(button.dataset.remove));
  if(button.dataset.close)$(button.dataset.close).close();
});
renderProfile();setFilter('all');updateCart();
