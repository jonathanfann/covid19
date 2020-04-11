import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom';

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

    // getRoutePath() {
    //     const country = useParams();
    //     return country ? country : null;
    // }

    componentDidMount() {
        fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        data: data,
                        country: window.location.pathname.split('/')[1],
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
    }

    render() {
        const {
            error,
            isLoaded,
            data,
            country
        } = this.state;
        let countryDataTotal = null;
        let view = Object.keys(data).map((k, v) => (
            <div className="country"
                key={k}
                onClick={() => this.selectedCountry(k)}
            >{k}</div>
        ));
        if (error) {
            view = <div>Error: {error.message} </div>;
        } else if (!isLoaded) {
            view = <div> Loading... </div>;
        }
        if (country) {
            const countryData = [<thead key="head"><tr><th>Date</th><th>Confirmed</th><th>Recovered</th><th>Deaths</th></tr></thead>];
            data[country].forEach(({ date, confirmed, recovered, deaths }) =>
              countryData.push(<tr key={date}><td>{date}</td><td>{confirmed}</td><td>{recovered}</td><td>{deaths}</td></tr>)
            );
            let countryDataTotal = <div><h2>{country}</h2><button onClick={() => this.selectedCountry()}>Back</button><table>{countryData}</table></div>;
        }
        const page = (
            <Router>
                <Switch>
                  <Route path="/:name">
                    {countryDataTotal}
                  </Route>
                  <Route path="/">
                    {view}
                  </Route>
                </Switch>
            </Router>
        );
        return page;
    }
}

export default SearchComponent;
