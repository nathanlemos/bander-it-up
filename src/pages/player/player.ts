import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	selector: 'page-player',
	templateUrl: 'player.html',
})
export class PlayerPage
{
	config : any;
	episode : string;
	video : any;
	isShowingOptions: boolean = false;
	isPlaying: boolean = false;

	constructor( public navCtrl: NavController, public platform: Platform, public http: Http)
	{
		this.platform.ready().then( (r) =>
		{
			this.episode = 'episode';

			this.http.get('../../../assets/json/' +this.episode+ '.json').map(res => res.json()).subscribe( (res) =>
			{
				this.config = res;
				this.setVideo();
			},
			err =>
			{
				console.log( 'nOk', err );
			});	

		});
	}

	setVideo()
	{
		let that = this;
		this.video = document.getElementById('main');

		if( this.video != undefined )
		{
			that.video.setAttribute("src", this.config['scenes'][0]['url']);
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
					//that.video.setAttribute("src", "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4");
					//that.video.play();
				}
			};

			this.video.onended = function(e)
			{
				that.hideOptionsOnScreen();
			};
		}
		
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

	play()
	{
		if( this.video != undefined && !this.isPlaying )
		{
			this.isPlaying = true;
			this.video.play();
		}
	}

	pause()
	{
		if( this.video != undefined && this.isPlaying )
		{
			this.isPlaying = false;
			this.video.pause();
		}
	}


}
