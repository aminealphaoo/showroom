import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auto } from '../auto';

@Component({
  selector: 'app-auto-list',
  imports: [CommonModule],
  templateUrl: './auto-list.component.html',
  styleUrl: './auto-list.component.css'
})
export class AutoListComponent {
  /** Voitures à afficher (résultat de la recherche, transmis par search-bar). */
  @Input() autos: Auto[] = [];

  /** Émis quand l'utilisateur clique sur « View » ; search-bar le relaie vers AppComponent. */
  @Output() viewAuto = new EventEmitter<Auto>();

  view(auto: Auto): void {
    this.viewAuto.emit(auto);
  }

  /** Visuel de secours si la photo n'existe pas encore dans public/photos. */
  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (!img.src.endsWith('photos/placeholder.svg')) {
      img.src = 'photos/placeholder.svg';
    }
  }
}
