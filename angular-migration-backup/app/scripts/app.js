'use strict';

/**
 * @ngdoc overview
 * @name familiadaApp
 * @description
 * # familiadaApp
 *
 * Main module of the application.
 */
 angular
 .module('familiadaApp', [
 	'ngAudio'
 	]);

 angular.module('familiadaApp').controller('mainCtrl', ['$scope', 'questions','participants','soundService',
 	function($scope, questions, participants,soundService){

 		$scope.round = 0;
 		$scope.participants = {
 			family1 : {
 				name: participants.family1.name,
 				score : 0,
 				wrongAnswers: 0
 			},
 			family2 : {
 				name: participants.family2.name, 
 				score : 0,
 				wrongAnswers: 0
 			}
 		};

 		$scope.allQuestions = questions;
 		$scope.questions = [];
 		$scope.familyInCharge = undefined;

 		$scope.swithToFamily1 = function(){
 			$scope.familyInCharge = $scope.participants.family1;
 		};

 		$scope.swithToFamily2 = function(){
 			$scope.familyInCharge = $scope.participants.family2;
 		};

 		$scope.switchToNoFamilyInCharge = function(){
 			$scope.familyInCharge = undefined;
 		};

 		$scope.prepareQuestions = function (){
 			if(questions.length <= $scope.round){
 				return;	
 			} 

 			var currentRoundQuestions = questions[$scope.round].answers;
 			var preparedQuestions = [];
 			for (var index in currentRoundQuestions){
 				preparedQuestions.push(angular.extend(currentRoundQuestions[index], { state: false }));
 			}

 			$scope.questions = preparedQuestions;
 			$scope.participants.family1.wrongAnswers = 0;
 			$scope.participants.family2.wrongAnswers = 0;
 		}; 

 		$scope.showDivHelp = false;
 		$scope.showHelp = function(){
 			$scope.showDivHelp = !$scope.showDivHelp;
 		};

 		$scope.getAnswerScore = function (answer){
 			if(answer.state){
 				return answer.score;
 			}

 			return '__';
 		};

 		$scope.getAnswerText = function(answer){
 			if(answer.state){
 				return answer.answer;
 			}

 			return '.................................';
 		};

 		$scope.getFamily1WrongPoints = function(){
 			return new Array($scope.participants.family1.wrongAnswers);
 		}; 

 		$scope.getFamily2WrongPoints = function(){
 			return new Array($scope.participants.family2.wrongAnswers);
 		};

 		$scope.answerQuestion = function(index){
 			if($scope.questions.length <= index){
 				return;
 			} 

/* 			if(!$scope.familyInCharge){
 				return;
 			}*/

 			var answer = $scope.questions[index];
 			
 			if(!answer.state){
 				answer.state = true;

 				if(angular.isDefined($scope.familyInCharge) && angular.isDefined($scope.familyInCharge.score)){
 					$scope.familyInCharge.score += answer.score;	
 				}

 				soundService.playWinSound();
 			}else{
 				answer.state = false;
 				if(angular.isDefined($scope.familyInCharge) && angular.isDefined($scope.familyInCharge.score)){
 					$scope.familyInCharge.score -= answer.score;	
 					if($scope.familyInCharge.score < 0){
 						$scope.familyInCharge.score = 0;	
 					}
 				}
 			}
 			
 		};

 		$scope.wrongAnswer = function(){

 			if(angular.isDefined($scope.familyInCharge) && angular.isDefined($scope.familyInCharge.wrongAnswers)){
 				if($scope.familyInCharge.wrongAnswers < 3){
 					$scope.familyInCharge.wrongAnswers++;
 				}
 			}

 			soundService.playLoseSound();
 		};

 		$scope.nextRound = function(){
 			$scope.round++;

 			if($scope.allQuestions.length <= $scope.round){
 				$scope.summarize();
 			}else{
 				$scope.prepareQuestions();
 			}
 		};

		$scope.playIntro = function(){
			soundService.playIntroSound();
		};

 		$scope.summarize = function(){
 			$scope.showSummary = true;
 			
 			var victoryFamily = $scope.participants.family1.score > $scope.participants.family2.score ? 
 			$scope.participants.family1 : $scope.participants.family2;

 			$scope.victoryFamily = victoryFamily;
 		};

 		$scope.prepareQuestions();
 	}]);


angular.module('familiadaApp').factory('soundService', ['ngAudio', function(ngAudio){
	var service = {};
	var startIntro = ngAudio.load('sounds/intro.mp3'); 
	var win = ngAudio.load('sounds/dobrze.mp3'); 
	var lose = ngAudio.load('sounds/zla.mp3'); 

	var isPlaying = true;

	service.playWinSound = function(){	
		win.play();
	};

	service.playLoseSound = function(){
		lose.play();
	};

	service.playIntroSound = function(){
		if(isPlaying){
			startIntro.stop();
			isPlaying = false;
		}else{
			isPlaying = true;
			startIntro.play();
		}
	};

	service.muteAll = function(){
		ngAudio.mute();
	};

	return service;
}]);


$(document).ready(function(){

	$(window).keydown(function(event){
		var scope = angular.element($('#mainCtrl')).scope();
		// window.alert(event.keyCode);
		if(event.keyCode > 48 && event.keyCode < 54){
			var answerIndex = event.keyCode - 49;

			scope.$apply(function(){
				scope.answerQuestion(answerIndex);
			});
		}

		if(event.keyCode === 32){
			scope.$apply(function(){
				scope.nextRound();
			});
		}

		if(event.keyCode === 67){
			scope.$apply(function(){
				scope.swithToFamily2();
			});
		}

		if(event.keyCode === 90){
			scope.$apply(function(){
				scope.swithToFamily1();
			});
		}

		if(event.keyCode === 87){
			scope.$apply(function(){
				scope.wrongAnswer();
			});
		}

	});

});

angular.module('familiadaApp').constant('participants', {
	family1: {
		name:'Zbieciowie'
	},
	family2: {
		name:'Cieslakowie'
	}
});

angular.module('familiadaApp').constant('questions', [

{	
	question: 'Więcej niż jedno zwierze:', 
	answers: [
	{answer : 'lama', score:34},
	{answer : 'stado', score:27},
	{answer : 'wataha', score:19},
	{answer : 'owca', score:14},
	{answer : 'klucz', score:6},
	]
},
{	
	question: 'Największe państwo pod względem powierzchni to:', 
	answers: [
	{answer : 'Rosja', score:35},
	{answer : 'Kanada', score:25},
	{answer : 'Chiny', score:20},
	{answer : 'USA', score:15},
	{answer : 'Radom', score:5}
	]
},
{	
	question: 'Co może być weselne:', 
	answers: [
	{answer : 'wodka', score:38},
	{answer : 'klimat', score:32},
	{answer : 'tort', score:18},
	{answer : 'sala', score:12}
	]
},

{	
	question: 'Jakie znasz drapieżne zwierze?', 
	answers: [
	{answer : 'Tygrys', score:48},
	{answer : 'Lew', score:37},
	{answer : 'Wunsz', score:15}
	]
},
{	
	question: 'Co kojarzy Ci się z wizyta u babci?', 
	answers: [
	{answer : 'Zjedz cos/Czy jestes glodny?', score:44},
	{answer : 'Slodycze', score:38},
	{answer : 'Wakacje ', score:18}
	]
},

]);