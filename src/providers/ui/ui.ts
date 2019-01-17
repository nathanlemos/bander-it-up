import { Injectable } from '@angular/core';

@Injectable()
export class UiProvider
{
	players : any = [];
	btnOptions : any = [];
	curretScreen: number = 2;
	fn: any =
	{
		onPlay : null,
		onTimeUpdate : null,
		onEnded : null,
	}

	constructor()
	{}

	init( src, fnOnPlay, fnOnTimeUpdate, fnOnEnded)
	{
		// Preloaders
		this.players[0] = document.getElementById('option0');
		this.players[1] = document.getElementById('option1');

		// Video Principal
		this.players[2] = document.getElementById('option2');

		// Option buttons
		this.btnOptions[0] = document.getElementById('btnOption0');
		this.btnOptions[1] = document.getElementById('btnOption1');

		this.players[ this.curretScreen ].setAttribute("src", src);
		this.fn =
		{
			onPlay : fnOnPlay,
			onTimeUpdate : fnOnTimeUpdate,
			onEnded : fnOnEnded,
		}

		this.configScreen();
	}

	configScreen()
	{
		this.players[this.curretScreen].onplay = this.fn['onPlay'];
		this.players[this.curretScreen].ontimeupdate = this.fn['onTimeUpdate'];
		this.players[this.curretScreen].onended = this.fn['onEnded'];

	}

	setCurrentScreen( screen )
	{
		this.curretScreen = screen;
	}

	getCurrentScreen()
	{
		return this.curretScreen;
	}

	setWaitingTime( time )
	{
		document.getElementById('player-options-loader-bar').style.width = time + '%';
	}

	setOption( screen, player, src, text )
	{
		this.btnOptions[ player ].innerHTML = text;
		this.players[ screen ].setAttribute("src", src);
	}

	hasMainVideo()
	{
		return this.players[2] != undefined;
	}

	setMainVideo(src, willPlay)
	{
		this.players[ this.curretScreen ].setAttribute("src", src);
		if( willPlay)
		{
			this.play();
		}
	}

	play()
	{
		this.players[this.curretScreen].play();
	}

	pause()
	{
		this.players[this.curretScreen].pause();
	}

}
