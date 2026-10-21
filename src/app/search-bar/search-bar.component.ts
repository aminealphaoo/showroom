import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auto } from '../auto';
import { AutoListComponent } from '../auto-list/auto-list.component';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule, AutoListComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  /** Parent → enfant : liste reçue depuis AppComponent grâce à [autos]="autoList". */
  @Input() autos: Auto[] = [];

  /** Enfant → parent : émet la voiture choisie vers AppComponent. */
  @Output() selectAutoEvent = new EventEmitter<Auto>();

  /** Texte saisi dans la zone de recherche. */
  brand = '';

  /** Résultat de la dernière recherche. */
  results: Auto[] = [];

  /** Marque effectivement recherchée (affichée dans les messages). */
  searchedBrand = '';

  /** Vrai après la première recherche valide. */
  hasSearched = false;

  /** Vrai si l'utilisateur a lancé une recherche avec un champ vide. */
  emptyInput = false;

  /** Recherche par marque : insensible à la casse, aux espaces et aux accents. */
  searchAutoList(): void {
    const query = this.normalize(this.brand);

    if (query === '') {
      this.emptyInput = true;
      this.hasSearched = false;
      this.results = [];
      return;
    }

    this.emptyInput = false;
    this.hasSearched = true;
    this.searchedBrand = this.brand.trim();
    this.results = this.autos.filter((auto) =>
      this.normalize(auto.brand).includes(query)
    );
  }

  /** Reçoit la voiture cliquée (bouton View) et l'émet vers le parent. */
  selectedAuto(auto: Auto): void {
    this.selectAutoEvent.emit(auto);
  }

  /** Minuscules, sans accents, sans espaces ni tirets : « Mercedes-Benz » ≈ « mercedes benz ». */
  private normalize(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  }
}
