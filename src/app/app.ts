import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundService } from './services/sound.service';
import { PARTICIPANTS, QUESTIONS, Question, Answer, Family } from './config/game.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  round = 0;
  participants: {
    family1: Family;
    family2: Family;
  };
  allQuestions: Question[] = QUESTIONS;
  questions: Answer[] = [];
  familyInCharge: Family | undefined = undefined;
  showDivHelp = false;
  showSummary = false;
  victoryFamily: Family | undefined = undefined;

  constructor(private soundService: SoundService) {
    this.participants = {
      family1: {
        name: PARTICIPANTS.family1.name,
        score: 0,
        wrongAnswers: 0
      },
      family2: {
        name: PARTICIPANTS.family2.name,
        score: 0,
        wrongAnswers: 0
      }
    };
  }

  ngOnInit(): void {
    this.prepareQuestions();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    // Answer questions (keys 1-5)
    if (event.keyCode > 48 && event.keyCode < 54) {
      const answerIndex = event.keyCode - 49;
      this.answerQuestion(answerIndex);
    }

    // Next round (Space)
    if (event.keyCode === 32) {
      this.nextRound();
    }

    // Switch to family 2 (C)
    if (event.keyCode === 67) {
      this.switchToFamily2();
    }

    // Switch to family 1 (Z)
    if (event.keyCode === 90) {
      this.switchToFamily1();
    }

    // Wrong answer (W)
    if (event.keyCode === 87) {
      this.wrongAnswer();
    }
  }

  switchToFamily1(): void {
    this.familyInCharge = this.participants.family1;
  }

  switchToFamily2(): void {
    this.familyInCharge = this.participants.family2;
  }

  switchToNoFamilyInCharge(): void {
    this.familyInCharge = undefined;
  }

  prepareQuestions(): void {
    if (this.allQuestions.length <= this.round) {
      return;
    }

    const currentRoundQuestions = this.allQuestions[this.round].answers;
    const preparedQuestions: Answer[] = [];
    
    for (const answer of currentRoundQuestions) {
      preparedQuestions.push({ ...answer, state: false });
    }

    this.questions = preparedQuestions;
    this.participants.family1.wrongAnswers = 0;
    this.participants.family2.wrongAnswers = 0;
  }

  showHelp(): void {
    this.showDivHelp = !this.showDivHelp;
  }

  getAnswerScore(answer: Answer): string {
    if (answer.state) {
      return answer.score.toString();
    }
    return '__';
  }

  getAnswerText(answer: Answer): string {
    if (answer.state) {
      return answer.answer;
    }
    return '.................................';
  }

  getFamily1WrongPoints(): any[] {
    return new Array(this.participants.family1.wrongAnswers || 0);
  }

  getFamily2WrongPoints(): any[] {
    return new Array(this.participants.family2.wrongAnswers || 0);
  }

  answerQuestion(index: number): void {
    if (this.questions.length <= index) {
      return;
    }

    const answer = this.questions[index];

    if (!answer.state) {
      answer.state = true;

      if (this.familyInCharge && this.familyInCharge.score !== undefined) {
        this.familyInCharge.score += answer.score;
      }

      this.soundService.playWinSound();
    } else {
      answer.state = false;
      if (this.familyInCharge && this.familyInCharge.score !== undefined) {
        this.familyInCharge.score -= answer.score;
        if (this.familyInCharge.score < 0) {
          this.familyInCharge.score = 0;
        }
      }
    }
  }

  wrongAnswer(): void {
    if (this.familyInCharge && this.familyInCharge.wrongAnswers !== undefined) {
      if (this.familyInCharge.wrongAnswers < 3) {
        this.familyInCharge.wrongAnswers++;
      }
    }

    this.soundService.playLoseSound();
  }

  nextRound(): void {
    this.round++;

    if (this.allQuestions.length <= this.round) {
      this.summarize();
    } else {
      this.prepareQuestions();
    }
  }

  playIntro(): void {
    this.soundService.playIntroSound();
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  summarize(): void {
    this.showSummary = true;

    const victoryFamily = (this.participants.family1.score || 0) > (this.participants.family2.score || 0)
      ? this.participants.family1 
      : this.participants.family2;

    this.victoryFamily = victoryFamily;
  }
}
