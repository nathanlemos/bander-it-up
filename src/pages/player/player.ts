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
	option0 : any;
	option1 : any;
	btnOption0 : any;
	btnOption1 : any;
	isShowingOptions: boolean = false;
	isPlaying: boolean = false;
	nextIndex: number = 0;

	constructor( public navCtrl: NavController, public platform: Platform, public http: Http)
	{
		this.platform.ready().then( (r) =>
		{
			this.episode = 'episode';
			this.video = document.getElementById('main');
			this.option0 = document.getElementById('option0');
			this.option1 = document.getElementById('option1');
			this.btnOption0 = document.getElementById('btnOption0');
			this.btnOption1 = document.getElementById('btnOption1');

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

		if( this.video != undefined )
		{
			that.video.setAttribute("src", this.config['scenes'][0]['url']);
			this.video.onplaying = function()
			{
				console.log( 'Iniciou video...' );

				that.preloadNextOptions();
			};

			this.video.ontimeupdate = function(r)
			{
				if( this.duration - this.currentTime < 5  )
				{
					that.showOptionsOnScreen();
				}

				if( this.duration - this.currentTime < 0.5  )
				{
					that.video.setAttribute("src", that.config['scenes'][ that.nextIndex ]['url']);
					that.video.play();
				}
			};

			this.video.onended = function(e)
			{
				that.isPlaying = false;
				that.video.pause();
				that.hideOptionsOnScreen();
			};
		}
		
	}

	preloadNextOptions()
	{
		console.log('Fazendo preload');
		this.btnOption0.innerHTML = this.config['scenes'][1]['title'];
		this.btnOption1.innerHTML = this.config['scenes'][2]['title'];

		this.option0.setAttribute("src", this.config['scenes'][1]['url']);
		this.option1.setAttribute("src", this.config['scenes'][2]['url']);

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

	goto( op )
	{
		console.log( op );
		this.nextIndex = op;
	}


}
