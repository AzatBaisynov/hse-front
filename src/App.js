import Authorization from './pages/Authorization';
import OrgStructure from './pages/user_info/OrgStructure';
import DocFolders from './pages/user_info/DocFolders';
import DocList from './pages/user_info/DocList';
import Navigation from './components/Navigation';
import CreateDocForm from './pages/user_info/CreateDocForm';
import { useSelector } from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { MainUserInfo } from './pages/user_info/MainUserInfo';

function App() {
  const { isAuth } = useSelector(store => store.login)

  if (isAuth) {
    return (
      <Router>
        <Navigation />
        
        <Switch>
          <Route path="/" exact component={MainUserInfo} />
        </Switch>
      </Router>
    );
  } else {
    return (
      <Authorization />
    )
  }
}

export default App;
