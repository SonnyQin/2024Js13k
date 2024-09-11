// Load all sounds before the game begins
import SoundPlayer from "./SoundPlayer";
import { S_Normal } from "./Songs/S_Normal";
import { S_Alert } from "./Songs/S_Alert";
import { S_Escape } from "./Songs/S_Escape";
import { S_Relief } from "./Songs/S_Relief";
import { S_Win } from "./Songs/S_Win";
import { S_Lose } from "./Songs/S_Lose";
import {S_Tired} from "./Songs/S_Tired";

export default class SoundManager {
    private static _Instance: SoundManager | null = null;

    private mSoundPlayers: { [key: string]: SoundPlayer } = {};

    private constructor() {
        this.initializeSounds();
    }

    private initializeSounds() {
        const soundConfigs = [
            { key: 'S_Normal', sound: S_Normal, repeat: true },
            { key: 'S_Alert', sound: S_Alert, repeat: true },
            { key: 'S_Escape', sound: S_Escape, repeat: true },
            { key: 'S_Tired', sound: S_Tired, repeat: true},
            { key: 'S_Relief', sound: S_Relief, repeat: true },
            { key: 'S_Win', sound: S_Win, repeat: false },
            { key: 'S_Lose', sound: S_Lose, repeat: false }
        ];

        soundConfigs.forEach(config => {
            const player = new SoundPlayer();
            player.SetSound(config.sound);
            player.SetRepeat(config.repeat);
            this.mSoundPlayers[config.key] = player;
        });
    }

    public Play(name: string) {
        this.mSoundPlayers[name]?.Play();
    }

    public Stop(name: string) {
        this.mSoundPlayers[name]?.Stop();
    }

    public StopAll()
    {
        Object.values(this.mSoundPlayers).forEach(player => player.Stop());
    }

    public static get Instance(): SoundManager {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
}
