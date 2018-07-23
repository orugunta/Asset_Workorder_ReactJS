import React from "react";
import Popup from "reactjs-popup";

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isNew : this.props.data.asset_id == '' ? true: false
		}
		this.updateAssetDetails=this.updateAssetDetails.bind(this);
		this.serialno = React.createRef();
		this.assetId = React.createRef();
		this.cutomerId = React.createRef();
		this.description = React.createRef();
	}
	
	updateAssetDetails() {
		var message = this.state.isNew ? "New Asset has been created" : "Updated Asset details";
		alert(message);
		this.props.closeModal();
		this.props.updateAssetDetails(this.state.isNew, this.serialno.current.value, this.assetId.current.value,
		this.cutomerId.current.value, this.description.current.value);
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
					<h4 className="modal-title">Add Asset details</h4>
				  </div>
				  <div className="modal-body">
						<div className="form-group">
						  <label>SNO:</label>
						  <input type="text" className="form-control" defaultValue={this.props.data.serialno} ref={this.serialno} id="assetId"/>
						</div>
						<div className="form-group">
						  <label>Asset Id:</label>
						  <input type="text" className="form-control" defaultValue={this.props.data.asset_id} ref={this.assetId} id="assetId"/>
						</div>
						<div className="form-group">
						  <label>Customer Id:</label>
						  <input type="text" className="form-control" defaultValue={this.props.data.kks_id} ref={this.cutomerId} id="customerId"/>
						</div>
						<div className="form-group">
							<label>Description:</label>
							<input type="text" className="form-control" defaultValue={this.props.data.desc} ref={this.description} id="description"/>
						</div>
				  </div>
				  <div className="modal-footer">
					<button type="button" className="btn btn-default" onClick={this.updateAssetDetails}>{this.state.isNew ? "Create" : "Update"}</button>
					<button type="button" className="btn btn-default" onClick={this.props.closeModal}>Close</button>
				  </div>
				</div>
			</Popup>
		  </div>
		);
	}
}
export default Modal;