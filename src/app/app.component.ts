import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import { Platform, ToastController, Events, AlertController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  public appPages = [
    {
      title: 'Report Harian',
      url: '/dashboard',
      icon: 'bookmark'
    },
    {
      title: 'Report History',
      url: '/my-report',
      icon: 'md-clipboard'
    },
  ];
  emailShows
  backButtonSubscription
  counts :number = 0;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router : Router,
    public events : Events,
    public alertController: AlertController,
    public toastController : ToastController
  ) {
    const dataUser = JSON.parse(localStorage.getItem('authBPN'));
    if(dataUser){
      this.emailShows = dataUser.email;
      }
    events.subscribe('email', (email) => {
      this.emailShows = email;
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#1e2023');
      this.statusBar.styleBlackTranslucent();
    });
  }
  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.counts++
      if((window.location.pathname == '/login') || (window.location.pathname == '/register') || (window.location.pathname == '/dashboard')){
        if(this.counts == 2){
          navigator['app'].exitApp();
          this.counts = 0;
        }
        this.presentToast('Tekan sekali lagi untuk keluar', "bottom")
      }else{
        this.counts = 0
        window.history.back();
      }
    }); 
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  async logout(){
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Klik OK untuk Logout?',
      buttons: [
        {
          text: 'CANCEL',
          handler: () => {
            
          }
        },
       {
          text: 'OK',
          handler: () => {
            console.log('Confirm Okay');
            localStorage.clear();
            this.router.navigate(['/login'], {replaceUrl: true})
          }
        }
      ]
    });
    await alert.present();

  }


  async presentToast(msg, positions) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: positions
    });
    toast.present();
  }
}
