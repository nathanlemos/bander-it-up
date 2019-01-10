var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var PlayerPage = /** @class */ (function () {
    function PlayerPage(navCtrl, platform, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.http = http;
        this.isShowingOptions = false;
        this.isPlaying = false;
        this.platform.ready().then(function (r) {
            _this.episode = 'episode';
            _this.http.get('../../../assets/json/' + _this.episode + '.json').map(function (res) { return res.json(); }).subscribe(function (res) {
                _this.config = res;
                _this.setVideo();
            }, function (err) {
                console.log('nOk', err);
            });
        });
    }
    PlayerPage.prototype.setVideo = function () {
        var that = this;
        this.video = document.getElementById('main');
        if (this.video != undefined) {
            that.video.setAttribute("src", this.config['scenes'][0]['url']);
            this.video.onplaying = function () {
                console.log('Iniciou video...');
            };
            this.video.ontimeupdate = function (r) {
                if (this.duration - this.currentTime < 5) {
                    that.showOptionsOnScreen();
                }
                if (this.duration - this.currentTime < 0.5) {
                    //that.video.setAttribute("src", "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4");
                    //that.video.play();
                }
            };
            this.video.onended = function (e) {
                this.isPlaying = true;
                this.video.play();
                that.hideOptionsOnScreen();
            };
        }
    };
    PlayerPage.prototype.showOptionsOnScreen = function () {
        if (!this.isShowingOptions) {
            console.log('Mostra tela');
            this.isShowingOptions = true;
        }
    };
    PlayerPage.prototype.hideOptionsOnScreen = function () {
        console.log('Fechou options');
        this.isShowingOptions = false;
    };
    PlayerPage.prototype.play = function () {
        if (this.video != undefined && !this.isPlaying) {
            this.isPlaying = true;
            this.video.play();
        }
    };
    PlayerPage.prototype.pause = function () {
        if (this.video != undefined && this.isPlaying) {
            this.isPlaying = false;
            this.video.pause();
        }
    };
    PlayerPage = __decorate([
        Component({
            selector: 'page-player',
            templateUrl: 'player.html',
        }),
        __metadata("design:paramtypes", [NavController, Platform, Http])
    ], PlayerPage);
    return PlayerPage;
}());
export { PlayerPage };
//# sourceMappingURL=player.js.map