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
	isDebugging: boolean = false;
	config : any;
	episode : string;
	isShowingTopBar: boolean = true;
	isShowingOptions: boolean = false;
	isPlaying: boolean = false;
	currentIndex: number = 0;
	hasSelectedNext: boolean = false;
	hasFinishedEpisode: boolean = false;
	waitingTime: number = 10;
	currentChoice: number = 0;
	screenOptionsSetup: any = [];

	constructor( public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public http: Http, public ui: UiProvider)
	{
		this.platform.ready().then( (r) =>
		{
			this.episode = this.navParams.get('episode');

			this.http.get('/assets/json/' +this.episode+ '.json').map(res => res.json()).subscribe( (res) =>
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
				if( that.hasFinishedEpisode )
				{
					that.ui.setMainVideo(that.config['scenes'][ that.currentIndex ]['url'], true);
				}
				that.hasFinishedEpisode = false;
				that.showTopBar();
			},
			// On time updated
			function(r)
			{
				if(this.isDebugging)
				{
					console.warn('Time: ' + this.currentTime + '/' + this.duration );
				}
				if( this.duration - this.currentTime < that.waitingTime && !that.config['scenes'][ that.currentIndex ]['isFinal']  )
				{
					let loadTime = 100 - (100 * ((that.waitingTime - ( this.duration - this.currentTime )) / that.waitingTime));

					that.ui.setWaitingTime( loadTime );

					if( !that.isShowingOptions )
					{
						that.preloadNextOptions();
						that.showOptionsOnScreen();
					}
				}
			},
			// On ended
			function(e)
			{
				if( that.config['scenes'][ that.currentIndex ]['isFinal'] )
				{
					console.log( 'Caiu Final' );

					that.hasFinishedEpisode = true
					that.currentIndex = 0;
					that.isPlaying = false;
					that.ui.pause();
				}
				else
				{
					let nextIndex = 0;
					that.currentChoice = (that.currentChoice == 0) ?  ( 1 +Math.round(Math.random() * 1)) : that.currentChoice;
					that.hasSelectedNext = true;

					nextIndex = that.config['scenes'][ that.currentIndex ]['options'][ that.currentChoice - 1 ]['goto'];

					that.ui.setCurrentScreen( that.screenOptionsSetup[ that.currentChoice - 1 ] );
					that.ui.play();
					that.ui.configScreen();

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
		if( !this.config['scenes'][ this.currentIndex ]['isFinal'] )
		{
			let iOption = 0;
			for( let iScreen = 0; iScreen < 3; iScreen++ )
			{
				if( iScreen != this.ui.getCurrentScreen() )
				{
					this.screenOptionsSetup[ iOption ] = iScreen;
					this.ui.setOption( iScreen, iOption, this.config['scenes'][ this.config['scenes'][ this.currentIndex ]['options'][iOption]['goto'] ]['url'], this.config['scenes'][ this.currentIndex ]['options'][iOption]['label'] );
					iOption++;
				}

			}
		}
	}

	showOptionsOnScreen()
	{
		if( !this.isShowingOptions )
		{
			this.isShowingOptions = true;
		}
	}

	hideOptionsOnScreen()
	{
		this.hasSelectedNext = false;
		this.isShowingOptions = false;
	}

	play()
	{
		if( this.ui.hasMainVideo() && !this.isPlaying )
		{
			this.isPlaying = true;
			this.ui.play();
		}
	}

	pause()
	{
		if( this.ui.hasMainVideo() && this.isPlaying )
		{
			this.isPlaying = false;
			this.ui.pause();
		}
	}

	back()
	{
		this.navCtrl.pop();
	}

	goto( op )
	{
		this.currentChoice = op;
		this.hasSelectedNext = true;
	}

	showTopBar()
	{
		this.isShowingTopBar = true;
		setTimeout( () =>
		{
			this.isShowingTopBar = false;
		}, 3000);
	}
}