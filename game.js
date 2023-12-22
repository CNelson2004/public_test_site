const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('options-buttons')

let state = {}

function startGame(){
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while(optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('button')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "You awake in a circular room surrounded by doors. Each with a different number on them. " +
            "On the floor beneath you reads: 2x+4=0",
        options: [
            {
                text: '-2',
                setState: {correct: true},
                nextText: 2
            },
            {
                text: '2',
                setState: {correct: false},
                nextText: 2
            },
            {
                text: '0',
                setState: {correct: false},
                nextText: 2
            },
            {
                text: '4',
                setState: {correct: false},
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "Venturing through the door you find a set of three magical glass treasure chests with a sign hanging above them.",
        options: [
            { //This is the start of an array of options
                text: 'A chest containing a magical sword.',
                requiredState: (currentState) => currentState.correct,
                setState: { correct: false, sword: true},
                nextText: 3
            },
            {
                text: 'A chest containing a magical shield.',
                requiredState: (currentState) => currentState.correct,
                setState: { correct: false, shield: true},
                nextText: 3
            },
            {
                text: 'A chest containing a magical bow.',
                requiredState: (currentState) => currentState.correct,
                setState: { correct: false, bow: true},
                nextText: 3
            },
            {
                text: 'Ignore and move past the chests.',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: "After leaving the treasure room you walk through the door and step into a forest.",
        options: [
            { //This is the start of an array of options
                text: 'Walk straight ahead.',
                nextText: 4
            },
            {
                text: 'Turn left and walk.',
                nextText: 5
            },
            {
                text: 'Turn right and walk.',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: "Deciding to head straight ahead you run into a sleeping cyclops and get your head bashed in.",
        options: [
            {
                text: "Restart Game",
                nextText: -1 //Restarts the game
            }
        ]
    },
    {
        id: 5,
        text: "Deciding to head left you run into a sleeping cyclops and get your head bashed in.",
        options: [
            {
                text: "Restart Game",
                nextText: -1 //Restarts the game
            }
        ]
    },
    {
        id: 6,
        text: "Deciding to right you run into a sleeping cyclops and get your head bashed in.",
        options: [
            {
                text: "Restart Game",
                nextText: -1 //Restarts the game
            }
        ]
    }
]

startGame()
