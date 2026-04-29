import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-livre-modifier',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './livre-modifier.component.html',
  styleUrl: './livre-modifier.component.css'
})
export class LivreModifierComponent implements OnInit {

  auteurs: any[] = [];
  livre: any = { titre: '', auteur: '', resume: '', disponibilite: true };
  livreId: string = '';
  messageSucces: string = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // On charge la liste des auteurs pour la liste déroulante
    this.apiService.getAuteurs().subscribe((data: any[]) => {
      this.auteurs = data;
    });

    // On récupère l'ID du livre cliqué dans l'URL
    this.livreId = this.route.snapshot.paramMap.get('id') || '';

    // On charge les infos du livre pour pré-remplir les cases
    if (this.livreId) {
      this.apiService.getLivresById(this.livreId).subscribe((data: any) => {
        this.livre = data;
        // On extrait juste l'ID de l'auteur pour que le select HTML fonctionne
        if (this.livre.auteur && typeof this.livre.auteur === 'object') {
          this.livre.auteur = this.livre.auteur._id;
        }
      });
    }
  }

  modifierLivre(): void {
    this.apiService.updateLivres(this.livreId, this.livre).subscribe({
      next: () => {
        this.messageSucces = "Le livre a été modifié avec succès ! Redirection...";
        setTimeout(() => {
          this.router.navigate(['/livres']);
        }, 2000);
      },
      error: (err) => {
        alert("Une erreur est survenue lors de la modification.");
      }
    });
  }
}