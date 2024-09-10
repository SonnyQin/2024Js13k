import { CPlayer } from "./SoundBox";

export default class SoundPlayer {
    constructor()
    {
        this.mIsRepeat=false;
    }

    public Play() {
        // @ts-ignore
        this.mPlayer = new CPlayer();
        this.mPlayer.init(this.mSelectSound);

        // Perform music generation synchronously
        let done = false;
        while (!done) {
            done = this.mPlayer.generate() >= 1; // Check if generation is complete
        }

        // Create audio element and play the generated song
        const wave = this.mPlayer.createWave(); // Get generated wave data
        this.mAudio = document.createElement("audio");
        this.mAudio.src = URL.createObjectURL(new Blob([wave], { type: "audio/wav" }));
        if(this.mIsRepeat)
            this.mAudio.loop = true; // Set the audio to loop
        else
            this.mAudio.loop=false;
        this.mAudio.play(); // Play the audio
    }

    public Stop() {
        if (this.mAudio) {
            this.mAudio.pause(); // Pause the audio
            this.mAudio.src = ""; // Clear the audio source
        }
    }

    public SetSound(sound: any) {
        this.mSelectSound = sound;
    }

    private mPlayer: any;
    private mSelectSound: any;
    // @ts-ignore
    private mAudio: HTMLAudioElement;
    private mIsRepeat:boolean;

    public SetRepeat(repeat:boolean)
    {
        this.mIsRepeat=repeat;
    }

    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }

    private static _Instance: SoundPlayer;
}
