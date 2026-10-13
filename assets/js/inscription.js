const form = document.querySelector('#registration-form');
const message = document.querySelector('#workspace-status');
let registration = readWorkspace();
const registrationFields = ['contactName','name','activity','phone','email','membership','description'];
if (registration) registrationFields.forEach(key => {
  form.elements[key].value = registration.profile[key] || (key === 'membership' ? 'external' : '');
});
// Une valeur locale « membre » ne constitue jamais une validation d'adhésion.
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const profile = {...registration?.profile};
  registrationFields.forEach(key => { profile[key] = form.elements[key].value.trim(); });
  if (['contactName','name','activity','phone','email'].some(key => !profile[key])) {
    message.textContent = 'Complétez votre identité, votre entreprise, votre activité et vos coordonnées.';
    return;
  }
  const next = {...registration, profile, products: registration?.products || []};
  if (!saveWorkspace(next)) {
    message.textContent = 'Le brouillon n’a pas pu être enregistré. Vérifiez le stockage de votre navigateur.';
    return;
  }
  registration = next;
  message.textContent = 'Brouillon enregistré sur cet appareil. Aucune inscription envoyée ni adhésion validée.';
  const adhesion = document.querySelector('#adhesion');
  adhesion.hidden = false;
  location.hash = 'adhesion';
  adhesion.focus();
});
document.querySelector('#export-workspace').addEventListener('click', () => {
  if (!registration) {message.textContent = 'Enregistrez d’abord vos informations.';return;}
  const url = URL.createObjectURL(new Blob([JSON.stringify(registration,null,2)], {type:'application/json'}));
  const link = document.createElement('a');
  link.href = url;link.download = 'mon-dossier-boutique.json';link.click();
  setTimeout(() => URL.revokeObjectURL(url),1000);
});
