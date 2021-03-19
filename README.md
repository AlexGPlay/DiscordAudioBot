# DiscordAudioBot

Discord bot that can play audios if they have been uploaded before, the commands are the following:

- ?play

Play an already existing audio. For example:

?play meme

This will play an audio that has been uploaded with the key meme.


- ?upload

Uploads a new audio with the key that will be used to play it. For example:

?upload meme <attachment>
  
The attachment is the file that will be used, this command must be invoked in a message that has one attachment.

- ?remove

Removes an audio from the list. For example:

?remove meme

- ?list

Lists the current keys that can play an audio. For example, if the meme key has been uploaded ?list will return that key.
