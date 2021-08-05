import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router} from 'react-router-dom';
import swal from 'sweetalert';

import './App.css';
import CompanyLogo from './logo.png'

class Skedda extends React.Component {
    render () { 
        return (
            <div>
                <iframe src="https://catalystcampusco.skedda.com/booking?embedded=true" ></iframe>
            </div>
        )
    }
}

export default Skedda