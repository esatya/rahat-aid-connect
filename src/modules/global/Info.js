import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import {AppContext} from '../../contexts/AppContext'


export default function Info({message}) {
    const {aidConnectId} = useContext(AppContext);

	return (
		<>
			<div  style={{
            display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'
          }}>
                	<div className="card-body text-center">
                    <h5 className="card-title">Aid-Connect Link Deactivated</h5>
                    <p className="card-text">
                        {message || 'Please contact the Agency admin to activate the link'}
                    </p>
                    <Link to={`/${aidConnectId}`} >
                    <button type="button" className="btn btn-dark me-1 mb-1">Home</button>
					</Link>
    
                </div>

			</div>

		</>
	);
}
