import React from "react";

export default function AssetTable(props) {
	return(
		<table className="table table-hover">
			<thead>
				<tr>
					<th>SNO</th>
					<th>Asset Id</th>
					<th>Customer Id</th>
					<th>Description</th>
					<th colSpan="2">Action</th>
				</tr>
			</thead>
			<tbody>
				{
					props.data.map(row =>(
						<tr>
							<td>{row.serialno}</td>
							<td>{row.asset_id}</td>
							<td>{row.kks_id}</td>
							<td>{row.desc}</td>
							<td>
								<a href="#" className="btn btn-primary" style={{marginRight: '10px'}} onClick={() => props.closeAssetDetails(row)}>Edit</a>
								<a href="#" className="btn btn-danger" style={{marginRight: '10px'}} onClick={() => props.deleteAssetDetails(row)}>Delete</a>
								<a href="#" className="btn btn-primary" onClick={() => props.viewWorkOrderDetails(row)}>View workorders</a>
							</td>
						</tr>
						
					))
				}
			</tbody>
		</table>
	)
}