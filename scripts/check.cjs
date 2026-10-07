const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const base=['assets/data/categories.js','assets/data/catalogue.js','assets/js/marketplace.js'].map(read).join('\n');
function environment(search='',stored=null){
  const elements=new Map();let storage=stored;
  function element(){return {value:'',innerHTML:'',textContent:'',hidden:false,disabled:false,style:{},dataset:{},open:false,events:{},classList:{add(){},remove(){}},addEventListener(name,callback){this.events[name]=callback;},showModal(){this.open=true;},close(){this.open=false;},focus(){},click(){}};}
  const document={title:'',addEventListener(){},querySelector(selector){if(!elements.has(selector))elements.set(selector,element());return elements.get(selector);}};
  const context=vm.createContext({document,location:{search},URL,URLSearchParams,localStorage:{getItem:()=>storage,setItem:(key,value)=>{storage=value;}},setTimeout(){},crypto:{randomUUID:()=> 'unique-id'},confirm:()=>true});
  return {document,context,run:code=>vm.runInContext(code,context)};
}
const inspect=environment();inspect.run(base);
assert.equal(inspect.run('catalogCategories.length'),12);
assert.equal(inspect.run('catalogCategories.reduce((sum,c)=>sum+c.items.length,0)'),67);
assert.equal(inspect.run('new Set(data.map(p=>p.cat)).size'),10);
assert(inspect.run('data.every(p=>categoryById(p.cat).items.includes(p.sub)&&sellerProfiles.some(s=>s.id===p.sellerId))'));
assert(inspect.run('catalogCategories.every(c=>new Set(c.items).size===c.items.length)'));
assert.equal(inspect.run('safeUrl("javascript:alert(1)")'),'');
function shop(search='',stored=null){const env=environment(search,stored);env.run(base+'\n'+read('assets/js/main.js'));return env;}
const all=shop();assert.equal(all.run('filteredProducts().length'),13);
all.run("setFilter('alimentation')");assert.equal(all.run('filteredProducts().length'),1);
all.run("document.querySelector('#subcategory-select').value='Boissons naturelles';renderProducts()");assert.equal(all.run('filteredProducts().length'),0);
all.run("document.querySelector('#subcategory-select').value='';setFilter('all');document.querySelector('#type-select').value='service';renderProducts()");assert.equal(all.run('filteredProducts().length'),2);
const selected=shop('?boutique='+encodeURIComponent('Amina Créations'));
assert.equal(selected.run('filteredProducts().length'),2);
selected.run("document.querySelector('#search').value='emeraude';renderProducts()");assert.equal(selected.run('filteredProducts().length'),1);
selected.run("addToCart('5');addToCart('5');addToCart('13');addToCart('missing')");assert.equal(selected.run('cart.length'),2);
assert(selected.document.querySelector('#cartTotal').innerHTML.includes('238'));
selected.run('removeItem(0)');assert.equal(selected.run('cart.length'),1);
selected.run('toggleCart()');assert(selected.document.querySelector('#cart-dialog').open);
selected.run("openDetails('13')");assert(selected.document.querySelector('#detail-dialog').open);
assert(selected.document.querySelector('#detail-content').innerHTML.includes('aucun envoi'));
const unknown=shop('?boutique=absente');assert.equal(unknown.run('filteredProducts().length'),0);
assert(unknown.document.querySelector('#shop-status').textContent.includes('introuvable'));
assert.equal(shop('','{broken').run('market.products.length'),13);
// Exécuter les vrais formulaires : enregistrer une entreprise et une offre,
// puis recharger le catalogue avec le stockage obtenu.
const editor=environment();
const profile=editor.document.querySelector('#profile-form');
profile.elements={};for(const name of ['name','membership','description','email','phone','website','deliveryFrance','deliveryInternational'])profile.elements[name]={value:''};
Object.assign(profile.elements.name,{value:'Entreprise de test'});profile.elements.description.value='Une présentation';profile.elements.membership.value='external';
const form=editor.document.querySelector('#offer-form');form.elements={};
for(const name of ['id','name','type','cat','sub','description','price','unit'])form.elements[name]={value:'',addEventListener(){},focus(){}};
form.reset=()=>{};
editor.document.querySelector('#offer-category').value='mode';
editor.run(base+'\n'+read('assets/js/vendeuse.js'));
editor.run("chooseActivity('mode')");
profile.events.submit({preventDefault(){}});
assert.equal(editor.run('workspace.profile.membership'),'external');
for(const [key,value] of Object.entries({name:'Offre test',type:'product',cat:'mode',sub:'Sacs, chaussures et accessoires',description:'Description',price:'12.50'}))form.elements[key].value=value;
form.events.submit({preventDefault(){}});
assert.equal(editor.run('workspace.products.length'),1);
const stored=editor.run('JSON.stringify(workspace)');
const local=shop('?boutique=local',stored);assert.equal(local.run('filteredProducts().length'),1);
assert.equal(local.run('selectedSeller.name'),'Entreprise de test');
form.elements.id.value='local-unique-id';form.elements.price.value='19';form.events.submit({preventDefault(){}});
assert.equal(editor.run('workspace.products.length'),1);assert.equal(editor.run('workspace.products[0].price'),19);
editor.document.querySelector('#own-offers').events.click({target:{closest:()=>({dataset:{delete:'local-unique-id'}})}});
assert.equal(editor.run('workspace.products.length'),0);
// Vérifier les fichiers publics et l'indépendance du site.
for(const name of ['index.html','espace-vendeuse.html']){
  const html=read(name);assert(!html.includes('/SITE_HCFCED/'));
  for(const [,ref] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
    if(/^(https?:|data:|#)/.test(ref))continue;
    assert(fs.existsSync(path.join(root,ref.split(/[?#]/)[0])),`${name}: ${ref}`);
  }
}
console.log('OK: 12 catégories, 67 sous-catégories, filtres, vitrines, prestations, panier, création/modification/suppression locale et fichiers publics.');

assert(inspect.run("!categoryById('alimentation').items.includes('Boissons naturelles')"));
assert(inspect.run("categoryById('boissons').items.includes('Boissons naturelles')"));
assert.equal(inspect.run("safePhoto('javascript:alert(1)')"),'');
const legacy=JSON.stringify({profile:{name:'Ancienne boutique'},products:[{id:'old',name:'Jus',cat:'alimentation',sub:'Boissons naturelles',type:'product',price:5}]});
assert.equal(shop('?boutique=local',legacy).run('market.products.find(p=>p.id===\'old\').cat'),'boissons');
all.run("setFilter('boissons')");assert(all.document.querySelector('#seller-list').innerHTML.includes('Aucune boutique'));
all.run("setFilter('mode')");assert(all.document.querySelector('#seller-list').innerHTML.includes('Amina'));
editor.run("chooseActivity('boissons')");assert.equal(editor.document.querySelector('#offer-category').value,'boissons');
console.log('OK: migration des boissons, catégories communes, sélection d’activité et sécurité des images.');
