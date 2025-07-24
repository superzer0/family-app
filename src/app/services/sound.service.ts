import { Injectable } from '@angular/core';

export interface AudioElement extends HTMLAudioElement {
  play(): Promise<void>;
  stop(): void;
  pause(): void;
}

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private startIntro: AudioElement;
  private win: AudioElement;
  private lose: AudioElement;
  private isPlaying = false;

  constructor() {
    this.startIntro = new Audio('sounds/intro.mp3') as AudioElement;
    this.win = new Audio('sounds/dobrze.mp3') as AudioElement;
    this.lose = new Audio('sounds/zla.mp3') as AudioElement;

    // Add stop method to audio elements
    [this.startIntro, this.win, this.lose].forEach(audio => {
      if (!audio.stop) {
        audio.stop = function() {
          this.pause();
          this.currentTime = 0;
        };
      }
    });
  }

  playWinSound(): void {
    this.win.play().catch(error => console.error('Error playing win sound:', error));
  }

  playLoseSound(): void {
    this.lose.play().catch(error => console.error('Error playing lose sound:', error));
  }

  playIntroSound(): void {
    if (this.isPlaying) {
      this.startIntro.stop();
      this.isPlaying = false;
    } else {
      this.isPlaying = true;
      this.startIntro.play()
        .then(() => {
          // Handle successful play
        })
        .catch(error => {
          console.error('Error playing intro sound:', error);
          this.isPlaying = false;
        });
    }
  }

  muteAll(): void {
    [this.startIntro, this.win, this.lose].forEach(audio => {
      audio.muted = true;
    });
  }
}