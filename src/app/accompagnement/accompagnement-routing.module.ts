import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ActiviteComponent } from './activite/activite.component';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import { IntervenantComponent } from './intervenant/intervenant.component';
import { EtudeComponent } from './etude/etude.component';
import { MembreComponent } from './membre/membre.component';
import { VilleComponent } from './ville/ville.component';




const routes: Routes = [
    {
        
        path:'activite',
        component:ActiviteComponent,
        data:{
            title:'Activite'
        }
    },
    {
        path:'beneficiaire',
        component:BeneficiaireComponent,
        data:{
            title:'Beneficiaire'
        }
    },
    {
        
        path:'intervenant',
        component:IntervenantComponent,
        data:{
            title:'intervenant'
        }
    },
    {
   
        path:'membre',
        component:MembreComponent,
        data:{
            title:'Membre'
        }
    },
    {
       
        path:'etude',
        component:EtudeComponent,
        data:{
            title:'Etude'
        }
    },
    {
       
        path:'ville',
        component:VilleComponent,
        data:{
            title:'ville'
        }
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccompagnementRoutingModule {}



