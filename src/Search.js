import React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: {},
            country: null
        };
    }

    componentDidMount() {
        fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        data: data,
                    });
                    // if (window.location.pathname.split('/')[1]) {
                    //     this.setState({
                    //         country: window.location.pathname.split('/')[1].split('%20').join(' ')
                    //     })
                    // }
                    // for now default to us
                    this.setState({
                        country: 'US'
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    selectedCountry(country) {
        this.setState({
            country: country
        });
        // if (country) {
        //     window.location.href = '/' + country;
        // } else {
        //     window.location.href = '/';
        // }
    }

    render() {
        const {
            error,
            isLoaded,
            data,
            country
        } = this.state;
        const countries = Object.keys(data).map((k, v) => (
            <div className="country"
                key={k}
                onClick={() => this.selectedCountry(k)}
            >{k}</div>
        ));
        if (country) {
            const countryData = [];
            data[country].reverse().forEach(({ date, confirmed, recovered, deaths }) =>
                // handle safari wack date bug
                countryData.push(<tr key={date}><td>{moment(date).isValid() ? moment(date).format('LL') : date}</td><td><strong><NumberFormat value={confirmed} thousandSeparator={true} displayType={'text'} /></strong></td><td><span className="text-success"><NumberFormat value={recovered} thousandSeparator={true} displayType={'text'} /></span></td><td><span className="text-danger"><NumberFormat value={deaths} thousandSeparator={true} displayType={'text'} /></span></td></tr>)
            );
            return <div><div><button className="btn btn-primary btn-sm" onClick={() => this.selectedCountry()}>All Countries</button></div><hr /><h2>{country}</h2><table className="table"><thead key="head"><tr><th>Date</th><th>Confirmed</th><th>Recovered</th><th>Deaths</th></tr></thead><tbody>{countryData}</tbody></table></div>;
        }
        if (error) {
            return <div>Error: {error.message} </div>;
        } else if (!isLoaded) {
            return <div> Loading... </div>;
        } else {
            return (countries);
        }
    }
}

export default SearchComponent;
