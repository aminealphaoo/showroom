/**
 * Interface TypeScript décrivant une voiture du showroom.
 * Les noms des propriétés suivent le fichier de données fourni (auto-list.txt).
 */
export interface Auto {
  id: number;
  /** Marque (ex. « BMW ») */
  brand: string;
  /** Modèle (ex. « IX ») */
  model: string;
  /** Prix en milliers de DNT (ex. 230 = 230 000 DNT) */
  price: number;
  /** Puissance fiscale en CV */
  power: number;
  /** Nom du fichier image situé dans public/photos */
  photo: string;
  /** Nombre d'unités disponibles */
  availability: number;
  /** Texte descriptif du modèle */
  description: string;
}
