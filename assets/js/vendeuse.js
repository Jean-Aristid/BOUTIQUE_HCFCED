const $ = selector => document.querySelector(selector);
let workspace = readWorkspace();
let draftLogo = workspace?.profile.logo || '';
let draftPhoto = '';
let selectedActivity = workspace?.profile.category || '';
function refreshPhoto(){ $('#photo-preview').hidden=!draftPhoto; $('#photo-preview').src=draftPhoto; }
function chooseActivity(id){
 if(!categoryById(id))return; selectedActivity=id;
 $('#selected-activity').textContent='Votre activité : '+categoryById(id).name;
 $('#offer-category').value=id;refreshSubcategories();
}
$('#seller-categories').innerHTML=catalogCategories.map(c=>`<button type="button" class="activity-choice" data-activity="${c.id}"><span>${c.icon}</span><strong>${escapeHTML(c.name)}</strong><small>${escapeHTML(c.items.join(' · '))}</small></button>`).join('');
$('#seller-categories').addEventListener('click',event=>{const button=event.target.closest('[data-activity]');if(button){chooseActivity(button.dataset.activity);location.hash='inscription';}});
$('#offer-photo').addEventListener('change',event=>{
 const file=event.target.files[0];if(!file)return;
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>500*1024){status('Choisissez une photo JPEG, PNG ou WebP de moins de 500 Ko.');event.target.value='';return;}
 const reader=new FileReader();reader.onload=()=>{draftPhoto=reader.result;refreshPhoto();status('Photo chargée. Enregistrez l’offre pour la conserver.');};reader.onerror=()=>status('Impossible de lire la photo.');reader.readAsDataURL(file);
});
$('#remove-photo').addEventListener('click',()=>{draftPhoto='';$('#offer-photo').value='';refreshPhoto();});
const profileForm = $('#profile-form');
const offerForm = $('#offer-form');
const fields = ['name','membership','description','email','phone','website','deliveryFrance','deliveryInternational'];
function status(message) {$('#workspace-status').textContent=message;}
function refreshLogo() {$('#logo-preview').hidden=!draftLogo;$('#logo-preview').src=draftLogo || '';}
function refreshSubcategories() {$('#offer-subcategory').innerHTML=categoryById($('#offer-category').value).items.map(x=>`<option>${escapeHTML(x)}</option>`).join('');}
function newOffer() {offerForm.reset();offerForm.elements.id.value='';draftPhoto='';refreshPhoto();if(selectedActivity)$('#offer-category').value=selectedActivity;refreshSubcategories();offerForm.elements.price.required=true;}
function renderOwnOffers() {
  $('#preview-link').hidden=!workspace;
  $('#own-offers').innerHTML=workspace?.products.length ? workspace.products.map(p=>`<article class="saved-offer"><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(categoryById(p.cat).name)} · ${escapeHTML(p.sub)} · ${p.price===null?'Sur devis':euro(p.price)}</p><button type="button" class="filter" data-edit="${escapeHTML(p.id)}">Modifier</button><button type="button" class="danger" data-delete="${escapeHTML(p.id)}">Supprimer</button></article>`).join('') : '<p>Aucune offre enregistrée dans ce navigateur.</p>';
}
if(workspace)fields.forEach(name=>{profileForm.elements[name].value=workspace.profile[name] || '';});
refreshLogo();
$('#offer-category').innerHTML=catalogCategories.map(c=>`<option value="${c.id}">${escapeHTML(c.name)}</option>`).join('');
refreshSubcategories();renderOwnOffers();if(selectedActivity)chooseActivity(selectedActivity);
$('#offer-category').addEventListener('change',refreshSubcategories);
offerForm.elements.type.addEventListener('change',()=>{offerForm.elements.price.required=offerForm.elements.type.value==='product';});
$('#logo-file').addEventListener('change',async event=>{
  const file=event.target.files[0];if(!file)return;
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>500*1024){status('Choisissez une image JPEG, PNG ou WebP de moins de 500 Ko.');event.target.value='';return;}
  const reader=new FileReader();reader.onload=()=>{draftLogo=reader.result;refreshLogo();status('Logo chargé. Enregistrez votre brouillon pour le conserver.');};reader.onerror=()=>status('Impossible de lire cette image.');reader.readAsDataURL(file);
});
$('#remove-logo').addEventListener('click',()=>{draftLogo='';$('#logo-file').value='';refreshLogo();});
profileForm.addEventListener('submit',event=>{
  event.preventDefault();const profile={};fields.forEach(name=>{profile[name]=profileForm.elements[name].value.trim();});
  if(!profile.name || !profile.description){status('Renseignez un nom et une présentation.');return;}
  if(profile.website && !safeUrl(profile.website)){status('Le site doit commencer par http:// ou https://.');return;}
  if(!selectedActivity){status('Choisissez d’abord votre catégorie d’activité.');location.hash='activites';return;}
  profile.category=selectedActivity;profile.logo=draftLogo;profile.deliveryFrance ||= 'Conditions non renseignées.';profile.deliveryInternational ||= 'Conditions non renseignées.';
  const next={profile,products:workspace?.products || []};
  if(!saveWorkspace(next)){status('Enregistrement impossible : le stockage du navigateur est indisponible ou plein.');return;}
  workspace=next;renderOwnOffers();status('Brouillon enregistré sur cet appareil. Aucune publication ni inscription n’a été envoyée.');
});
offerForm.addEventListener('submit',event=>{
  event.preventDefault();if(!workspace){status('Enregistrez d’abord votre entreprise.');return;}
  const p={};for(const name of ['name','type','cat','sub','description','unit'])p[name]=offerForm.elements[name].value.trim();
  const amount=offerForm.elements.price.value;p.price=amount===''?null:Number(amount);
  if(!p.name||!p.description||!categoryById(p.cat)?.items.includes(p.sub)||(p.type==='product'&&p.price===null)||(p.price!==null&&(!Number.isFinite(p.price)||p.price<0||p.price>1000000))){status('Vérifiez les informations et le prix de votre offre.');return;}
  p.photo=draftPhoto;
  p.id=offerForm.elements.id.value || 'local-'+crypto.randomUUID();
  const next={...workspace,products:[...workspace.products.filter(x=>x.id!==p.id),p]};
  if(!saveWorkspace(next)){status('L’offre n’a pas pu être enregistrée dans ce navigateur.');return;}
  workspace=next;newOffer();renderOwnOffers();status('Offre enregistrée dans votre mini-boutique locale.');
});
$('#cancel-edit').addEventListener('click',newOffer);
$('#own-offers').addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.dataset.edit){const p=workspace.products.find(x=>x.id===button.dataset.edit);draftPhoto=p.photo||'';refreshPhoto();for(const key of ['id','name','type','cat','description','unit'])offerForm.elements[key].value=p[key] || '';refreshSubcategories();offerForm.elements.sub.value=p.sub;offerForm.elements.price.value=p.price??'';offerForm.elements.price.required=p.type==='product';offerForm.elements.name.focus();}
  if(button.dataset.delete && confirm('Supprimer cette offre de votre brouillon local ?')){const next={...workspace,products:workspace.products.filter(x=>x.id!==button.dataset.delete)};if(saveWorkspace(next)){workspace=next;newOffer();renderOwnOffers();status('Offre supprimée du brouillon.');}else status('Suppression non enregistrée : stockage indisponible.');}
});
$('#export-workspace').addEventListener('click',()=>{
  if(!workspace){status('Enregistrez d’abord votre brouillon.');return;}
  const url=URL.createObjectURL(new Blob([JSON.stringify(workspace,null,2)],{type:'application/json'}));
  const a=document.createElement('a');a.href=url;a.download='ma-boutique-brouillon.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status('Export téléchargé. Aucune donnée transmise à la plateforme.');
});
