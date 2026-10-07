// Référentiel unique utilisé par le catalogue et l'espace vendeuse.
const catalogCategories = [
  {id:'mode',name:'Mode et création africaine',icon:'✦',items:['Robes, ensembles et tenues traditionnelles','Wax, bazin et tissus africains','Costumes et chemises','Sacs, chaussures et accessoires','Lingerie et vêtements de nuit','Mode pour enfants']},
  {id:'beaute',name:'Beauté et bien-être',icon:'◉',items:['Produits capillaires','Perruques, mèches et extensions','Soins naturels pour la peau','Savons, huiles et crèmes','Parfums et maquillage','Produits de massage et de relaxation']},
  {id:'bijoux',name:'Bijoux et accessoires',icon:'◇',items:['Bijoux africains et artisanaux','Montres','Foulards et turbans','Ceintures','Lunettes','Accessoires de cérémonie']},
  {id:'alimentation',name:'Alimentation et produits du terroir',icon:'◌',items:['Épices et condiments','Produits bio','Café, thé et chocolat','Produits africains emballés','Pâtisseries et confiseries','Paniers gourmands']},
  {id:'boissons',name:'Boissons',icon:'◒',items:['Boissons naturelles']},
  {id:'traiteur',name:'Gastronomie et traiteur',icon:'♧',items:['Services de traiteur']},
  {id:'maison',name:'Maison et décoration',icon:'⌂',items:['Objets décoratifs','Bougies parfumées','Linge de maison','Vaisselle et arts de la table','Paniers et objets artisanaux','Tableaux et œuvres d’art','Décorations pour événements']},
  {id:'mariage',name:'Mariage et événementiel',icon:'♡',items:['Robes de mariée et tenues de cérémonie','Accessoires de mariage','Faire-part personnalisés','Cadeaux pour les invités','Dragées et coffrets','Décorations de table','Services de traiteurs, décoratrices, photographes, DJ et wedding planners']},
  {id:'enfants',name:'Produits pour bébés et enfants',icon:'☀',items:['Vêtements','Jouets éducatifs','Produits de soin','Accessoires scolaires','Livres et supports pédagogiques','Coffrets de naissance']},
  {id:'culture',name:'Livres et produits culturels',icon:'▤',items:['Livres d’entrepreneuriat','Livres sur le leadership féminin','Romans et ouvrages africains','Livres pour enfants','Supports de formation','Produits mettant en valeur l’histoire et les cultures africaines']},
  {id:'cadeaux',name:'Cadeaux personnalisés',icon:'☆',items:['Tasses et gourdes','T-shirts','Sacs personnalisés','Agendas et carnets','Coffrets cadeaux','Objets personnalisés pour entreprises']},
  {id:'services',name:'Services professionnels',icon:'↗',items:['Coaching et accompagnement entrepreneurial','Formations professionnelles','Communication et marketing','Création de sites Internet','Comptabilité et gestion','Conseils juridiques','Organisation d’événements','Tourisme et voyages','Import-export et livraison']}
];
