# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Jake Yim

Time spent: 8 hours spent in total

Link to project: https://faceted-poised-trumpet.glitch.me

## Required Functionality

The following **required** functionality is complete:

* [ ] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [ ] "Start" button toggles between "Start" and "Stop" when clicked. 
* [ ] Game buttons each light up and play a sound when clicked. 
* [ ] Computer plays back sequence of clues including sound and visual cue for each button
* [ ] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [ ] User wins the game after guessing a complete pattern
* [ ] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [ ] More than 4 functional game buttons
* [ ] Playback speeds up on each turn
* [ ] Computer picks a different pattern each time the game is played
* [ ] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] User has a limited amount of time to enter their guess on each turn

## Video Walkthrough

Here's a walkthrough of implemented user stories:
![](your-link-here)


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

   https://www.w3schools.com/colors/colors_names.asp
   https://stackoverflow.com/questions/3089475/how-can-i-create-a-5-second-countdown-timer-with-jquery-that-ends-with-a-login-p/28098187
   https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown
   https://www.w3schools.com/jsref/prop_html_innerhtml.asp

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

   A challenge I encountered was when I was implementing a ticking clock to limit how much time the player has to make guesses. Since there wasn't any similar code in the tutorial regarding setInterval and clearInterval, I had to search online for the syntax and logic. Looking in stackoverflow, the main problem I had was that I didn't understand how to connect the js and html to actually display the countdown. To solve this, I searched through multiple possible implementations on stackoverflow. At first, I tried adding a class and id to an html tag and then return the text within the js file using $(".class").text(id). However, the timer would never show up on the page, and I didn't know how to fix it. Thus, I broadened my search to "displaying text in javascript", which recommended I used .innerHTML instead. Using the syntax I found in w3schools.com, I was able to successfully display the timer. Another challenge I encountered had to do with the logic of the timer itself. Specifically, I had trouble figuring out when to set and clear the interval. I knew I had to restart the timer after each new clue sequence, but I couldn't call my timer function directly within the guess function, otherwise it would restart after every guess, instead of after every clue sequence. As such, I called the timer function right after a new pattern is created in the generatePattern function. Given this, I also knew that I would have to clear the interval for two cases: when the timer reaches 0 (in which the player loses), and when the next clue sequence is given (guessCounter == progress). Thus, initially I added both cases directly within my timer function in the form of an if/if else condition. However, this didn't work which I assume was becasue I was using (guessCounter == progress) outside of the guess function. As such, I overcame this by creating a new global variable called time to hold my interval, so I can access it outside of the timer function. This allowed me to clearInterval(time) directly within the guess function. This fixed my issue where the countdowns would overlap after every pattern sequence because they weren't being cleared/reset.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
   
   Personally, I've had some experience using web development technologies, so I understand some of the basics of html, css, and js. However, for many of the other web technologies, I don't actually understand the fundamentals of how they work. For instance, in one project, I used npm start to run the React/Springboot web app that I was developing with other classmates. But what exactly is npm? I know that it is a package manager, but what does that entail, and what are packages? Moreover, I understand that npm start is a specific node command, but what is node.js and how is different from say, react.js? In other words, my general question is how should we go around deciding what tech stack to use during web development, and what exaclty each of the specific frameworks and tools even do. 

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

   If I had a few more hours, I would like to implement a level system so that the game would have more progression and give users a greater sense of accomplishment. Specifically, I would create a new mode where after each level, the length of the pattern sequence becomes longer until the player loses. Once the player loses a certain level, the game resets to level 0. In this mode, I would also create a new variable to keep track of the current highscore with the highest level reached, which would then be displayed next to the start button. To do so, I would have to first alter the guess function so that there is no more winGame since it only ends when a player loses. Rather, when progress == pattern.length-1, I simply recall the generatePattern function and create a new pattern of greater length by one. To do this, I would also have to alter my generatePattern function to take in a variable that represents the length, since currently it only generates random patterns of length 8. Meanwhile, once a player loses, I'll add a comparison between the current highscore variable and the level that was reached in the round that was just played. If the new level is higher, than I set that as the new highscore. Then in the html, I create a new header that will display this variable, though I am not entirely sure how to do so (I did however read that this could be done directly within the js file using .innerHTML and calling classes in the HTML file). Finally, to actually access this mode, I would add a button next to the start button that says "endless mode", which leads to a new html page when pressed. As such, I would have to create a new endless.html and a script that's specific to that page. This would be very similar to what was done already for the default mode. What remains is the linking of pages, which can be done with an A HREF tag. 

## License

    Copyright [Jake Yim]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
