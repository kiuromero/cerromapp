import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(private loadingController : LoadingController) { }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({    
      duration: 2000,
      message: 'Cargando ...',      
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    
  }
  
}
