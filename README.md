# liri-node-app

This app is a strictly node-based app that functions similarly to Apple's automated search/help-engine, Siri.

It uses multiple api functions, internal requests, and an inquirer process for interactivity with the user. It is broken down into three main options:
 - Concert Information  (BandsInTown)
 - Song Information  (Spotify)
 - Music Information  (OmDb)

It also access the local 'random.txt' file to pull information when the "Random" option is selected. Any key phrases within the text document will be filtered to accomplish a random search between concert, song, and movie information. The current preset is Backstreet Boys, "I Want It That Way" (for the purpose of this assignment) - it can easily be transformed to append information based on user input, to build a database that can be a library for the random information requests.

(I've also included a completely unnecessary - but cool? - "Creator" option, which shows a picture of me in ascii format, and my name in Star Trek font).

The below link is a more detailed, visual view (screen-recording) of the functionality:

https://drive.google.com/file/d/16WEiuwU9f2ghenvn5qHfIjJTnSmiJuxM/view