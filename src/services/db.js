import Dexie from 'dexie';

import { DB } from '../constants';
const db = new Dexie(DB.NAME);

db.version(DB.VERSION).stores({
	beneficiaries: 'phone,name,address,createdAt,photo,govt_id_image',
	agencies:
		'address,name,api,network,rahatAddress,tokenAddress,erc20Address,erc1155Address,adminAddress,phone,email,logo,isApproved',
	projects: 'id,name',

});

const DataService = {


	async clearAll() {
		await db.data.clear();
		await db.assets.clear();
		await db.documents.clear();
	},


	addAgency(agency) {
		return db.agencies.put(agency);
	},

	getAgency(address) {
		return db.agencies.get(address);
	},

	addProject(project) {
		return db.projects.put(project);
	},

	listProjects() {
		return db.projects.toArray();
	},
	async getDefaultProject() {
		let projects = await this.listProjects();
		if (!projects) return null;
		return projects[0];
	},

	async updateAgency(key, data) {
		return db.agencies.update(key, data);
	},

	listAgencies() {
		return db.agencies.toArray();
	},

	async getDefaultAgency() {
		let agencies = await this.listAgencies();
		if (!agencies) return null;
		return agencies[0];
	},

	addBeneficiary(beneficiary) {
		return db.beneficiaries.put(beneficiary);
	},

	getBeneficiary(phone) {
		return db.beneficiaries.get(phone);
	},

	getBeneficiaryName(name) {
		return db.beneficiaries.get(name);
	},

	listBeneficiaries(type) {
		if (!type) return db.beneficiaries.orderBy('name').reverse().toArray();
		return db.beneficiaries.get({ type }).orderBy('timestamp').reverse();
	},

};

export default DataService;
