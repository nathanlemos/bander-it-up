import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = HomePage;

    constructor(platform: Platform, splashScreen: SplashScreen)
    {
        platform.ready().then(() =>
        {
            splashScreen.hide();
        });
    }
}

