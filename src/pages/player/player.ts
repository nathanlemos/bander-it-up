import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { UiProvider } from '../../providers/ui/ui';


@Component({
	selector: 'page-player',
	templateUrl: 'player.html',
})
export class PlayerPage
{
	config : any;
	episode : string;
	isShowingOptions: boolean = false;
	isPlaying: boolean = false;
	currentIndex: number = 0;
	hasSelectedNext: boolean = false;
	hasFinishedEpisode: boolean = false;
	waitingTime: number = 5;
	currentChoice: number = 0;

	constructor( public navCtrl: NavController, public platform: Platform, public http: Http, public ui: UiProvider)
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
		this.ui.init( this.config['scenes'][ this.currentIndex ]['url'], 
			// On play
			function()
			{
				that.preloadNextOptions();
				if( that.hasFinishedEpisode )
				{
					that.ui.setMainVideo(that.config['scenes'][ that.currentIndex ]['url'], true);
				}
				that.hasFinishedEpisode = false;
				console.log( 'Exibindo: ', that.config['scenes'][ that.currentIndex ]['title'] );
				
			}, 
			// On time updated
			function(r)
			{
				// console.warn('Tempo: ' + this.currentTime + '/' + this.duration );
				if( this.duration - this.currentTime < that.waitingTime && !that.config['scenes'][ that.currentIndex ]['isFinal']  )
				{
					let loadTime = 100 - (100 * ((that.waitingTime - ( this.duration - this.currentTime )) / that.waitingTime));

					that.ui.setWaitingTime( loadTime );

					if( !that.isShowingOptions )
					{
						// that.preloadNextOptions(); // TODO - Check if is better here or on play
						that.showOptionsOnScreen();
					}
				}
			},
			// On ended
			function(e)
			{
				if( that.config['scenes'][ that.currentIndex ]['isFinal'] )
				{
					that.hasFinishedEpisode = true
					that.currentIndex = 0;
					that.isPlaying = false;
					that.ui.pauseMainVideo();
				}
				else
				{
					let nextIndex = 0;
					that.currentChoice = (that.currentChoice == 0) ?  ( 1 +Math.round(Math.random() * 1)) : that.currentChoice;
					that.hasSelectedNext = true;

					nextIndex = that.config['scenes'][ that.currentIndex ]['options'][ that.currentChoice - 1 ]['goto'];


					console.log( 'Acabou parte atual: ' + that.currentIndex + ' Indo para: ' + nextIndex );
					that.ui.setMainVideo(that.config['scenes'][ nextIndex ]['url'], true);

					that.currentIndex = nextIndex;

					setTimeout( () =>
					{
						that.hideOptionsOnScreen();
						that.currentChoice = 0;
					}, 2000);


				}
			}  );
	}

	preloadNextOptions()
	{
		console.log('Fazendo preload');
		if( !this.config['scenes'][ this.currentIndex ]['isFinal'] )
		{
			this.ui.setOption( 0, this.config['scenes'][ this.config['scenes'][ this.currentIndex ]['options'][0]['goto'] ]['url'], this.config['scenes'][ this.currentIndex ]['options'][0]['label'] );
			this.ui.setOption( 1, this.config['scenes'][ this.config['scenes'][ this.currentIndex ]['options'][1]['goto'] ]['url'], this.config['scenes'][ this.currentIndex ]['options'][1]['label'] );
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
		if( this.ui.hasMainVideo() && !this.isPlaying )
		{
			this.isPlaying = true;
			this.ui.playMainVideo();
		}
	}

	pause()
	{
		if( this.ui.hasMainVideo() && this.isPlaying )
		{
			this.isPlaying = false;
			this.ui.pauseMainVideo();
		}
	}

	goto( op )
	{
		console.log( op );
		this.currentChoice = op;
		this.hasSelectedNext = true;		
	}
}