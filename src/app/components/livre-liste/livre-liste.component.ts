import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livre-liste',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './livre-liste.component.html',
  styleUrl: './livre-liste.component.css'
})
export class LivreListeComponent implements OnInit {

  livres: any[] = [];
  messageSuppression: string = '';
  livresFiltres: any[] = [];
  termeRecherche: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getLivres().subscribe((data: any[]) => {
      this.livres = data;
      this.livresFiltres = data;
    });
  }

  Filtrer(): void {
    if (!this.termeRecherche) {
      this.livresFiltres = this.livres;
      return; 
    }

    const terme = this.termeRecherche.toLowerCase();

    this.livresFiltres = this.livres.filter(livre => {
      const titre = livre.titre ? livre.titre.toLowerCase() : '';
      
      // Sécurité : On vérifie si l'auteur est un objet (avec nom/prénom) ou juste un texte/ID
      let auteurStr = '';
      if (livre.auteur) {
        if (typeof livre.auteur === 'object') {
          const prenom = livre.auteur.prenom ? livre.auteur.prenom.toLowerCase() : '';
          const nom = livre.auteur.nom ? livre.auteur.nom.toLowerCase() : '';
          auteurStr = prenom + ' ' + nom;
        } else {
          auteurStr = String(livre.auteur).toLowerCase();
        }
      }

      const nomComplet = titre + ' ' + auteurStr;
      return nomComplet.includes(terme);
    });
  }

  supprimerLivre(id: string): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
      this.apiService.deleteLivre(id).subscribe({
        next: () => {
          // On retire le livre de la liste principale...
          this.livres = this.livres.filter(l => l._id !== id);
          
          // 👉 CORRECTION : ...ET on le retire aussi de la liste filtrée affichée à l'écran !
          this.livresFiltres = this.livresFiltres.filter(l => l._id !== id);
          
          this.messageSuppression = "Le livre a été supprimé avec succès !";
          setTimeout(() => {
            this.messageSuppression = '';
          }, 3000);
        },
        error: (erreur) => {
          console.error("Erreur lors de la suppression :", erreur);
          alert("Une erreur est survenue lors de la suppression.");
        }
      });
    }  
  }
}