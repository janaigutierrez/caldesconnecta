export type Tab = "negocis" | "productes" | "mapa";
export type Categoria = "Tots" | "Restauració" | "Comerç" | "Serveis" | "Artesania";

export interface Negoci {
  id: number;
  nom: string;
  categoria: Exclude<Categoria, "Tots">;
  descripcio: string;
  web: string | null;
  telefon: string | null;
  horaris: string | null;
  adreca: string;
  imatge: string;
  lat: number;
  lng: number;
  tags: string[];
}
