import Login from './components/mainFiles/login'
import { BrowserRouter as Router,Routes, Route, } from 'react-router-dom';
import Register from './components/mainFiles/register';
import PanelEmployee from './components/employee/letPanel';
import Statistics from './components/employee/statistics';
import Profile from './components/employee/profile';
import ProfileCustomer from './components/customer/profile';
import NewAppointments from './components/employee/nApointments';
import PanelCustomer from './components/customer/leftPanelCustomer';
import Apointment from './components/customer/apointment';
import {cookieData} from './components/globalVariables/cookies';
import ForgotPassword from './components/mainFiles/forgotPassword';
import Service from './components/employee/service';
export default function App(){
    
  return<Router>
    {cookieData?.position==="C"?<PanelCustomer />:<PanelEmployee/>}
  <Routes>
    
    <Route path='/' Component={Login} />
    <Route path='/login' Component={Login} />
    <Route path='/register' Component={Register} />
    <Route path='/dashboard/Employee' Component={PanelEmployee} />
    <Route path='/dashboard/Customer' Component={Register} />
    <Route path='/dashboard/Employee/Statistics' Component={Statistics} />    
    <Route path='/dashboard/Employee/profile' Component={Profile} />
    <Route path='/dashboard/Employee/newAppointments' Component={NewAppointments} />
    <Route path='/dashboard/Employee/service' Component={Service} />
    <Route path='/dashboard/Customer/profile' Component={ProfileCustomer} />
    <Route path='/dashboard/Customer/Apointment' Component={Apointment} />
    <Route path='/forgotPassword' Component={ForgotPassword} />
  </Routes>
  </Router>
}