// Exemples fictifs : remplacer par les contenus validés des entrepreneures.
// Logo facultatif : chemin d'image local au site ; coordonnées absentes tant qu'elles ne sont pas confirmées.
const sellerProfiles = [
  {id:'amina',name:'Amina Créations',initials:'AC',membership:'member',description:'Des silhouettes contemporaines inspirées des textiles africains.'},
  {id:'sira',name:'Karité de Sira',initials:'KS',membership:'external',description:'Des soins inspirés des rituels de beauté et des ingrédients naturels.'},
  {id:'kadi',name:'Maison Kadi',initials:'MK',membership:'member',description:'Textiles, couleurs et accessoires pour célébrer les savoir-faire africains.'},
  {id:'oria',name:'Atelier Oria',initials:'AO',membership:'external',description:'Des bijoux artisanaux et des pièces de caractère.'},
  {id:'nala',name:'Lumière de Nala',initials:'LN',membership:'member',description:'Des objets et des senteurs pour une maison chaleureuse.'},
  {id:'naya',name:'Naya Délices',initials:'ND',membership:'external',description:'Des saveurs artisanales et des recettes de transmission.'},
  {id:'celebrations',name:'Instants de Fête',initials:'IF',membership:'external',description:'Décoration et accompagnement des moments à célébrer.'},
  {id:'petits',name:'Les Petits Soleils',initials:'PS',membership:'member',description:'Des attentions pour les enfants et les nouveaux départs.'},
  {id:'plumes',name:'Plumes de la Diaspora',initials:'PD',membership:'external',description:'Des livres et des histoires pour apprendre et transmettre.'},
  {id:'empreinte',name:'Votre Empreinte',initials:'VE',membership:'member',description:'Des cadeaux personnalisés pour les particuliers et les entreprises.'},
  {id:'essor',name:'Essor Entrepreneures',initials:'EE',membership:'external',description:'Du coaching et des prestations pour accompagner les projets professionnels.'}
].map(s => ({...s,logo:'',email:'',phone:'',website:'',deliveryFrance:'Conditions et tarifs à confirmer avec la vendeuse.',deliveryInternational:'Destinations, délais et frais à confirmer avec la vendeuse.',reviews:[],demo:true}));

const data = [
  {id:'1',name:'Pochette Akwaba',sellerId:'amina',price:49,cat:'mode',sub:'Sacs, chaussures et accessoires',v:'v1'},
  {id:'2',name:'Baume karité & hibiscus',sellerId:'sira',price:24.9,cat:'beaute',sub:'Savons, huiles et crèmes',v:'v2'},
  {id:'3',name:'Étole en wax Naya',sellerId:'kadi',price:65,cat:'mode',sub:'Wax, bazin et tissus africains',v:'v3'},
  {id:'4',name:'Boucles Soleil d’Abidjan',sellerId:'oria',price:38,cat:'bijoux',sub:'Bijoux africains et artisanaux',v:'v4'},
  {id:'5',name:'Robe Émeraude',sellerId:'amina',price:119,cat:'mode',sub:'Robes, ensembles et tenues traditionnelles',v:'v5'},
  {id:'6',name:'Bougie fleur de coton',sellerId:'nala',price:29,cat:'maison',sub:'Bougies parfumées',v:'v6'},
  {id:'7',name:'Collier Héritage',sellerId:'oria',price:54,cat:'bijoux',sub:'Bijoux africains et artisanaux',v:'v7'},
  {id:'8',name:'Coffret de douceurs mangue-gingembre',sellerId:'naya',price:25,cat:'alimentation',sub:'Paniers gourmands',v:'v8'},
  {id:'9',name:'Décoration de table de mariage',sellerId:'celebrations',price:null,cat:'mariage',sub:'Services de traiteurs, décoratrices, photographes, DJ et wedding planners',v:'v6',type:'service'},
  {id:'10',name:'Coffret de naissance Soleil',sellerId:'petits',price:45,cat:'enfants',sub:'Coffrets de naissance',v:'v3'},
  {id:'11',name:'Carnet d’une entrepreneure',sellerId:'plumes',price:22,cat:'culture',sub:'Livres d’entrepreneuriat',v:'v1'},
  {id:'12',name:'Gourde personnalisée',sellerId:'empreinte',price:28,cat:'cadeaux',sub:'Tasses et gourdes',v:'v2'},
  {id:'13',name:'Accompagnement de votre projet',sellerId:'essor',price:90,cat:'services',sub:'Coaching et accompagnement entrepreneurial',v:'v4',type:'service',unit:'la séance'}
].map(p => ({type:'product',description:'Offre fictive pour présenter le fonctionnement de la plateforme. Le contenu et les conditions seront précisés par la vendeuse.',...p}));
