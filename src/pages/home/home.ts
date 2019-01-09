import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage
{
	video : any;
	isShowingOptions: boolean = false;

	constructor( public navCtrl: NavController, public platform: Platform)
	{
		this.platform.ready().then( (r) =>
		{
			let that = this;
			this.video = document.getElementById('main');

			console.log( this.video );

			this.video.onplaying = function()
			{
				console.log( 'Iniciou video...' );
			};

			this.video.ontimeupdate = function(r)
			{
				if( this.duration - this.currentTime < 5  )
				{
					that.showOptionsOnScreen();
				}

				if( this.duration - this.currentTime < 0.5  )
				{
					that.video.setAttribute("src", "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4");
					that.video.play();
				}
			};

			this.video.onended = function(e)
			{
				that.hideOptionsOnScreen();
			};

		});
	}

	changeUrl()
	{

	}

	showOptionsOnScreen()
	{
		if( !this.isShowingOptions )
		{
			console.log( 'Mostra tela' );
			this.isShowingOptions = true;
		}
	}

	hideOptionsOnScreen()
	{
		console.log('Fechou options');
		this.isShowingOptions = false;
	}

}
