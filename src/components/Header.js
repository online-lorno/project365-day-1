import React, { Component } from 'react';

export class Header extends Component {
	render() {
		const { loadingQuote, quote } = this.props;

		return (
			<div className="header">
				<h2>
					{loadingQuote && 'Loading daily quote...'}
					{!loadingQuote && quote}
				</h2>
				<div className="row">
					<div className="col-lg-8">
						<p>
							Hi I'm Leonard Laput, implementing Project365's Day 01 Minimal Portfolio design. Using React as frontend, Unsplash API for the images and a sprinkle of Quotes Rest API for the daily
							quote.
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
