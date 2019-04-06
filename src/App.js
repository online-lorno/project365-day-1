import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Header from './components/Header';
import Footer from './components/Footer';
import Image from './components/Image';

import './App.scss';

const quoteTimeout = 86400; // 1 day in seconds

class App extends Component {
	state = {
		page: 1,
		quote: '',
		dataColumns: [],
		loadingQuote: true,
		loadingPictures: true
	};
	componentDidMount() {
		const self = this;
		this.getPictures();

		let quote = localStorage.getItem('project365_day01_quote');
		let lastQuoteTime = localStorage.getItem('project365_day01_last_quote_time');

		// If there's no quote
		// OR qoute is more than a days old
		// Get quote from API
		if (!quote || (lastQuoteTime && moment().diff(lastQuoteTime, 'seconds') > quoteTimeout)) {
			axios
				.get('https://quotes.rest/qod.json')
				.then(response => {
					const {
						data: {
							contents: { quotes }
						}
					} = response;
					const _quote = quotes[0];
					quote = `${_quote.quote} — ${_quote.author}`;

					// Set localStorage data
					localStorage.setItem('project365_day01_quote', quote);
					localStorage.setItem('project365_day01_last_quote_time', moment());

					self.setState({
						loadingQuote: false,
						quote
					});
				})
				.catch(error => {
					console.log(error);
					self.setState({
						loadingQuote: false,
						quote: 'Unable to load daily quote.'
					});
				});
		} else {
			self.setState({
				loadingQuote: false,
				quote
			});
		}
	}
	getPictures = () => {
		const self = this;
		const { page, dataColumns } = this.state;
		const newDataColumns = [...dataColumns];
		self.setState({ loadingPictures: true });

		axios({
			method: 'GET',
			url: `https://api.unsplash.com/photos?page=${page}&per_page=20`,
			headers: {
				'Accept-Version': 'v1',
				Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`
			}
		})
			.then(response => {
				const newPage = page + 1;
				newDataColumns.push(response.data);
				self.setState({
					loadingPictures: false,
					page: newPage,
					dataColumns: newDataColumns
				});
			})
			.catch(error => {
				console.log(error);
				self.setState({
					loadingPictures: false
				});
			});
	};
	render() {
		const { quote, dataColumns, loadingQuote, loadingPictures } = this.state;
		return (
			<div className="container">
				<Header className="header" {...{ quote, loadingQuote }} />

				{/* Pictures */}
				{dataColumns.map((data, key) => (
					<div key={key} className="card-columns">
						{data.map(obj => (
							<Image key={obj.id} data={obj} />
						))}
					</div>
				))}
				{/* END Pictures */}

				<div className="d-flex justify-content-center my-5">
					<button type="button" className="btn btn-outline-dark btn-lg btn-loading" disabled={loadingPictures} onClick={() => this.getPictures()}>
						<h5 className="mb-0">{loadingPictures ? 'loading...' : 'load more'}</h5>
					</button>
				</div>

				<Footer />
			</div>
		);
	}
}

export default App;
