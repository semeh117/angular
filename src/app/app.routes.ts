import { Routes } from '@angular/router';
import { LivreListeComponent } from './components/livre-liste/livre-liste.component';
import { LivreFormComponent } from './components/livre-form/livre-form.component';
import { AuteurListeComponent } from './components/auteur-liste/auteur-liste.component';
import { AuteurDetailComponent } from './components/auteur-detail/auteur-detail.component';
import { AuteurFormComponent } from './components/auteur-form/auteur-form.component';
import { LivreModifierComponent } from './components/livre-modifier/livre-modifier.component';
export const routes: Routes = [
  // --- REDIRECTION PAR DÉFAUT ---
  { path: '', redirectTo: 'livres', pathMatch: 'full' }, 

  // --- SECTION LIVRES ---
  { path: 'livres', component: LivreListeComponent },
  { path: 'ajouter-livre', component: LivreFormComponent },
 { path: 'livres/modifier/:id', component: LivreModifierComponent },
  { path: 'livres/detail/:id', loadComponent: () => import('./components/livre-detail/livre-detail.component').then(m => m.LivreDetailComponent) },

  // --- SECTION AUTEURS ---
  { path: 'auteurs', component: AuteurListeComponent },
  { path: 'auteurs/nouveau', component: AuteurFormComponent },
  { path: 'auteurs/modifier/:id', component: AuteurFormComponent },
  { path: 'auteurs/:id', component: AuteurDetailComponent }
];