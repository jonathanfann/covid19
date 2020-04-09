import React from 'react';

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
                        data: data
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
        })
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
            const countryData = [<thead><tr><th>Date</th><th>Confirmed</th><th>Recovered</th><th>Deaths</th></tr></thead>];
            data[country].forEach(({ date, confirmed, recovered, deaths }) =>
              countryData.push(<tr><td>{date}</td><td>{confirmed}</td><td>{recovered}</td><td>{deaths}</td></tr>)
            );
            return <div><button onClick={() => this.selectedCountry()}>Back</button><table>{countryData}</table></div>;
        }
        if (error) {
            return <div>Error: {error.message} </div>;
        } else if (!isLoaded) {
            return <div> Loading... </div>;
        } else {
            return (countries
                // this.state.items ? this.state.items : 'Nothing To Show'
                // data ? data : 'Nothing to show'
            );
        }
    }
}

export default SearchComponent;
