// buttons - no state
// solarcell aesthetic
const Buttons = (props) => {
  return (
    <div id='button-wrapper'>
      <div className='number-button' id='nine'>9</div>
      <div className='number-button' id='eight'>8</div>
      <div className='number-button' id='seven'>7</div>
      <div className='operation-button' id='multiply'>x</div>
      
      <div className='number-button' id='six'>6</div>
      <div className='number-button' id='five'>5</div>
      <div className='number-button' id='four'>4</div>
      <div className='operation-button' id='divide'>/</div>
      
      <div className='number-button' id='three'>3</div>
      <div className='number-button' id='two'>2</div>
      <div className='number-button' id='one'>1</div>
      <div className='operation-button' id='add'>+</div>
      
      <div className='number-button' id='zero'>0</div>
      <div className='number-button' id='decimal'>.</div>
      <div className='operation-button' id='subtract'>-</div>

      <div className='operation-button' id='clear'>AC</div>
      <div className='operation-button' id='enter'>=</div>
      
    </div>
  )
}
const Display = (props) => {
  return (
  <div id='display-current'>
      {props.current}
  </div>
  )
}

const Formula = (props) => {
  return (
  <div id='display-formula'>
    {props.displayText}
  </div>
  )
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: '',
      current: ''
    };
    this.updateDisplay = this.updateDisplay.bind(this);
  }
  
  updateDisplay(event) {
    this.setState((state, event) => {
      return({
        displayText: state.displayText + event.target.value
      })
    })
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
          <Formula displayText={this.state.displayText}/>
          <Display displayText={this.state.current}/>
        </div>
        <Buttons />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));