import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Router est pour la navigation
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auteur-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auteur-detail.component.html',
  styleUrls: ['./auteur-detail.component.css']
})
export class AuteurDetailComponent implements OnInit {
  
  // CORRECTION 1 : La variable 'auteur' doit être déclarée ici, au tout début de la classe
  auteur: any;

  constructor(
    private route: ActivatedRoute,
    // CORRECTION 2 : On utilise bien 'Router' avec un 'R' majuscule, et non RouterModule
    private router: Router, 
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.apiService.getAuteursById(id).subscribe({
        next: (data) => {
          this.auteur = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des détails :', err);
          alert(' Impossible de charger les détails de l\'auteur.');
          this.router.navigate(['/auteurs']);
        }
      });
    }
  }

  supprimerAuteur(): void {
    if (this.auteur && confirm('Êtes-vous sûr de vouloir supprimer cet auteur ? 🗑️')) {
      this.apiService.deleteAuteur(this.auteur._id).subscribe({
        next: () => {
          alert(' Auteur supprimé avec succès !');
          this.router.navigate(['/auteurs']);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert(' Une erreur est survenue lors de la suppression.');
        }
      });
    }
  }
}