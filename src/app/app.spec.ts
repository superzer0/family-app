import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { SoundService } from './services/sound.service';

describe('App', () => {
  let mockSoundService: jasmine.SpyObj<SoundService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SoundService', ['playWinSound', 'playLoseSound', 'playIntroSound']);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: SoundService, useValue: spy }
      ]
    }).compileComponents();

    mockSoundService = TestBed.inject(SoundService) as jasmine.SpyObj<SoundService>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    
    expect(app.round).toBe(0);
    expect(app.participants.family1.name).toBe('Zbieciowie');
    expect(app.participants.family2.name).toBe('Cieslakowie');
    expect(app.participants.family1.score).toBe(0);
    expect(app.participants.family2.score).toBe(0);
    expect(app.familyInCharge).toBeUndefined();
  });

  it('should prepare questions correctly', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.ngOnInit();
    
    expect(app.questions.length).toBeGreaterThan(0);
    expect(app.questions.every(q => q.state === false)).toBe(true);
  });

  it('should switch families correctly', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    
    app.switchToFamily1();
    expect(app.familyInCharge).toBe(app.participants.family1);
    
    app.switchToFamily2();
    expect(app.familyInCharge).toBe(app.participants.family2);
  });

  it('should handle wrong answers correctly', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.switchToFamily1();
    
    app.wrongAnswer();
    
    expect(app.participants.family1.wrongAnswers).toBe(1);
    expect(mockSoundService.playLoseSound).toHaveBeenCalled();
  });

  it('should handle correct answers and update score', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.ngOnInit();
    app.switchToFamily1();
    
    const initialScore = app.participants.family1.score || 0;
    app.answerQuestion(0);
    
    expect(app.questions[0].state).toBe(true);
    expect(app.participants.family1.score).toBeGreaterThan(initialScore);
    expect(mockSoundService.playWinSound).toHaveBeenCalled();
  });

  it('should render game title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.points')?.textContent?.trim()).toBe('Familiada');
  });
});
