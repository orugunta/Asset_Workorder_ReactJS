import React from "react";

export default function WorkorderSearchResults(props) {
	return(
	    <table className="table table-hover">
			<thead>
				<tr>
					<th>Workorder Id</th>
					<th>Asset Id</th>
					<th>Status</th>
					<th>Type</th>
					<th>Priority</th>
					<th>Reported Date</th>
					<th>Target finish Date</th>
					<th colSpan="2">Action</th>
				</tr>
			</thead>
			<tbody>
				{
					props.data.map(row =>(
						<tr>
							<td>{row.id}</td>
							<td>{row.assetmapping}</td>
							<td>{row.status}</td>
							<td>{row.type}</td>
							<td>{row.priority}</td>
							<td>{row.reporteddate}</td>
							<td>{row.targetfinishdate}</td>
							<td>
								<a href="#" className="btn btn-primary" style={{marginRight: '10px'}} onClick={() => props.openWorkOrderDetails(row)}>Edit</a>
								<a href="#" className="btn btn-danger" onClick={() => props.deleteWorkOrderDetails(row)}>Delete</a>
							</td>
						</tr>
					))
				}
			</tbody>
		</table>
	)
}