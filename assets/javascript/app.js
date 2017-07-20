$(document).ready(function(){
hide();

//Variables
var rnum;
var globalIndex = 0;
var userButton;

var wins = 0;
var losses = 0;
var noAnswer = 0;

//Timer Variables
var counter = 5;
var vcounter = 0;
var wait = 3;
var clockRunning = false;

var questionArray = [
	{
		question: 'Which spell does Vengeful Spirit have in common from the game "Dungeons & Dragons"?',
		correctAnswer: 'Magic Missile',
		answer: ['Fire Bolt', 'Thunderwave', 'Scorching Ray', 'Magic Missile']
	},
	{
		question: "Which actor and body builder gave reference to Sven's name?",
		correctAnswer: 'Sven-Ole Thorsen',
		answer: ['Brigitte Nielsen', 'Sven-Ole Thorsen', 'Nikolaj Coster-Waldau', 'Soren Pilmark']
	},
	{
		question: "Who is Gabe Newell's favorite Dota 2 hero?",
		correctAnswer: 'Sand King',
		answer: ['Crystal Maiden', 'Sand King', 'Keeper of the Light', 'Techies']
	},
		{
		question: "Prior to December 13th of 2013, Ostarion, the Wraith King was known as?",
		correctAnswer: 'Ostarion, the Skeleton King',
		answer: ['Ostarion, the Skeleton King', 'Ostarion, the Bone King', 'Ostarion, the Ghost King', 'Ostarion, the Death King']
	}
];

//Start Button
$('.start-button').on('click', function() {
	getQuestion();
});//End Start Button


//Function Section
	function getQuestion() {
		if (globalIndex == 4) {
		finalCheck();
		} else {

		document.getElementById('question').textContent = questionArray[globalIndex].question;

		for (var i = 0; i < questionArray[globalIndex].answer.length; i++) {
	          var a = $("<button>");
	          a.addClass("btn-toggle");
	          a.attr("data-num", questionArray[globalIndex].answer[i]);
	          a.text(questionArray[globalIndex].answer[i]);
	          $(".btn-toolbar").append(a);
	        }

		show();

	}
	}

	function show(){
		$('.toggle').show();
		$('#hdisplay').html('<h1>00:0' + counter + '</h1>');
		if (!clockRunning) {
		vcounter = setInterval(countDown, 1000);
		clockRunning = true;
		}
	}

	function countDown() {
		counter--;
		$('#hdisplay').html('<h1>00:0' + counter + '</h1>');
		if (counter == 0 || counter <= 0) {
			resetTimer();
			noAnswer++;
			nextQuestion();
		}
	}

	function nextQuestion(){
			resetQuestion();
			getQuestion();
	}

	function resetQuestion() {
		$(".btn-toolbar").empty();
		globalIndex++;
	}

	function hide(){
		$('.toggle').hide();
	}

	function getAnswer() {
			userButton = $(this).attr("data-num");

			checkAnswer();

			// console.log('userButton: ', userButton);
	}

	function checkAnswer() {

		if (userButton == questionArray[globalIndex].correctAnswer) {
			wins++;
			resetTimer();
			console.log('wins: ', wins);
			nextQuestion();
			// userButton = '';
			if (globalIndex == 4) {
				finalCheck();
			}

		} else {
			if (userButton != questionArray[globalIndex].correctAnswer) {
				losses++;
				resetTimer();
				console.log('losses', losses);
				nextQuestion();
				// userButton = '';
				if (globalIndex == 4) {
				finalCheck();
			}
			}
		}


	}//end function

	function resetTimer(){
				clearInterval(vcounter);
				counter = 5;
				show();
				clockRunning = false;
	}

	function finalCheck(){
		$(".btn-toolbar").empty();
		$("#question").empty();

		$('.btn-toolbar').html('<h1>Wins: ' + wins + '</h1></br></br>');
		$('.btn-toolbar').append('<h1>Losses: ' + losses + '</h1></br></br>');
		$('.btn-toolbar').append('<h1>Unanswered: ' + noAnswer + '</h1></br></br>');

		$('.btn-toolbar').append('<h1>Press the "Start!" button to play again!</h1>');


$('.start-button').on('click', function() {
		$(".btn-toolbar").empty();
		$("#question").empty();

		globalIndex = 0;
		userButton = '';

		wins = 0;
		losses = 0;
		noAnswer = 0;

		counter = 5;
		clearInterval(vcounter);
		clockRunning = false;	

		getQuestion();
});//End Start Button

	

		
	}

//End of Functions*********************************
 $(document).on("click", ".btn-toggle", getAnswer);

});// end document.ready

// Check off list:
//	Resize jumbotron
// 	change location of 5.3 folder
// noanswer checks

