import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Très important pour les formulaires !

@Component({
  selector: 'app-auteur-form',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './auteur-form.component.html',
  styleUrls: ['./auteur-form.component.css']
})
export class AuteurFormComponent implements OnInit {
  // Notre objet auteur vide par défaut
  auteur: any = {
    nom: '',
    biographie: '',
    dateNaissance: ''
  };

  isEditMode: boolean = false;
  auteurId: string | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute // Pour lire l'URL
  ) {}

  ngOnInit(): void {
    // On vérifie s'il y a un ID dans l'URL
    this.auteurId = this.route.snapshot.paramMap.get('id');

    if (this.auteurId) {
      this.isEditMode = true;
      // On récupère les infos de l'auteur pour pré-remplir le formulaire
      this.apiService.getAuteursById(this.auteurId).subscribe({
        next: (data) => {
          this.auteur = data;
          // Formatage de la date pour le champ type="date" de HTML5 (YYYY-MM-DD)
          if (this.auteur.dateNaissance) {
            this.auteur.dateNaissance = this.auteur.dateNaissance.split('T')[0];
          }
        },
        error: (err) => console.error('Erreur de chargement :', err)
      });
    }
  }

  // Fonction appelée quand on clique sur le bouton "Enregistrer"
  onSubmit(): void {
    if (this.isEditMode && this.auteurId) {
      
      this.apiService.updateAuteur(this.auteurId, this.auteur).subscribe({
        next: () => {
          alert('✅ L\'auteur a été modifié avec succès !'); // <-- Le message ici
          this.router.navigate(['/auteurs']); 
        },
        error: (err) => {
          console.error('Erreur lors de la modification :', err);
          alert('❌ Une erreur est survenue lors de la modification.');
        }
      });
    } else {
      
      this.apiService.createAuteur(this.auteur).subscribe({
        next: () => {
          alert('✅ Nouvel auteur ajouté avec succès !'); // <-- Le message ici
          this.router.navigate(['/auteurs']); 
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout :', err);
          alert('❌ Une erreur est survenue lors de l\'ajout.');
        }
      });
    }
  }
}