import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-auteur-liste',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Nécessaire si vous êtes en Standalone Components
  templateUrl: './auteur-liste.component.html',
  styleUrls: ['./auteur-liste.component.css']
})
export class AuteurListeComponent implements OnInit {
  auteurs: any[] = [];
  auteursFiltres: any[] = [];
  termeRecherche: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.chargerAuteurs();
  }

  // Récupère la liste depuis le Backend
  chargerAuteurs(): void {
    this.apiService.getAuteurs().subscribe({
      next: (data) => {
        this.auteurs = data;
        this.auteursFiltres = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des auteurs :', err);
      }
    });
  }
Filtrer(): void {
    // Si la barre est vide, on remet toute la liste
    if (!this.termeRecherche) {
      this.auteursFiltres = this.auteurs;
      return; // On arrête la fonction ici
    }

    const terme = this.termeRecherche.toLowerCase();

    // On filtre la liste
    this.auteursFiltres = this.auteurs.filter(auteur => {
      // On combine le prénom et le nom (s'ils existent) pour faire la recherche
      const prenom = auteur.prenom ? auteur.prenom.toLowerCase() : '';
      const nom = auteur.nom ? auteur.nom.toLowerCase() : '';
      const nomComplet = prenom + ' ' + nom;

      return nomComplet.includes(terme);
    });
  }

  // Supprime un auteur et met à jour la liste
  supprimerAuteur(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet auteur ?')) {
      this.apiService.deleteAuteur(id).subscribe({
        next: () => {
          this.chargerAuteurs(); 
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
        }
      });
    }
  }
}