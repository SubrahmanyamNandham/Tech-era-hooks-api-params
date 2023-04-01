import {Route, Switch} from 'react-router-dom'
import './App.css'
import Course from './components/Course'
import NotFound from './components/NotFound'
import SkillsDetails from './components/SkillsDetails'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Course} />
    <Route exact path="/courses/:id" component={SkillsDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
