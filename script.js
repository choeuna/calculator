const OPERATORS = '/x+-';

const Buttons = (props) => {
  return (
    <div id='button-wrapper'>
      <button value='' onClick={props.operationPress} className='operation-button wide-button' id='clear'>AC</button>
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
      <button value='=' onClick={props.operationPress} className='operation-button tall-button' id='equal'>=</button>

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
      currentVal: ''
    };
    this.numberPress = this.numberPress.bind(this);
    this.decimalPress = this.decimalPress.bind(this);
    this.operationPress = this.operationPress.bind(this);
  }
  
  numberPress(event) {
    if (this.state.displayText === '0' && this.state.formulaText === '') {
      // if first number used and not 0, update display and formula
      if (event.target.value !== '0') {
        this.setState({
          displayText: event.target.value,
          formulaText: event.target.value
        });
      };
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
      // adding to previous number, update display and formula
      this.setState({
        displayText: this.state.displayText + event.target.value,
        formulaText: this.state.formulaText + event.target.value
      });
    };
  }
  
  decimalPress(event) {
    console.log('decimal press');
  }
  
  operationPress(event) {
    
    if (isNaN(this.state.formulaText.charAt(this.state.formulaText.length-1))) {
      this.setState({
        // if last character was an operator, replace formula char
        formulaText: this.state.formulaText.slice(0,this.state.formulaText.length - 1) + event.target.value
      });
    } else if (this.state.formulaText !== '') {
      // else if not the first character, add to formula
      this.setState({
        formulaText: this.state.formulaText + event.target.value
      });
  };
  // always update display
  this.setState({
    displayText: event.target.value
  });
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
          decimalPress={this.decimalPress}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));