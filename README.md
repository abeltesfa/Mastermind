# Mastermind

## Introduction
Welcome to the Mastermind game! This is a game where the CPU has generated a random combination of 4 numbers from 0-7. Your job as the player is to pick 4 numbers and guess the correct combination within the time limit. You will have 10 guesses. Good luck!

## Technologies Used
- Languages: Javascript, HTML, CSS
- Tools: Live Server

## Picture of Site
![image](https://user-images.githubusercontent.com/99838762/211006294-72b12938-5633-47e8-8266-0ca4e2db751f.png)

## Features
-User is able to select from a range of numbers 0-7 and the user selection will appear in the selection section
-User has 10 guesses to guess the random combination of 4 numbers. After 10 guesses the user fails the game.
-There is a timer in the top right that will countdown from 5 minutes and the user will lose if they cannot guess before timer runs out
-Every guess the user makes will be captured in the feedback section with hints on how to reach the correct combination
-The hints will specify if there are numbers in the correct position or if there are correct numbers that are not in the correct position
-If the user fails the game, an alert will let the user know they lost the game and will reveal the correct answer and then reload the game
-If the user wins the game, an alert will let the user know they won the game and then reload the game

## Development
-Used Live Server to launch a local development server to open a browser window with the HTML file created in this project
-Set up my html structure to contain sections that would contain a space for the user to see their selections, for the user to see feedback and their previous selections, and numbers that could be selected
-Created a JavaScript file to run as the script for the HTML file
-In the JS file I added a click event listener to allow the user to select from the options of 0-7 that I provided in the HTML file and insert those values into an array that I created to hold those values. The information in this array is displayed in the selected section
-Made an API call to the random.org API to generate 4 values from 0-7 using the necessary parameters in the URL
-Created functions to compare the user's selections to the random numbers generated from the API. Created hints and feedback to be displayed in the respective section using the analysis provided by the comparison functions
-Created a timer that will count down from 5 minutes and will cause the user to fail the game if they are unable to come up with the correct answer by the end of the countdown
-Created a guess count that will decrement with each user guess until it reaches 0 which would cause the user to fail the game

## Running the Site
-Open the repository in VSCode and using the live server extension, open a browser window loading the HTML file.
-If the above technology is not available, use the necessary or available technology to load the HTML file to your browser.
