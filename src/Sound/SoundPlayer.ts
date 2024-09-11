import { CPlayer } from "./SoundBox";

export default class SoundPlayer {
    constructor() {
        this.mIsRepeat = false;
        this.mVolume = 1.0; // 默认音量为最大值
    }

    public async Play() {
        try {
            // @ts-ignore
            this.mPlayer = new CPlayer();
            this.mPlayer.init(this.mSelectSound);

            // Perform music generation asynchronously
            while (this.mPlayer.generate() < 1) {
                await new Promise(resolve => setTimeout(resolve, 100)); // Wait for a short time before checking again
            }

            // Create audio element and play the generated song
            const wave = this.mPlayer.createWave(); // Get generated wave data
            this.mAudio = document.createElement("audio");
            const audioBlob = new Blob([wave], {type: "audio/wav"});
            const audioUrl = URL.createObjectURL(audioBlob);
            this.mAudio.src = audioUrl;
            this.mAudio.loop = this.mIsRepeat; // Set the audio to loop based on mIsRepeat
            this.mAudio.volume = this.mVolume; // Set the volume based on mVolume
            await this.mAudio.play(); // Play the audio

            // Clean up after playback ends
            this.mAudio.onended = () => {
                URL.revokeObjectURL(audioUrl); // Revoke the Blob URL
            };
        } catch (error) {
            console.error('Error generating or playing audio:', error);
        }
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

    public SetVolume(volume: number) {
        if (this.mAudio) {
            this.mAudio.volume = Math.max(0, Math.min(volume, 1)); // Ensure volume is between 0.0 and 1.0
        }
        this.mVolume = Math.max(0, Math.min(volume, 1)); // Update internal volume state
    }

    public SetRepeat(repeat: boolean) {
        this.mIsRepeat = repeat;
    }

    private mPlayer: any;
    private mSelectSound: any;
    // @ts-ignore
    private mAudio: HTMLAudioElement;
    private mIsRepeat: boolean;
    private mVolume: number; // Internal state to keep track of volume
}
