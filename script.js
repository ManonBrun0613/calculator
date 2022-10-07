// Basic functions needed for a calculator : 
function add(a,b) {
    return a+b;
};

function substract(a,b) {
    return a-b;
};

function multiply(a,b) {
    return a*b;
};

function divide(a,b) {
    return a/b;
};

// Global function calling the basic ones :
function operate(a,b,operator) {
    if (operator=='+') {
        return add(a,b);
    } else if (operator=='-') {
        return substract(a,b);
    } else if (operator=='*') {
        return multiply(a,b);
    } else if (operator=='/') {
        return divide(a,b);
    }
}

// Style the buttons when mouse is hovering and add their value to a variable to be able to display them
buttons=document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter',function(e) {
        e.target.classList.add('hover');
    });
    button.addEventListener('mouseout',function(e) {
        e.target.classList.remove('hover');
    });
});

display= document.querySelector('.display');
displayContent= '';
display.textContent= displayContent;

// the function userError updates the display content taking into account possible user errors:
function userError(e) {
    let isClickOperator=true;
    let isLastOperator=true;
    let lastElement='';
    if (e.target.textContent!='=') {

        isClickOperator = isNaN(Number(e.target.textContent));

        // make sure we don't start a calculation with an operator, but with a number:

        if (!(displayContent=='' && isClickOperator)) {
            if (displayContent!='') {
                lastElement=String(displayContent).charAt(displayContent.length-1);
                isLastOperator = isNaN(Number(lastElement));
            } else {
                isLastOperator=false;
            }
                // make sure we don't have an operator following an operator:
            if (!(isLastOperator && isClickOperator)) {

                // make sure we don't write outside the display div:
                if (displayContent.length<=18) {
                    displayContent=displayContent+e.target.textContent;
                    display.textContent=displayContent;
                };
            };
        };
    };
};
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        (userError(e));
    });
});

// Take care of the special equals button, so that it triggers the calculation 
equals=document.querySelector('.equals');

equals.addEventListener('mousedown', function(){
    (store(displayContent))});

equals.addEventListener('mouseup',calculate)

// Functions to call when clicking the equals button : 


// the store() function takes the display value and stores the numbers in one array and operators in another :
function store(str) {

    let numbers = '';
    let operators = '';

    for (let i=0;i<=str.length-1;i++) {

        if (isNaN(Number(str[i]))&& str[i]!='.')  {
            numbers+=' ';

            if (str[i]=='×') {
                operators+='*';
            } else if (str[i]=='÷') {
                operators+='/';
            } else {
                operators+=str[i];
            }

        } else {
            numbers+=str[i];
        }
    }

    numbersArray=numbers.split(' ');
    operatorsArray=operators.split('');   
}

// the function indexPriority returns the index of the first instance of either '*' or '/' in the operators array.
function indexPriority (firstDivide,firstMultiply) {
    if (firstDivide==-1) {
        firstCalculated=firstMultiply;
    } else if (firstMultiply==-1) {
        firstCalculated=firstDivide;
    }else {
        firstCalculated=Math.min(firstDivide,firstMultiply);
    }
    return firstCalculated
}


function calculate ()  {
    let result=0;
    let firstMultiply=operatorsArray.indexOf('*');
    let firstDivide=operatorsArray.indexOf('/');
    let firstCalculated=0;
    let offset=0 // the offset is due to the length of numbersArray changing after every iteration
    // as long as we have multiplications and divisions (the loop is there to take into account calculus priorities):
    while (!(firstMultiply==-1 && firstDivide==-1)) {
        firstCalculated=indexPriority(firstMultiply,firstDivide)-offset;
        
        result=operate(Number(numbersArray[firstCalculated]),Number(numbersArray[firstCalculated+1]),operatorsArray[firstCalculated+offset]);
        
        numbersArray=sortNumbers(numbersArray,firstCalculated,result);

        operatorsArray[firstCalculated+offset]=' '

        firstMultiply=operatorsArray.indexOf('*');
        firstDivide=operatorsArray.indexOf('/');
        offset+=1
    }

    operatorsArray=removeChar(operatorsArray, ' ')
    if (operatorsArray.length!=0) {
        result = calcAddSub(operatorsArray,numbersArray);
    } 
    displayContent=result;
    display.textContent=displayContent;

    return result
}

// Function to call when clicking the AC button, it resets everything.
function cancel() {
    displayContent='';
    display.textContent=displayContent;
}

cancelButton = document.querySelector('.AC');

cancelButton.addEventListener('click',cancel);


// the function removeChar(array,char) removes all instances of a character in an array
function removeChar(array,char) {
    let array2=array;
    array=[];
    for (let i of array2) {
        if (i!=char) {
            array.push(i)
        };
    };
    return array;
};

// the function sortNumbers sorts out the numbers array so that it can be used again 
// (the previous result becomes the first element and the rest of the array consists
// of the numbers that have not been treated yet)
function sortNumbers(array,index,value) {
    let temporaryArray=array;
    array=[];
    let len =temporaryArray.length-2
    for (let i=0;i<=len;i++) {
        if (i==index) {
            array[i]=value;
        } else if (i<index) {
            array[i]=temporaryArray[i];
        } else {
            array[i]=temporaryArray[i+1];
        }
    }
    return array
}

// the function calcAddSub returns the final result as it computes
// the final additions and substractions
function calcAddSub(opArray,numArray) {
    let len = opArray.length-1;
    let result=0
    let a=0;
    let b=0;
    for (i=0;i<=len;i++) {
        a = Number(numArray[0]);
        b = Number(numArray[1]);
        result=operate(a,b,opArray[i]);
        numArray=sortNumbers(numArray,0,result)
    }
    return result
}

