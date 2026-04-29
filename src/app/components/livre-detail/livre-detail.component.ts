import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router'; // ActivatedRoute permet de lire l'URL
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-livre-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './livre-detail.component.html',
  styleUrl: './livre-detail.component.css'
})
export class LivreDetailComponent implements OnInit {

  livre: any = null; // Contiendra les infos du livre

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // 1. On récupère l'ID dans l'URL
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      // 2. On demande les détails de ce livre au service
      this.apiService.getLivresById(id).subscribe({
        next: (data) => {
          this.livre = data;
        },
        error: (err) => {
          console.error("Erreur lors de la récupération du livre :", err);
        }
      });
    }
  }
}