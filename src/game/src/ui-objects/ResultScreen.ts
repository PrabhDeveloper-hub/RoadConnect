import { CAM_CENTER } from '../cfg/game-config';
import { CUSTOM_EVENTS, GAME_FONT, RESULT_SCREEN_CONFIG } from '../cfg/game-constants';
import { TWEEN_EASING } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';

export default class ResultScreen extends Phaser.GameObjects.Container {
  scene: AbstractScene;
  gameStatusText!: Phaser.GameObjects.Text;
  nextButton!: Phaser.GameObjects.Image;
  retryButton!: Phaser.GameObjects.Image;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;
    this.addText();
    this.addNextButton();
    this.addRetryButton();
    this.addTouchHandler();
    this.setVisible(false);
    this.setScale(0);
    this.scene.add.existing(this);
  }

  private addText() {
    this.gameStatusText = this.scene.add
      .text(0, -100, 'Completed!', {
        fontFamily: GAME_FONT,
        fontSize: RESULT_SCREEN_CONFIG.fontSize,
        resolution: 3,
        color: RESULT_SCREEN_CONFIG.fontColor,
      })
      .setAlign('center')
      .setOrigin(0.5, 0.5);
    this.add(this.gameStatusText);
  }

  private addNextButton() {
    this.nextButton = this.scene.add.image(0, 200, '');
    this.nextButton.setVisible(false);
    this.nextButton.setScale(0);
    this.add(this.nextButton);
  }

  private addRetryButton() {
    this.retryButton = this.scene.add.image(0, 200, 'replay');
    this.retryButton.setVisible(false);
    this.retryButton.setScale(0);
    this.add(this.retryButton);
  }

  private addTouchHandler() {
    this.nextButton.setInteractive();
    this.nextButton.on('pointerdown', () => {
      this.nextButton.emit(CUSTOM_EVENTS.BUTTON_CLICKED);
      this.scene.audioManager.playClick();
      this.clickTween(this.nextButton);
    });
    this.retryButton.setInteractive();
    this.retryButton.on('pointerdown', () => {
      this.retryButton.emit(CUSTOM_EVENTS.BUTTON_CLICKED);
      this.scene.audioManager.playClick();
      this.clickTween(this.retryButton);
    });
  }

  private clickTween(button: Phaser.GameObjects.Image) {
    this.scene.tweens.add({
      targets: button,
      scale: 0.9,
      yoyo: true,
      ease: TWEEN_EASING.SINE_EASE_IN,
      duration: 75,
      onComplete: () => {
        this.hideResult();
      }
    });
  }

  private setGameStatus(won: boolean): void {
    if (won) {
      this.gameStatusText.text = `Completed!`;
      this.scene.audioManager.play('level-up');
    } else {
      this.gameStatusText.text = `Failed!`;
    }
  }

  private hideResult(): void {
    this.retryButton.setVisible(false);
    this.retryButton.setScale(0);
    this.nextButton.setVisible(false);
    this.nextButton.setScale(0);
    this.setVisible(false);
    this.setScale(0);
  }

  showResult(won: boolean) {

    this.setGameStatus(won);
    const timeline = this.scene.tweens.createTimeline();
    timeline.add({
      targets: this,
      scale: 1,
      ease: TWEEN_EASING.SINE_EASE_IN,
      duration: 75,
      onStart: () => {
        this.setVisible(true);
      }
    });
    timeline.add({
      targets: (won) ? this.nextButton : this.retryButton,
      scale: 1,
      ease: TWEEN_EASING.QUAD_EASE_IN,
      duration: 100,
      offset: '-=50',
      onStart: () => {
        if (won) {
          this.nextButton.setVisible(true);
        } else {
          this.retryButton.setVisible(true);
        }
      },
    });
    timeline.play();
  }


}
