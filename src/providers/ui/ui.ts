import { Injectable } from '@angular/core';

@Injectable()
export class UiProvider
{
	players : any = [];
	btnOptions : any = [];

	constructor()
	{}

	init( src, fnOnPlay, fnOnTimeUpdate, fnOnEnded)
	{
		// Video Principal
		this.players[2] = document.getElementById('main');
		
		// Preloaders
		this.players[0] = document.getElementById('option0');
		this.players[1] = document.getElementById('option1');
		
		// Option buttons
		this.btnOptions[0] = document.getElementById('btnOption0');
		this.btnOptions[1] = document.getElementById('btnOption1');

		this.players[2].setAttribute("src", src);
		this.players[2].onplay = fnOnPlay;
		this.players[2].ontimeupdate = fnOnTimeUpdate;
		this.players[2].onended = fnOnEnded;
	}

	setWaitingTime( time )
	{
		document.getElementById('player-options-loader-bar').style.width = time + '%';
	}

	setOption( player, src, text )
	{
		this.btnOptions[ player ].innerHTML = text;
		this.btnOptions[ player ].setAttribute("src", src);
	}

	hasMainVideo()
	{
		return this.players[2] != undefined;
	}

	setMainVideo(src, willPlay)
	{
		this.players[2].setAttribute("src", src);
		if( willPlay)
		{
			this.playMainVideo();
		}
	}

	playMainVideo()
	{
		this.players[2].play();
	}

	pauseMainVideo()
	{
		this.players[2].pause();
	}

}
