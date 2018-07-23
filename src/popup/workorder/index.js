import React from "react";
import Popup from "reactjs-popup";

class WorkOrderModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isNew : this.props.data.id == '' ? true: false
		}
		this.updateWorkOrderDetails=this.updateWorkOrderDetails.bind(this);
		this.id = React.createRef();
		//this.assetmapping = React.createRef();
		this.status = React.createRef();
		this.type = React.createRef();
		this.priority = React.createRef();
		this.reporteddate = React.createRef();
		this.targetfinishdate = React.createRef();
	}
	
	updateWorkOrderDetails() {
		var message = this.state.isNew ? "New Work order details has been created" : "Updated Work order details";
		alert(message);
		this.props.closeModal();
		this.props.updateWorkOrderDetails(this.state.isNew, this.id.current.value, this.props.data.assetmapping, this.status.current.value,
			this.type.current.value, this.priority.current.value, this.reporteddate.current.value, this.targetfinishdate.current.value);
	}
	render() {
		return (
			<div>
			<Popup
			  open={this.props.show}
			  closeOnDocumentClick
			  onClose={this.props.closeModal}>
				<div className="modal-content">
				  <div className="modal-header">
				    <a className="close" onClick={this.props.closeModal}>&times;</a>
					<h4 className="modal-title">Add Work order details</h4>
				  </div>
				  <div className="modal-body">
						<div className="form-group">
							<label>Asset Id:</label>
							{this.props.data.assetmapping}
						  </div>
					    <div className="form-group">
							<label>Workorder Id:</label>
							<input type="text" className="form-control" defaultValue={this.props.data.id} ref={this.id}/>
						  </div>
						  
						  <div className="form-group">
							<label>Status:</label>
							<input type="text" className="form-control" defaultValue={this.props.data.status} ref={this.status}/>
						  </div>
						  <div className="form-group">
							<label>Type:</label>
							<input type="text" className="form-control" defaultValue={this.props.data.type} ref={this.type}/>
						  </div>
						  <div className="form-group">
							  <label>Priority:</label>
							  <input type="text" className="form-control" defaultValue={this.props.data.priority} ref={this.priority}/>
						  </div>
						<div className="form-group">
							<label>Reported Date:</label>
							<input type="text" className="form-control" defaultValue={this.props.data.reporteddate} ref={this.reporteddate}/>
						  </div>
						  <div className="form-group">
							  <label>Target Finish Date:</label>
							  <input type="text" className="form-control" defaultValue={this.props.data.targetfinishdate} ref={this.targetfinishdate}/>
							</div>
				  </div>
				  <div className="modal-footer">
					<button type="button" className="btn btn-default" onClick={this.updateWorkOrderDetails}>{this.state.isNew ? "Create" : "Update"}</button>
					<button type="button" className="btn btn-default" onClick={this.props.closeModal}>Close</button>
				  </div>
				</div>
			</Popup>
		  </div>
		);
	}
}
export default WorkOrderModal;