var _ = require('lodash');

var automata = [{
		name: 'f0',
		transitions: [
		// {
		// 	t: ' ', s: 'f1'
		// }
		],
		failTransition: 'f0'
	}],
	number_of_nodes = 1;

var finalStates = [
// 'f4', 'f7', 'f10'
];

var currentState = automata[0];

function getStateByName(name){
	for (var i = automata.length - 1; i >= 0; i--) {
		if (automata[i].name == name) {
			return automata[i];
		}
	};

	return undefined;
}

function transition(term){
	for (var i = 0; i < currentState.transitions.length; i++) {
		if (currentState.transitions[i].t == term) {

			currentState = getStateByName(currentState.transitions[i].s);
			return true;
		}
	};

	return false;
}

function isInFinalState(){
	return _.indexOf( finalStates, currentState.name) >= 0;
}

function reset(){
	currentState = getStateByName(currentState.failTransition);
}

function getCurrentState(){
	return currentState;
}

function addState(state, term){
	var newState = {
		name: 'f' + number_of_nodes,
		transitions: [],
		failTransition: 'f0'
	};

	state.transitions.push({ t: term, s: 'f' + number_of_nodes });
	automata.push(newState);

	number_of_nodes++;
}

function addWord(word){
	var transition_term;
	for (var i = 0; i < word.length; i++) {
		transition_term = word[i];
		if (!transition(word[i])) {
			addState(getCurrentState(), word[i]);
			transition(word[i]);
		}
	}
	finalStates.push(getCurrentState());
}

function getAutomata(){

	console.log('states > ', automata);
	console.log('final:states > ', finalStates);
}

function minify(){

}

module.exports = {
		getStateByName: getStateByName,
	    transition: transition, 
	    isInFinalState: isInFinalState,
	    reset: reset,
	    getCurrentState: getCurrentState,
	    addWord: addWord,
	    getAutomata: getAutomata
};