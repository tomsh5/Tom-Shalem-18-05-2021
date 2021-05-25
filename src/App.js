import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.scss';
import { Navbar } from './cmps/Navbar/Navbar.jsx'
import { WeatherApp } from './views/WeatherApp/WeatherApp.jsx'
import { FavoritesPage } from './views/FavoritesPage/FavoritesPage.jsx'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route component={ FavoritesPage } path="/favorites" />
          <Route component={ WeatherApp } exact path="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
