import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-livre-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livre-form.component.html',
  styleUrl: './livre-form.component.css'
})
export class LivreFormComponent implements OnInit {

  auteurs: any[] = [];
  livre = { titre: '', auteur: '', resume: '', disponibilite: true };
  
  // 👉 1. On crée une variable pour stocker le message
  messageSucces: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAuteurs().subscribe((data: any[]) => {
      this.auteurs = data;
    });
  }
ajouterLivre(): void {
    // On ajoute une petite vérification pour être sûr que les champs requis sont remplis
    if (!this.livre.titre || !this.livre.auteur) {
      alert("Veuillez remplir le titre et sélectionner un auteur.");
      return;
    }

    this.apiService.createLivre(this.livre).subscribe({
      next: () => {
        this.messageSucces = "✅ Succès ! Le livre a bien été ajouté.";
        
        // On vide le formulaire
        this.livre = { titre: '', auteur: '', resume: '', disponibilite: true };
        
        setTimeout(() => {
          this.messageSucces = '';
        }, 4000);
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout du livre :", err);
        alert("❌ Une erreur est survenue lors de l'enregistrement du livre.");
      }
    });
  }
}