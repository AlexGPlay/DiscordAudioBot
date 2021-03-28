const client = require("../../discord");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const enqueueListenAudio = require("../play/enqueueListenAudio");
const fs = require("fs");

const { apiKey, region } = JSON.parse(fs.readFileSync("./azureKeys.json"));

module.exports = async function listenUser(userId, channelId, serverId) {
  const voiceChannel = await client.channels.fetch(channelId);
  if (!voiceChannel) return;
  const connection = await voiceChannel.join();

  const audio = connection.receiver.createStream(userId, { mode: "pcm", end: "silence" });

  const speechConfig = sdk.SpeechConfig.fromSubscription(apiKey, region);

  const format = sdk.AudioStreamFormat.getWaveFormatPCM(48000, 16, 2);
  const pushStream = sdk.AudioInputStream.createPushStream(format);

  const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
  speechConfig.speechRecognitionLanguage = "es-ES";

  const speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  audio.on('data', data => pushStream.write(data));
  audio.on('end', () => {
    speechRecognizer.stopContinuousRecognitionAsync(
      () => console.log(`Stopped listening on server ${serverId}`),
      err => console.error(`Error stopping listening on server ${serverId}`, err)
    );
    pushStream.close();
  });

  speechRecognizer.startContinuousRecognitionAsync(
    () => console.log(`Listening on server ${serverId}`),
    err => console.error(`Error listening on server ${serverId}`, err)
  );

  speechRecognizer.recognized = (_, { result }) => {
    if (!result) return;
    const keywords = ["oido", "oidos"];
    const text = result.privText.toLowerCase().split(" ").map(e => e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, ""));
    console.log(`Detected text on server ${serverId}`, text);
    const idx = text.findIndex(word => keywords.includes(word));
    console.log("Id", idx);
    if (idx === -1) return;
    const possibleAudios = text.slice(idx + 1).map(audio => `?${audio}`);
    console.log(`To push audios on server ${serverId}`, possibleAudios);
    enqueueListenAudio(possibleAudios, channelId, serverId);
  };

}