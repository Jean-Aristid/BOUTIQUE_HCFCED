const STORAGE_KEY = 'BOUTIQUE_HCFCED.vendeuse.v1';
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const euro = value => Number(value).toLocaleString('fr-FR',{style:'currency',currency:'EUR'});
const categoryById = id => catalogCategories.find(c => c.id === id);
const safeUrl = value => {try {const u = new URL(value);return ['https:','http:'].includes(u.protocol) ? u.href : '';} catch {return '';}};
const safePhoto = value => /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(value || '') ? value : '';
function readWorkspace() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!value || !value.profile || typeof value.profile.name !== 'string' || !Array.isArray(value.products)) return null;
    value.products = value.products.map(p => p?.cat === 'alimentation' && p.sub === 'Boissons naturelles' ? {...p,cat:'boissons'} : p);
    value.products = value.products.filter(p => p && typeof p.id === 'string' && typeof p.name === 'string' && categoryById(p.cat)?.items.includes(p.sub) && ['product','service'].includes(p.type) && (p.price === null || (Number.isFinite(p.price) && p.price >= 0)));
    return value;
  } catch { return null; }
}
function saveWorkspace(value) {
  try {localStorage.setItem(STORAGE_KEY, JSON.stringify(value));return true;} catch {return false;}
}
function marketplace() {
  const local = readWorkspace();
  return {
    sellers: local ? [...sellerProfiles, {...local.profile,id:'local',local:true,reviews:[]}] : sellerProfiles,
    products: local ? [...data, ...local.products.map(p => ({...p,sellerId:'local',v:'v3',local:true}))] : data
  };
}
