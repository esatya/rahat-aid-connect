import React,{useState, useEffect ,useCallback} from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../assets/images/Man.png';
import DataService from '../../services/db';
import AppHeader from '../layouts/AppHeader';
import { IoHomeOutline } from 'react-icons/io5';

const BeneficiaryDetail = props => {
    const benId = props.match.params.phone
    const [benData,setBenData] = useState({});

    const getBeneficiaryData = useCallback(async() => {
        const data = await DataService.getBeneficiary(benId);
        setBenData(data);
    },[benId])

    useEffect(()=>{
        getBeneficiaryData()
    },[getBeneficiaryData])
	
	return (
        <>
			<AppHeader
				currentMenu="Beneficiaries"
				actionButton={
					<Link to="/" className="headerButton">
						<IoHomeOutline className="ion-icon" />
					</Link>
				}
			/>
		<div className="card mt-2">
			<div className="card-header">Beneficiary details</div>
			<div className="card-body">
				<div className="mt-1 text-center">
					{benData && benData.photo ? (
						<img className="video-flipped selfie" alt="preview" src={benData.photo} width="200px" height="200px"/>
					) : (
						<img className="video-flipped selfie " alt="preview" src={Avatar} width="40px" height="40px" />
					)}

				</div>
				<ul className="listview flush transparent simple-listview no-space mt-3">
					<li>
						<strong>Name</strong>
						<span>{benData.name}</span>
					</li>
					<li>
						<strong>Phone</strong>
						<span style={{ overflow: 'hidden' }}>{benData.phone}</span>
					</li>
                    <li>
						<strong>Address</strong>
						<span style={{ overflow: 'hidden' }}>{benData.address}</span>
					</li>
                    <li>
						<strong>Registered At</strong>
						<span style={{ overflow: 'hidden' }}>{benData.createdAt}</span>
					</li>
				</ul>
			</div>
		</div>
        </>
	);
};
export default BeneficiaryDetail;
