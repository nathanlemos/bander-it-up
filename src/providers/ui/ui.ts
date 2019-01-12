import { Injectable } from '@angular/core';

@Injectable()
export class UiProvider
{
	episode : string;
	video : any;
	option0 : any;
	option1 : any;
	btnOption0 : any;
	btnOption1 : any;

	constructor()
	{}

	init( that )
	{
		this.video = document.getElementById('main');
		this.option0 = document.getElementById('option0');
		this.option1 = document.getElementById('option1');
		this.btnOption0 = document.getElementById('btnOption0');
		this.btnOption1 = document.getElementById('btnOption1');

		this.setVideo( that );
	}


	setVideo( that )
	{
		if( this.video != undefined )
		{
			this.video.setAttribute("src", that.config['scenes'][0]['url']);
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

}
