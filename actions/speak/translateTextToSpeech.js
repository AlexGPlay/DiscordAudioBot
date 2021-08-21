const fs = require("fs");

const sdk = require("microsoft-cognitiveservices-speech-sdk");
const { apiKey, region } = JSON.parse(fs.readFileSync("./azureKeys.json"));

const AUDIO_PATH = "./tmp/audio.wav";

module.exports = (text) => {
  const speechConfig = sdk.SpeechConfig.fromSubscription(apiKey, region);
  speechConfig.speechSynthesisLanguage = "ca-ES";
  speechConfig.speechSynthesisVoiceName = "ca-ES-EnricNeural";

  const audioConfig = sdk.AudioConfig.fromAudioFileOutput(AUDIO_PATH);
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  return new Promise((resolve, reject) => {
    synthesizer.speakTextAsync(
      text,
      (result) => {
        synthesizer.close();
        if (result) resolve({ success: true, audio: AUDIO_PATH });
        resolve({ success: false });
      },
      (error) => {
        synthesizer.close();
        reject({ success: false, error });
      }
    );
  });
};
