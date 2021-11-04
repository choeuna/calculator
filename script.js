const OPERATORS = '/x+-';

const Buttons = (props) => {
  return (
    <div id='button-wrapper'>
      <button onClick={props.acPress} className='operation-button wide-button' id='clear'>AC</button>
      <button value='/' onClick={props.operationPress} className='operation-button' id='divide'>/</button>
      <button value='x' onClick={props.operationPress} className='operation-button' id='multiply'>x</button>
      
      <button value='7' onClick={props.numberPress} className='number-button' id='seven'>7</button>
      <button value='8' onClick={props.numberPress} className='number-button' id='eight'>8</button>
      <button value='9' onClick={props.numberPress} className='number-button' id='nine'>9</button>
      <button value='+' onClick={props.operationPress} className='operation-button' id='add'>+</button>
      
      <button value='4' onClick={props.numberPress} className='number-button' id='four'>4</button>
      <button value='5' onClick={props.numberPress} className='number-button' id='five'>5</button>
      <button value='6' onClick={props.numberPress} className='number-button' id='six'>6</button>
      <button value='-' onClick={props.operationPress} className='operation-button' id='subtract'>-</button>
      
      <button value='1' onClick={props.numberPress} className='number-button' id='one'>1</button>
      <button value='2' onClick={props.numberPress} className='number-button' id='two'>2</button>
      <button value='3' onClick={props.numberPress} className='number-button' id='three'>3</button>
      <button value='=' onClick={props.evaluatePress} className='operation-button tall-button' id='equals'>=</button>

      <button value='0' onClick={props.numberPress} className='number-button wide-button' id='zero'>0</button>
      <button value='.' onClick={props.decimalPress} className='number-button' id='decimal'>.</button>
      
    </div>
  )
}

const Display = (props) => {
  return (
  <div id='display-current'>
      {props.displayText}
  </div>
  )
}

const Formula = (props) => {
  return (
  <div id='display-formula'>
    {props.formulaText}
  </div>
  )
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formulaText: '',
      displayText: '0',
      currentVal: '',
      evaluated: false
    };
    this.numberPress = this.numberPress.bind(this);
    this.decimalPress = this.decimalPress.bind(this);
    this.acPress = this.acPress.bind(this);
    this.operationPress = this.operationPress.bind(this);
    this.evaluatePress = this.evaluatePress.bind(this);
  }
  
  numberPress(event) {
    if ((this.state.displayText === '0' && this.state.formulaText === '') || this.state.evaluated) {
      // if pressing the first number and it is not a leading zero, update display and formula
      if (event.target.value !== '0') {
        this.setState({
          displayText: event.target.value,
          formulaText: event.target.value
        });
      } else {
        // else restart the display after an evaluation with a 0
        this.setState({
          displayText: '0',
          formulaText: ''
        });
      };
      this.setState({evaluated: false});
    } else if (OPERATORS.includes(this.state.formulaText.charAt(this.state.formulaText.length-1))) {
      // if last value was an operator, update formula if it is non-zero
      if (event.target.value !== '0') {
        this.setState({
          formulaText: this.state.formulaText + event.target.value
        });
      };
      // update display regardless of value
      this.setState({
        displayText: event.target.value
      });
    } else {
      // it is a conitunation of a number, add to display and formula
      this.setState({
        displayText: this.state.displayText + event.target.value,
        formulaText: this.state.formulaText + event.target.value
      });
    };
  }
  
  decimalPress(event) {
    if (!this.state.displayText.includes('.') || this.state.evaluated) {
      // if there is no decimal in current number or it is a new number
      if (this.state.formulaText === '' || OPERATORS.includes(this.state.displayText) || this.state.evaluated) {
        // if adding a decimal to nothing, set to 0.
        console.log(this.state.evaluated);
        if (this.state.evaluated) {
          console.log("yes");
          this.setState({
            evaluated: false,
            displayText: '0' + event.target.value,
            formulaText: '0' + event.target.value
          });
        } else {
          this.setState({
            displayText: '0' + event.target.value,
            formulaText: this.state.formulaText + '0' + event.target.value
          });
        }
      } else {
        this.setState({
          displayText: this.state.displayText + event.target.value,
          formulaText: this.state.formulaText + event.target.value
        })
      }
    }
  }
  
  acPress(event) {
    this.setState({
      formulaText:'',
      displayText:'0'
    });
  }
  
  operationPress(event) {
    if (this.state.evaluated) {
      // if user wants to operate on answer of last calculation
      this.setState({
        evaluated: false,
        formulaText: this.state.displayText + event.target.value
      })
    } else if (isNaN(this.state.formulaText.charAt(this.state.formulaText.length-1))) {
      this.setState({
        // if last character was an operator, replace formula character
        formulaText: this.state.formulaText.slice(0,this.state.formulaText.length - 1) + event.target.value
      });
    } else if (this.state.formulaText !== '') {
      // else if not the first character, add to formula
      this.setState({
        formulaText: this.state.formulaText + event.target.value
      });
  };
  // always update display text
  this.setState({
    displayText: event.target.value
  });
}
  
  evaluatePress(event) {
    if (!this.state.evaluate) {
      let formula = this.state.formulaText;
      if (isNaN(formula.charAt(formula.length-1))) {
        // if last character was not a number, remove last character
        formula = formula.slice(0,this.state.formulaText.length - 1)
      };
      
      formula = formula.replace(/x/g,'*');
      let answer = eval(formula).toString();
      
      this.setState({
        evaluated: true,
        displayText: answer,
        formulaText: formula.replace(/\*/g,'x') + '=' + answer
      });
    }
  }
  
  render() {
    return (
     <div id='calculator'>
        <h2>Mathonator 3000</h2>
        <div id='solar-panel'>
          <div className='cell'></div>
          <div className='cell'></div>
          <div className='cell'></div>
          <div className='cell'></div>
        </div>
        <div className='line'></div>
        <div id='display'>
          <Formula formulaText={this.state.formulaText}/>
          <Display displayText={this.state.displayText}/>
        </div>
        <Buttons 
          operationPress={this.operationPress}
          numberPress={this.numberPress}
          acPress={this.acPress}
          decimalPress={this.decimalPress}
          evaluatePress={this.evaluatePress}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));