import React from "react";
import ReactDOM from "react-dom";

import WorkorderTable from './workorder-table';
import AssetTable  from './asset-table';
import Modal from "./popup/asset";
import assetdata from './data/asset.json';
import './app.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			assetdata : assetdata,
			assetTab:"active",
			workOrderTab:"Inactive",
			tab:"Asset",
			_asset_id:"",
			isAddAssetOpen: false,
			isEditAssetOpen: false
		}
		this.toggleAddAssetModal = this.toggleAddAssetModal.bind(this)
		this.changeMainTab = this.changeMainTab.bind(this)
		this.closeAssetDetails = this.closeAssetDetails.bind(this)
		this.updateAssetDetails = this.updateAssetDetails.bind(this)
		this.deleteAssetDetails = this.deleteAssetDetails.bind(this)
		this.viewWorkOrderDetails = this.viewWorkOrderDetails.bind(this)
	}
	
	toggleAddAssetModal() {
		this.setState({
		  isAddAssetOpen: !this.state.isAddAssetOpen,
		  assetDetails :{
			serialno:'',
			asset_id:'',
			kks_id:'',
			desc:''
		  }
		})
	}
	
	changeMainTab() {
		this.setState({
			assetTab : this.state.assetTab == 'active' ? "Inactive" : "active",
			workOrderTab : this.state.workOrderTab == 'active' ? "Inactive" : "active",
			_asset_id : ''
		})
	}
	
	closeAssetDetails(assetDetails) {
		this.setState({
			isEditAssetOpen : !this.state.isEditAssetOpen,
			assetDetails : assetDetails
		})
	}
	
	updateAssetDetails(isNew, serialno, assetId, customerId, description) {
		if (isNew) {
			var assetdts = {"serialno": serialno,"asset_id":assetId, "kks_id":customerId,"desc" : description};
			this.state.assetdata.push(assetdts);
		} else {
			this.state.assetdata.filter(function(_assetdts) {
				if (_assetdts.serialno == serialno) {
					_assetdts.asset_id = assetId;
					_assetdts.kks_id = customerId;
					_assetdts.desc = description;
				}
			});
		}
		
	}
	
	deleteAssetDetails(assetdts) {
		var filterData = this.state.assetdata.filter(function(_assetdts) { return _assetdts.serialno != assetdts.serialno });
		this.setState({
			assetdata : filterData
		})
	}
	
	viewWorkOrderDetails(assetdts) {
		this.changeMainTab();
		this.setState({
			_asset_id : assetdts.asset_id
		})
	}
	
	render() {
		return (
			<div className="container-fluid">
			  <nav className="navbar navbar-inverse">
				  <div className="navbar-header">
				   <div className="navbar-brand">Asset and Work order details</div>
				  </div>
				  <ul className="nav navbar-nav">
					<li className={this.state.assetTab} ><a href="#" onClick={this.changeMainTab}>Asset</a></li>
					<li className={this.state.workOrderTab}><a href="#" onClick={this.changeMainTab}>Workorder</a></li>
				  </ul>
			  </nav>
			  { this.state.assetTab == 'active' ? <div className="add-button-assets" style={{float:'right'}}><button type="button" className="btn btn-info" onClick={this.toggleAddAssetModal}>Add Asset details</button></div> : null }
			  
			  { this.state.assetTab == 'active' ? <AssetTable data={this.state.assetdata} viewWorkOrderDetails={this.viewWorkOrderDetails} deleteAssetDetails={this.deleteAssetDetails} closeAssetDetails={this.closeAssetDetails} /> : null }
			  { this.state.workOrderTab == 'active' ? <WorkorderTable assetId={this.state._asset_id} /> : null }
			  { this.state.isAddAssetOpen ? <Modal show={this.state.isAddAssetOpen} data={this.state.assetDetails} updateAssetDetails={this.updateAssetDetails} closeModal={this.toggleAddAssetModal} /> : null }
			  { this.state.isEditAssetOpen ? <Modal data={this.state.assetDetails} show={this.state.isEditAssetOpen} updateAssetDetails={this.updateAssetDetails} closeModal={this.closeAssetDetails} /> : null }
			</div>
		)
	}
}
ReactDOM.render(<App />, document.getElementById("index"));