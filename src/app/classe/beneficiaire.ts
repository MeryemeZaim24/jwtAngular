import { Activite } from "./activite";
import { Branche } from "./branche";
import { Region } from "./region";
import { Ville } from "./ville";

export class Beneficiaire {

    id: number;
    nom: string;
    prenom: string;
    dateNaissance: string;
    adresse: string;
    pereContact: string;
    mereContact: string;
    region: Region;
    branche: Branche;  
    ville: Ville;    
    activites: Activite; 
}

