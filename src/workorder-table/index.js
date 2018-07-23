import React from "react";
import WorkorderSearchResults from './search-results';
import workorderdetails from '../data/workorder.json';
import WorkOrderModal from "../popup/workorder";

class WorkorderTable extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		    workorderdetails : workorderdetails,
			workordersearchresults : workorderdetails.filter(function(_workorderDtl) { return _workorderDtl.assetmapping == props.assetId }),
			showResults : props.assetId ? true: false,
			isAddWorkOrder: false,
			isEditWorkOrder: false
		}
		this.searchWorkOrdersByAssetId = this.searchWorkOrdersByAssetId.bind(this);
		this.toggleWorkOrderModal = this.toggleWorkOrderModal.bind(this);
		this.closeWorkOrderDetails = this.closeWorkOrderDetails.bind(this);
		this.updateWorkOrderDetails = this.updateWorkOrderDetails.bind(this);
		this.openWorkOrderDetails = this.openWorkOrderDetails.bind(this);
		this.deleteWorkOrderDetails = this.deleteWorkOrderDetails.bind(this);
		this.assetId = React.createRef();
		
	}
	
	searchWorkOrdersByAssetId() {
		var _searchAssetId = this.assetId.current.value;
		if (!_searchAssetId) {
			alert('Asset id should not be empty.');
		} else {
			this.setState({
				showResults : true,
				_searchAssetId:_searchAssetId
			})
			var filterData = this.state.workorderdetails.filter(function(_workorderDtl) { return _workorderDtl.assetmapping == _searchAssetId });
			this.setState({
				workordersearchresults : filterData
			})
		}
	}
	
	toggleWorkOrderModal() {
		this.setState({
		  isAddWorkOrder: !this.state.isAddWorkOrder,
		  workorderdetail :{
			id: '', assetmapping:this.state._searchAssetId, status: '', type: '', priority: '', reporteddate:'', targetfinishdate:''
		  }
		})
	}
	
	openWorkOrderDetails(workorderDetail) {
		console.log(workorderDetail.id)
		this.setState({
			isEditWorkOrder : !this.state.isEditWorkOrder,
			workorderdetail : workorderDetail
		})
	}
	
	deleteWorkOrderDetails(workorderDtl) {		
		console.log(workorderDtl.id)
		var filterData = this.state.workordersearchresults.filter(function(_workorderDtl) { return _workorderDtl.id != workorderDtl.id });
		this.setState({
			workordersearchresults : filterData
		})
	}
	
	updateWorkOrderDetails(isNew, id, assetmapping, status, type, priority, reporteddate, targetfinishdate) {
		var assetdts = {"id": id,"status": status,"type": type,"priority": priority,"reporteddate": reporteddate,
		"targetfinishdate": targetfinishdate,"assetmapping": assetmapping};
		if (isNew) {
			this.state.workordersearchresults.push(assetdts);
		} else {
			this.state.workordersearchresults.filter(function(_workorderDtl) {
				if (_workorderDtl.id == id) {
					_workorderDtl.status = status;
					_workorderDtl.type = type;
					_workorderDtl.priority = priority;
					_workorderDtl.reporteddate = reporteddate;
					_workorderDtl.targetfinishdate = targetfinishdate;
				}
			});
		}
	}
	
	closeWorkOrderDetails(workorderdetails) {
		this.setState({
			isEditWorkOrder : !this.state.isEditWorkOrder
		})
	}
	
	render() {
		return(
			<div className="workorder-group">
			  <label>Asset Id:</label>
			  <input type="text" className="form-control" style={{width:'20%', display: 'inline-block',margin: '10px'}} defaultValue={this.props.assetId} ref={this.assetId} />
			  <button type="button" className="btn btn-info" onClick={this.searchWorkOrdersByAssetId} >Search</button>
			  { this.state.showResults ? <div className="add-button-assets" style={{float:'right'}}><button type="button" className="btn btn-info" onClick={this.toggleWorkOrderModal}>Add Workorder details</button></div> : null }
			  { this.state.showResults ? <WorkorderSearchResults data={this.state.workordersearchresults} openWorkOrderDetails={this.openWorkOrderDetails} deleteWorkOrderDetails={this.deleteWorkOrderDetails} />  : null }
			  { this.state.isAddWorkOrder ? <WorkOrderModal data={this.state.workorderdetail} show={this.state.isAddWorkOrder} updateWorkOrderDetails={this.updateWorkOrderDetails} closeModal={this.toggleWorkOrderModal} /> : null }
			  { this.state.isEditWorkOrder ? <WorkOrderModal data={this.state.workorderdetail} show={this.state.isEditWorkOrder} updateWorkOrderDetails={this.updateWorkOrderDetails} closeModal={this.closeWorkOrderDetails} /> : null }
			 
			</div>
		)
	}
}
export default WorkorderTable;