// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {defaultMin: 25, min: 25, sec: 0, timerStatus: 'Paused'}
  }

  onClickPlayPause = () => {
    const {timerStatus} = this.state
    if (timerStatus === 'Paused') {
      this.setState({timerStatus: 'Running'})
      this.componentDidMoun()
    } else {
      this.setState({timerStatus: 'Paused'})
      this.componentWillUnmoun()
    }
  }

  onClickReset = () => {
    this.setState({defaultMin: 25})
    this.setState({min: 25})
    this.setState({sec: 0})
    this.setState({timerStatus: 'Paused'})
    this.componentWillUnmoun()
  }

  onClickIncrement = () => {
    const {timerStatus} = this.state
    if (timerStatus === 'Paused') {
      this.setState(prevState => ({
        min: prevState.min + 1,
      }))
      this.setState(prevState => ({
        defaultMin: prevState.defaultMin + 1,
      }))
    }
  }

  onClickDecrement = () => {
    const {timerStatus} = this.state
    if (timerStatus === 'Paused') {
      this.setState(prevState => ({
        min: prevState.min - 1,
      }))
      this.setState(prevState => ({
        defaultMin: prevState.defaultMin - 1,
      }))
    }
  }

  timer = () => {
    const {sec} = this.state
    if (sec === 0) {
      this.setState(prevState => ({
        min: prevState.min - 1,
      }))
      this.setState({sec: 59})
    } else {
      this.setState(prevState => ({
        sec: prevState.sec - 1,
      }))
    }
  }

  componentDidMoun() {
    this.timerId = setInterval(this.timer, 1000)
  }

  componentWillUnmoun() {
    clearInterval(this.timerId)
  }

  render() {
    const {defaultMin, min, sec, timerStatus} = this.state
    let displaySec
    if (sec === 0) {
      displaySec = '00'
    } else if (sec < 10) {
      displaySec = 0 + sec
    } else {
      displaySec = sec
    }
    const startPauseText = timerStatus === 'Paused' ? 'Start' : 'Pause'
    const startPauseImg =
      timerStatus === 'Paused'
        ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const startPauseAltText =
      timerStatus === 'Paused' ? 'play icon' : 'pause icon'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="cards-container">
          <div className="display-card">
            <div className="d-card">
              <h1 className="display-time">
                {min}:{displaySec}
              </h1>
              <p className="display-status">{timerStatus}</p>
            </div>
          </div>
          <div className="controls-card">
            <div className="pr-container">
              <img
                onClick={this.onClickPlayPause}
                className="play-pause-img"
                src={startPauseImg}
                alt={startPauseAltText}
              />
              <button
                onClick={this.onClickPlayPause}
                type="button"
                className="play-pause-text"
              >
                {startPauseText}
              </button>
              <img
                onClick={this.onClickReset}
                className="reset-img"
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
              />
              <button
                onClick={this.onClickReset}
                type="button"
                className="reset-text"
              >
                Reset
              </button>
            </div>
            <p className="set-timer-text">Set Timer limit</p>
            <div className="id-container">
              <button
                onClick={this.onClickDecrement}
                className="id-button"
                type="button"
              >
                -
              </button>
              <p className="id-para">{defaultMin}</p>
              <button
                onClick={this.onClickIncrement}
                className="id-button"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
