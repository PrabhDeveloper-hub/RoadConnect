import { CAM_CENTER } from '../cfg/game-config';
import { GAME_FONT, TIMER_CONFIG } from '../cfg/game-constants';
import { TWEEN_EASING } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';
import { formatTime } from '../utils/CodeUtils';

export default class Timer extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  private clockImage!: Phaser.GameObjects.Image;
  private clockText!: Phaser.GameObjects.Text;
  private timeRemainingText!: Phaser.GameObjects.Text;
  private timerEvent: Phaser.Time.TimerEvent | null;
  private timeSeconds = 0;
  private hiddenTimestamp = 0;
  private origPositionY = 0;
  private runOutTween: Phaser.Tweens.Tween | null = null;

  constructor(scene: AbstractScene, upperBoundY: number) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y + upperBoundY);
    this.scene = scene;
    this.origPositionY = CAM_CENTER.y + upperBoundY;
    this.timerEvent = null;
    this.addClockImage();
    this.addClockText();
    this.addTimeRemainingText();
    this.centerAlignTextAndClock();
    this.scene.add.existing(this);
  }

  private addClockImage() {
    this.clockImage = this.scene.add.image(0, 0, 'clock');
    this.add(this.clockImage);
  }

  private addClockText() {
    this.clockText = this.scene.add
      .text(0, 0, '00:00', {
        fontFamily: GAME_FONT,
        fontSize: TIMER_CONFIG.fontSize,
        resolution: 3,
        color: TIMER_CONFIG.fontColor,
      })
      .setAlign('center')
      .setOrigin(0, 0.5);
    this.add(this.clockText);
  }

  private addTimeRemainingText() {
    this.timeRemainingText = this.scene.add
      .text(0, 0, 'Time Remaining', {
        fontFamily: GAME_FONT,
        fontSize: '22px',
        resolution: 3,
        color: TIMER_CONFIG.fontColor,
      })
      .setAlign('center')
      .setOrigin(0.5, 0.5);
    this.add(this.timeRemainingText);
  }

  private centerAlignTextAndClock() {
    this.clockImage.x =
      (this.clockImage.displayWidth + this.clockText.displayWidth) * -0.5;
    this.clockText.x =
      this.clockImage.displayWidth * 0.5 - this.clockText.displayWidth * 0.5;
    this.timeRemainingText.y = this.clockText.y - 40;
  }

  transitionToCenter(): void {
    this.scene.tweens.add({
      targets: this,
      scale: {
        value: 0.9,
        yoyo: true,
        ease: TWEEN_EASING.QUAD_EASE_IN,
        duration: 700,
        delay: 450,
      },
      y: {
        value: CAM_CENTER.y - this.clockImage.displayHeight * 1.5,
        ease: TWEEN_EASING.BACK_EASE_OUT,
        duration: 700,
        delay: 450,
      },
    });
  }

  transitionBackAndSetTimer(time: number): void {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      scale: 0,
      yoyo: true,
      ease: TWEEN_EASING.SINE_EASE_IN,
      onYoyo: () => {
        this.y = this.origPositionY;
        this.setTimer(time);
      },
      delay: 450,
      duration: 250,
    });
  }

  hideTimer(): void {
    this.scene.tweens.add({
      targets: this,
      scale: 0,
      duration: 350,
      delay: 1000,
      ease: TWEEN_EASING.BACK_EASE_IN,
      easeParams: [2.5],
      onComplete: () => {
        this.setVisible(false);
        this.clearTimer();
      },
    });
  }

  showAndStartTimer(): void {
    this.scene.tweens.add({
      targets: this,
      scale: 1,
      duration: 150,
      onStart: () => {
        this.setVisible(true);
      },
      onComplete: () => {
        this.startTimer();
      },
    });
  }

  clearTimer(): void {
    if (this.timerEvent) {
      this.timerEvent.remove();
      this.timerEvent = null;
      this.timeSeconds = 0;
      this.clockText.text = '00:00';
    }
  }

  setTimer(time: number): void {
    this.timeSeconds = time;
    this.clockText.text = formatTime(this.timeSeconds);
  }

  startTimer(): void {
    this.timerEvent = this.scene.time.addEvent({
      delay: 1000,
      callback: this.updateClockTime,
      callbackScope: this,
      loop: true,
    });
    this.scene.tweens.add({
      targets: this,
      scale: 1.05,
      duration: 250,
      ease: TWEEN_EASING.SINE_EASE_IN,
      yoyo: true,
      onStart: () => {
        this.setVisible(true);
      },
    });
  }

  private updateClockTime(): void {
    if (this.timerEvent) {
      this.timeSeconds--;
      if (this.timeSeconds <= 5 && this.timeSeconds !== 0) {
        this.timerRunningOutAnimation();
      }
      this.clockText.text = formatTime(this.timeSeconds);
      if (this.timeSeconds <= 0) {
        this.pauseTimer();
        this.killRunOutTimer();
        this.emit('game-lost');
      }
    }
  }

  getTimeString(): string {
    return this.clockText.text;
  }

  pauseTimer(): void {
    if (this.timerEvent) {
      this.timerEvent.paused = true;
    }
  }

  resumeTimer(): void {
    if (this.timerEvent) {
      this.timerEvent.paused = false;
    }
  }

  tabSwitchedHidden(isGameEnded: boolean): void {
    console.warn('hidden game ended', isGameEnded);
    if (isGameEnded) {
      return;
    }
    this.hiddenTimestamp = new Date().getTime();
    if (this.timeSeconds > 0) {
      this.pauseTimer();
    }
  }

  tabSwitchedVisible(isGameEnded: boolean): void {
    console.warn('visible game ended', isGameEnded);
    if (isGameEnded) {
      return;
    }
    if (this.timeSeconds > 0) {
      const currTimestamp = new Date().getTime();
      const diffTimeSeconds = Math.ceil((currTimestamp - this.hiddenTimestamp) / 1000);
      this.timeSeconds -= diffTimeSeconds;
      if (this.timeSeconds > 0) {
        this.clockText.text = formatTime(this.timeSeconds);
        this.resumeTimer();
      } else {
        this.clockText.text = formatTime(0);
        this.killRunOutTimer();
        this.emit('game-lost');
      }
    }
  }

  private killRunOutTimer() {
    if (this.runOutTween && this.runOutTween.isPlaying()) {
      this.runOutTween.remove();
      this.runOutTween = null;
    }
  }

  private timerRunningOutAnimation() {
    this.killRunOutTimer();
    this.runOutTween = this.scene.tweens.add({
      targets: this,
      alpha: 0,
      yoyo: true,
      ease: TWEEN_EASING.QUAD_EASE_OUT,
      duration: 100,
      repeat: 3,
      onComplete: () => {
        this.alpha = 1;
      },
    });
  }
}
