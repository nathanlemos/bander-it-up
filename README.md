# Bander-it-up!

This is an Ionic Framework based project to play interactive videos like Netflix's Black Mirror: Bandersnatch.

## Getting Started

To create your version of Bandersnatch, clone this repo e write your story at the episode.json located at assets folder. You can create your own story, from scratch, but you need to refer the correct json at player.ts

This project can be used to entertainment ideas, distance learning interactive projects and a lot of things. 

### Prerequisites

Anyone can use it. You just need to know the basics of Ionic Framework and JSON markups. The JSON files are like the following:

```
{
	"name": "Sample Episode",
	"author": "Nate Reis",
	"scenes": [{
		"id": 0,
		"title": "Inicio",
		"url": "https://player.vimeo.com/external/294394804.hd.mp4?s=d8437c0fc1b6b8bf04089697cb0d68bd7072e9b1&profile_id=175&oauth2_token_id=57447761",
		"isFinal": false,
		"options": [{
			"label": "Flores?",
			"goto": 1
		},
		{
			"label": "Cidade?",
			"goto": 3
		}
	]
	}, {
		"id": 1,
		"title": "Parte 1 - Flores",
		"url": "https://player.vimeo.com/external/306205121.hd.mp4?s=86130cf2d42d8333b9766b011c03162c2ce20aa1&profile_id=175&oauth2_token_id=57447761",
		"isFinal": false,
		"options": [{
			"label": "Rua?",
			"goto": 4
		},
		{
			"label": "Cidade?",
			"goto": 3
		}
	]
	}, {
		"id": 2,
		"title": "Parte 2 - Piano",
		"url": "https://player.vimeo.com/external/263529403.hd.mp4?s=80b43b7e0f37c7470dded9fa542c0d464b3c9ec3&profile_id=175&oauth2_token_id=57447761",
		"isFinal": true
	}, {
		"id": 3,
		"title": "Parte 3 - Cidade",
		"url": "https://player.vimeo.com/external/301906284.hd.mp4?s=c53feefc431262b36134331e9ac4d917d59bd21e&profile_id=175&oauth2_token_id=57447761",
		"isFinal": true
	}, {
		"id": 4,
		"title": "Parte 4 - Rua",
		"url": "https://player.vimeo.com/external/210753513.hd.mp4?s=2012c5def3e484062e6a519381d634bbd75ff818&profile_id=119&oauth2_token_id=57447761",
		"isFinal": false,
		"options": [{
			"label": "Piano?",
			"goto": 2
		},
		{
			"label": "Cidade?",
			"goto": 3
		}
	]
	}]
}
```

## Running the tests

Please, check the Android Demo available at [Google Play](https://play.google.com/store/apps/details?id=com.banderitup.demo)

Also check the [How I Met Yout Mother's interctive episode](https://play.google.com/store/apps/details?id=com.banderitup.himyb) developed with this project
## Built With

* [Ionic Framework](http://ionicframework.com/) - The web framework used
* [Sublime Text 3](https://www.sublimetext.com/3) - The text editor
* Love <3

## Versioning

This current version is just the basic of the basics! Please, help us to make it better :)

## Authors

* **Nate Reis** - *Feel free to say hi or buy me a beer at*  [my Linkedin profile](https://www.linkedin.com/in/nathan-reis-3239374a/)

See also the list of [contributors](https://github.com/nathanlemos/bander-it-up/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
