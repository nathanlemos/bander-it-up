import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlayerPage } from '../player/player';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage
{
	constructor(public navCtrl: NavController, public navParams: NavParams)
	{}

	watch()
	{
		this.navCtrl.push( PlayerPage, { episode : 'episode' } );
	}
}
