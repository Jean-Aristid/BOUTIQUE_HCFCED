const sellers = [...new Set(data.map(p => p.seller))];
    const selectedShop = new URLSearchParams(location.search).get('boutique') || '';
    const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const shopUrl = seller => 'index.html?boutique=' + encodeURIComponent(seller) + '#catalogue';
    const select = document.querySelector('#shop-select');
    select.add(new Option('Toutes les boutiques', ''));
    sellers.forEach(seller => select.add(new Option(seller, seller)));
    if (selectedShop && !sellers.includes(selectedShop)) {
      select.add(new Option('Boutique introuvable', selectedShop));
      document.querySelector('#shop-status').textContent = 'Cette boutique est introuvable. Choisissez une boutique dans la liste.';
    }
    select.value = selectedShop;
    select.addEventListener('change', () => { location.href = select.value ? shopUrl(select.value) : 'index.html#catalogue'; });
    if (selectedShop && sellers.includes(selectedShop)) {
      document.title = selectedShop + ' — Boutique HCFCED';
      document.querySelector('.hero h1').textContent = selectedShop;
      document.querySelector('.hero p').textContent = 'Découvrez les créations de cette boutique de démonstration du réseau HCFCED.';
      document.querySelector('#catalogue h2').textContent = 'Les créations de ' + selectedShop;
    }
    document.querySelector('#seller-list').innerHTML = sellers.map(seller => `<article class="seller-card"><div class="avatar" aria-hidden="true">${escapeHTML(seller.slice(0, 2).toUpperCase())}</div><div><h3>${escapeHTML(seller)}</h3><p>Boutique de démonstration · ${escapeHTML([...new Set(data.filter(p => p.seller === seller).map(p => p.cat))].join(', '))}</p><a class="shop-link" href="${escapeHTML(shopUrl(seller))}">Voir sa boutique →</a></div></article>`).join('');
    const categories=['Tous','Mode','Beauté','Bijoux','Maison','Gastronomie'];let active='Tous';let cart=[];
    function euro(n){return n.toLocaleString('fr-FR',{style:'currency',currency:'EUR'})}
    function renderFilters(){document.querySelector('#filters').innerHTML=categories.map(c=>`<button class="filter ${c===active?'active':''}" onclick="setFilter('${c}')">${c}</button>`).join('')}
    function setFilter(c){active=c;renderFilters();renderProducts()}
    function renderProducts(){const q=document.querySelector('#search').value.toLowerCase();const list=data.filter(p=>(!selectedShop||p.seller===selectedShop)&&(active==='Tous'||p.cat===active)&&(p.name+' '+p.seller).toLowerCase().includes(q));document.querySelector('#products').innerHTML=list.map(p=>`<article class="product"><div class="visual ${escapeHTML(p.v)}"><span>${escapeHTML(p.cat)}</span></div><div class="product-info"><div class="seller"><a href="${escapeHTML(shopUrl(p.seller))}">${escapeHTML(p.seller)}</a></div><h3>${escapeHTML(p.name)}</h3><div class="price-row"><span class="price">${euro(p.price)}</span><button class="add" onclick="addToCart(${p.id})" aria-label="Ajouter ${escapeHTML(p.name)} au panier">＋</button></div></div></article>`).join('');document.querySelector('#empty').style.display=list.length?'none':'block'}
    function addToCart(id){cart.push(data.find(p=>p.id===id));updateCart();showToast('Article ajouté au panier')}
    function removeItem(i){cart.splice(i,1);updateCart()}
    function updateCart(){document.querySelector('#count').textContent=cart.length;const list=document.querySelector('#cartList');list.innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><div><b>${escapeHTML(p.name)}</b><small>${escapeHTML(p.seller)}</small></div><span>${euro(p.price)}</span><button class="remove" onclick="removeItem(${i})" aria-label="Retirer">×</button></div>`).join(''):'<div class="cart-empty">Votre panier est encore vide.<br>Découvrez les créations de nos entrepreneures.</div>';const total=cart.reduce((s,p)=>s+p.price,0);document.querySelector('#cartTotal').innerHTML=cart.length?`<div class="total-row"><span>Total</span><span>${euro(total)}</span></div><button class="checkout" onclick="showToast('Le paiement sera activé dans la prochaine étape')">Panier de démonstration</button>`:''}
    function toggleCart(){document.querySelector('#cartBackdrop').classList.toggle('open')}
    function backdropClose(e){if(e.target.id==='cartBackdrop')toggleCart()}
    function showToast(t){const el=document.querySelector('#toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2300)}
    renderFilters();renderProducts();updateCart();
