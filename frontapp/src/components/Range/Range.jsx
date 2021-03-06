import React, { Component } from 'react';
import './Range.css';


class Range extends Component {

	constructor(props) {
		super(props);

		this.line  = React.createRef();
		this.min   = React.createRef();
		this.max   = React.createRef();
		this.track = React.createRef();

		this.state = {
			min   : 0,
			max   : 0,
			range : 0,
			start : 0,
			end   : 0,
			minPos : 0,
			maxPos : 0,
			rangePerPixRatio : 0,
			lineWidth : 0,
			sliding : false,
			slideX : 0,
			pointWidth : 20,
			currentActivePoint : '',
			fill : {
				start : 0,
				width : 0 
			},
			positionUpdated : false
		};

	}

	/**
	 * Sets initial values
	 */
	componentDidMount() {
		this.listenMouseEvent();
		window.onresize = () => {
			this.setValues();
		}
	}

	componentDidUpdate(prevProps, prevState) {

		if (
			(this.props.min === prevProps.min && this.props.max === prevProps.max) &&
			(this.props.currentStore === prevProps.currentStore)
		) return;
			this.setValues();
	}

	/**
	 * Set working values
	 */
	setValues = () => {
		const min = Number(this.props.min);
		const max = Number(this.props.max);
		const range = max - min;

		let lineWidth = this.line.current.offsetWidth,
			rangePerPixRatio = Math.ceil(range / lineWidth),
			start     = Number(this.props.start)  || min,
			end       = Number(this.props.end)    || max,
			minPos    = start === min ? this.line.current.offsetLeft : (start / rangePerPixRatio - (min / rangePerPixRatio)),
			maxPos    = end === max ? lineWidth - (this.state.pointWidth / 2) : (end / rangePerPixRatio - (min / rangePerPixRatio));

		this.setState({
			min,
			max,
			range,
			start,
			end,
			lineWidth,
			minPos,
			maxPos,
			rangePerPixRatio,
			fill : {
				start : minPos,
				width : lineWidth - minPos - maxPos
			},
			positionUpdated : false
		});
	}


	/**
	 * Listening mouse event on sliders
	 */
	listenMouseEvent = () => {

		
		const listenEvent = (e, isClick = false) => {

			const state = this.state;

			let trackPosition = this.track.current.getBoundingClientRect();
			let shift = Math.floor(e.clientX - trackPosition.left) - (state.pointWidth / 2);

			if (
				(shift < 0 || 
				shift >  (state.lineWidth - (state.pointWidth / 2))) &&
				!isClick
			) return;

			if (state.currentActivePoint === 'min') {

				if (shift >= state.maxPos) return;
				if (shift <= 2) shift = 0;

				this.setState({
					minPos : shift,
					start  : shift === 0 ? (state.min) : (shift * state.rangePerPixRatio) + this.state.min
				});

			} else {

				if (shift <= state.minPos) return;
		
				let maxValue = shift * state.rangePerPixRatio + state.min,
					treshold = state.pointWidth * state.rangePerPixRatio / 2,
					newEnd   = maxValue >= (state.max - treshold) ? state.max : maxValue;

				this.setState({
					maxPos : shift,
					end    : newEnd
				});
			}

		}

		this.min.current.onmousedown = () => {
			this.setState({
				sliding : true,
				currentActivePoint : 'min'
			});
		}

		this.max.current.onmousedown = () => {
			this.setState({
				sliding : true,
				currentActivePoint : 'max'
			});
		}

		this.track.current.onclick = (e) => {
			
			let clickPoint = e.offsetX,
				half       = parseInt(this.state.lineWidth / 2, 10),
				isButton   = e.target.classList.contains('range__track-point');

			if (isButton) return; // If clicked on button

			let currentActivePoint = clickPoint < half ? 'min' : 'max';

			this.setState({ currentActivePoint });

			listenEvent(e, true);

			this.props.onDragEnd({
				min : this.state.start,
				max : this.state.end
			});

		}

		document.onmousemove = (e) => {
			if (!this.state.sliding) return false;
			listenEvent(e);
		}

		document.onmouseup = () => {

			if (!this.state.sliding) return false;

			this.props.onDragEnd({
				min : this.state.start,
				max : this.state.end
			});

			this.setState({
				sliding : false,
				currentActivePoint : ''
			});
		};

	}

	componentWillUnmount () {
		document.onmousemove = null;
		document.onmouseup 	 = null;
	}

	render() {

		return (
			<div className="range">
				<div
					ref={this.track} 
					className="range__track">

					<button
						ref={this.min}
						style={{
							left : `${this.state.minPos + 'px'}`
						}} 
						className="range__track-point range__track-point-min">
							<span className="range__count">{ this.state.start }</span>
					</button>

					<button
						ref={this.max}
						style={{
							left : `${this.state.maxPos + 'px'}`
						}} 
						className="range__track-point range__track-point-max">
							<span className="range__count">{ this.state.end }</span>
					</button>

					<div
						ref={this.line}
						className="range__track-line">
						<div 
							className="range__track-fill"
							style={{
								left : this.state.minPos + 'px',
								width : this.state.lineWidth - this.state.minPos - (this.state.lineWidth - this.state.maxPos) + 'px'
							}} 
							></div>
					</div>


				</div>
				<div className="range__prices">
					<div className="range__price">{this.state.min}</div>
					<div className="range__price">{this.state.max}</div>
				</div>	
			</div>
		);
	}
}

export default Range;