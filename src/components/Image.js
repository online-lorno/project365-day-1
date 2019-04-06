import React, { Component } from 'react';
import classNames from 'classnames';
import { Fade } from 'react-reveal';

export class Image extends Component {
	state = {
		loaded: false
	};
	onLoad = () => {
		this.setState({ loaded: true });
	};
	render() {
		const { data } = this.props;
		const { loaded } = this.state;

		return (
			<Fade bottom>
				<div className="card">
					<div
						className={classNames({
							'card-img-top': true,
							loaded: loaded
						})}
						style={{ backgroundColor: data.color }}
					>
						<img src={data.urls.regular} alt="" onLoad={this.onLoad} />
					</div>
					{loaded && (
						<div className="card-body">
							<h6 className="card-title">
								<span className="regular">Photo by </span>
								<a href={data.user.links.html} target="_blank" rel="noopener noreferrer">
									{data.user.name}
								</a>
								<span className="regular"> on </span>
								<a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">
									Unsplash
								</a>
							</h6>
						</div>
					)}
				</div>
			</Fade>
		);
	}
}

export default Image;
