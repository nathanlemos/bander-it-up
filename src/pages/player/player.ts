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
	currentIndex: number = 0;
	hasSelectedNext: boolean = false;
	hasFinishedEpisode: boolean = false;
	waitingTime: number = 5;

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
			that.video.setAttribute("src", that.config['scenes'][ that.currentIndex ]['url']);
			this.video.onplay = function()
			{
				if( that.hasFinishedEpisode )
				{
					that.video.setAttribute("src", that.config['scenes'][ that.currentIndex ]['url']);
					that.video.play();
				}
				that.hasFinishedEpisode = false;
				console.log( 'Exibindo: ', that.config['scenes'][ that.currentIndex ]['title'] );
				that.preloadNextOptions();
			};

			this.video.ontimeupdate = function(r)
			{
				// console.warn('Tempo: ' + this.currentTime + '/' + this.duration );
				if( this.duration - this.currentTime < that.waitingTime && !that.config['scenes'][ that.currentIndex ]['isFinal']  )
				{
					that.showOptionsOnScreen();
				}
			};

			this.video.onended = function(e)
			{
				if( that.config['scenes'][ that.currentIndex ]['isFinal'] )
				{
					that.hasFinishedEpisode = true
					that.currentIndex = 0;
					that.isPlaying = false;
					that.video.pause();
					that.hideOptionsOnScreen();
				}
				else
				{
					that.nextIndex = (that.nextIndex == 0) ? (1 + Math.round(Math.random() * 1)) : that.nextIndex;
					console.log( 'Acabou parte atual: ' + that.currentIndex + ' Indo para: ' + that.nextIndex );
					
					that.video.setAttribute("src", that.config['scenes'][ that.config['scenes'][ that.currentIndex ]['options'][ that.nextIndex ]['goto'] ]['url']);
					that.video.play();



					that.currentIndex = that.nextIndex;

					setTimeout( () =>
					{
						that.hideOptionsOnScreen();
						that.nextIndex = 0;
					}, 2000);


				}
			};
		}
		
	}

	preloadNextOptions()
	{
		console.log('Fazendo preload');
		if( !this.config['scenes'][ this.currentIndex ]['isFinal'] )
		{
			this.btnOption0.innerHTML = this.config['scenes'][ this.currentIndex ]['options'][0]['label'];
			this.btnOption1.innerHTML = this.config['scenes'][ this.currentIndex ]['options'][1]['label'];

			this.option0.setAttribute("src", this.config['scenes'][ this.config['scenes'][ this.currentIndex ]['options'][0]['goto'] ]['url']);
			this.option1.setAttribute("src", this.config['scenes'][ this.config['scenes'][ this.currentIndex ]['options'][1]['goto'] ]['url']);

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
		this.hasSelectedNext = false;
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
		this.hasSelectedNext = true;		
	}


}
