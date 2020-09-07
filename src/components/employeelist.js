import React from 'react';
import { connect } from 'react-redux';
import { DataTable, Button, Modal, Pagination, OverflowMenu, OverflowMenuItem, Dropdown } from 'carbon-components-react';

import getEmployees from '../store/actions/getEmployees';
import deleteEmployee from '../store/actions/deleteEmployee';
import { clearDeleteSuccess } from '../store/actions/clearState';

import '../app.scss';

const items = [
	{
	  id: 'option-1',
	  label: 'Ctc <= 300000',
	  ctc: [0, 300000]
	},
	{
	  id: 'option-2',
	  label: 'Ctc > 300000 & Ctc <= 800000',
	  ctc: [300000, 800000]
	},
	{
	  id: 'option-3',
	  label: 'Ctc > 800000 & Ctc <= 1200000',
	  ctc: [800000, 1200000]
	},
	{
	  id: 'option-4',
	  label: 'Ctc > 1200000',
	  ctc: [1200000]
	},
];

function EmployeeList(props) {
    const { getEmployees, list, deleteEmployee, deleteSuccess, clearDeleteSuccess } = props;
	const [tableBody, setTableBody] = React.useState([]);
	const [showModal, setShowModal] = React.useState(false);
	const [deleteItem, setDeleteItem] = React.useState({});
	const [firstRowIndex, setFirstRowIndex] = React.useState(0);
	const [currentPageSize, setCurrentPageSize] = React.useState(5);
	const [showDetailModal, setShowDetailModal] = React.useState(false);
	const [selectedEmp, setSelectedEmp] = React.useState([]);
	
	const batchActionClick = (row) => {
		setShowDetailModal(true);
		let filteredArray = tableBody.filter((el) => {
			return row.some((f) => {
			  return f.id === el.id;
			});
		});
		setSelectedEmp(filteredArray);
	}
      
    const renderProp = ({ rows, headers, getHeaderProps, getRowProps, getSelectionProps, getBatchActionProps, selectedRows, onInputChange }) => (
		<>
		<DataTable.TableContainer title="Employee List">
			<DataTable.TableToolbar>
				{/* make sure to apply getBatchActionProps so that the bar renders */}
				<DataTable.TableBatchActions {...getBatchActionProps()}>
					{/* inside of your batch actions, you can include selectedRows */}
					<DataTable.TableBatchAction onClick={() => batchActionClick(selectedRows)}>
						View selected employees details 
					</DataTable.TableBatchAction>
				</DataTable.TableBatchActions>
				<DataTable.TableToolbarContent>
					<DataTable.TableToolbarSearch onChange={onInputChange} />
					<Button onClick={() => props.history.push('employee/new')} size="small" kind="primary" className="add-employee-btn" data-test="addNew">
						Add Employee
			  		</Button>
				</DataTable.TableToolbarContent>
			</DataTable.TableToolbar>
			{
				tableBody && tableBody.length > 0 && 
				<DataTable.Table size='normal' >
					<DataTable.TableHead>
						<DataTable.TableRow>
							<DataTable.TableExpandHeader />
							<DataTable.TableSelectAll {...getSelectionProps()} />
							{headers.map((header) => (
								<DataTable.TableHeader 
									key={header.key} 
									{...header.header ? getHeaderProps({header}) : ""}
								>
									{header.header}
								</DataTable.TableHeader>
							))}
						</DataTable.TableRow>
					</DataTable.TableHead>
					<DataTable.TableBody>
						{rows.map((row) => (
							<React.Fragment key={row.id}>
								<DataTable.TableExpandRow {...getRowProps({ row })}>
									<DataTable.TableSelectRow {...getSelectionProps({ row })} />
									{/* <DataTable.TableRow key={row.id}> */}
										{row.cells.map((cell) => (
											<DataTable.TableCell key={cell.id}>{cell.value}</DataTable.TableCell>
										))}
									{/* </DataTable.TableRow> */}
								</DataTable.TableExpandRow>
								{row.isExpanded && (
									<DataTable.TableExpandedRow colSpan={headers.length + 1}>
										<h5>Employee Details</h5>
										<p className="emp-details">Id: {row.id}</p>
										<p className="emp-details">Name: {row.cells[0].value}</p>
										<p className="emp-details">Role: {row.cells[1].value}</p>
										<p className="emp-details">Ctc: {row.cells[2].value}</p>
									</DataTable.TableExpandedRow>
								)}
							</React.Fragment>
						))}
					</DataTable.TableBody>
			 	</DataTable.Table>
			}

		</DataTable.TableContainer>
		</>
	);

	React.useEffect(() => {
		getEmployees();
	}, [getEmployees])

	const handleEdit = li => {
		props.history.push(`/employee/${li.id}`)
	}

	const handleDelete = (li) => {
		setDeleteItem(li)
		setShowModal(true)
		// deleteEmployee(li.id)
	}

	React.useEffect(() => {
		if (list && list.length > 0) {
			let data = list.map((li, index) => {
				return { 
					...li, 
					id: li.id.toString(), ctc: Number(li.ctc).toLocaleString(), 
					// action: <div><Button size="small" className="edit-employee" onClick={() => handleEdit(li)} data-test="editEmployee">Edit</Button><Button className="delete-employee" size="small" onClick={() => handleDelete(li)}>Delete</Button></div>, 
					action: <OverflowMenu><OverflowMenuItem itemText="Edit" onClick={() => handleEdit(li)}/><OverflowMenuItem itemText="Delete" onClick={() => handleDelete(li)}/></OverflowMenu>}
			})
			setTableBody(data)
		} else {
			setTableBody([])
		}
	}, [list])

	React.useEffect(() => {
		if (deleteSuccess) {
			clearDeleteSuccess()
			getEmployees()
			setTableBody([...tableBody])
		}
	}, [deleteSuccess])

	React.useEffect(() => {
		return () => {
			clearDeleteSuccess()
		}
	}, [])

	return (
		<div className="employee-list-table">
			{
				tableBody && <>
				<DataTable
					// filterRows={function noRefCheck() { }}
					headers={[
						{
							header: 'Name',
							key: 'name'
						},
						{
							header: 'Role',
							key: 'role'
						},
						{
							header: 'CTC',
							key: 'ctc'
						},
						{
							header: '',
							key: 'action'
						}
					]}
					locale="en"
					overflowMenuOnHover
					render={renderProp}
					rows={tableBody.slice(
						firstRowIndex,
						firstRowIndex + currentPageSize
					  )}
					// size={null}
					isSortable
					// sortRow={function noRefCheck() { }}
					// translateWithId={function noRefCheck() { }}
					selectedRows={function(e) { console.log(e)}}
				/>
				<Pagination
					totalItems={tableBody.length}
					backwardText="Previous page"
					forwardText="Next page"
					pageSize={currentPageSize}
					pageSizes={[5, 10, 15, 25]}
					itemsPerPageText="Items per page"
					onChange={({ page, pageSize }) => {
						if (pageSize !== currentPageSize) {
							setCurrentPageSize(pageSize);
						}
						setFirstRowIndex(pageSize * (page - 1));
					}}
        		/>
				<Dropdown
						className="dropdown-menu"
						ariaLabel="Dropdown"
						id="carbon-dropdown-example"
						items={items}
						label="Filter employee list based on CTC"
						titleText="Advanced filter Options"
						onChange={(e) => {
							let filterArray = list.filter(item => {
								if (e.selectedItem.ctc.length > 1) {
									if (parseInt(item.ctc) >= e.selectedItem.ctc[0] && parseInt(item.ctc) <= e.selectedItem.ctc[1]) {
										return {
											id: item.id.toString(),
											name: item.name, 
											role: item.role, 
											ctc: item.ctc, 
											isExpanded: item.isExpanded,
											action: <OverflowMenu><OverflowMenuItem itemText="Edit" onClick={() => handleEdit(item)}/><OverflowMenuItem itemText="Delete" onClick={() => handleDelete(item)}/></OverflowMenu>
										}
									} 
								} else {
									if (parseInt(item.ctc) > e.selectedItem.ctc[0]) {
										return {
											id: item.id.toString(),
											name: item.name, 
											role: item.role, 
											ctc: item.ctc, 
											isExpanded: item.isExpanded,
											action: <OverflowMenu><OverflowMenuItem itemText="Edit" onClick={() => handleEdit(item)}/><OverflowMenuItem itemText="Delete" onClick={() => handleDelete(item)}/></OverflowMenu>
										}
									}
								}
								
							})
							console.log(filterArray)
							setTableBody(filterArray);
						}}
					/>
				</>
			}

			{
				<Modal
					className="some-class"
					hasScrollingContent={false}
					iconDescription="Close"
					modalAriaLabel="A label to be read by screen readers on the modal root node"
					modalHeading={`Are you sure you want to delete ${deleteItem.name}?`}
					modalLabel=""
					onRequestClose={function noRefCheck(){ setShowModal(false)}}
					onRequestSubmit={function noRefCheck(){ 
						deleteEmployee(deleteItem.id);
						setShowModal(false)
					}}
					open={showModal}
					passiveModal={false}
					primaryButtonDisabled={false}
					primaryButtonText="Yes"
					secondaryButtonText="No"
					selectorPrimaryFocus="[data-modal-primary-focus]"
					size="sm"
			  	/>
			}
			{
				<Modal
					className="selected-emp-detail-modal"
					hasScrollingContent={true}
					iconDescription="Close"
					modalAriaLabel="A label to be read by screen readers on the modal root node"
					aria-label="sdsdds"
					modalHeading={''}
					modalLabel="Selected Employees Details"
					onRequestClose={function noRefCheck(){ setShowDetailModal(false)}}
					onRequestSubmit={function noRefCheck(){ 
						setShowDetailModal(false)
					}}
					open={showDetailModal}
					passiveModal={false}
					primaryButtonDisabled={true}
					// primaryButtonText="Okay"
					secondaryButtonText="Okay"
					selectorPrimaryFocus="[data-modal-primary-focus]"
					size="sm"
			  	>						
				  	<ol className="selected-emp-list">
						{
							selectedEmp.map(emp => (
								<li key={emp.id}>{emp.name} whose employee id is {emp.id} is a {emp.role} and his/her take home salary is {emp.ctc} INR.</li>
							))
						}
			  		</ol>
			  </Modal>
			}
		</div>

	)
}

const mapStateToProps = (state) => {
	return {
		list: state.employee.employeesData,
		deleteSuccess: state.employee.deleteSuccess
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getEmployees: () => dispatch(getEmployees()),
		deleteEmployee: (id) => dispatch(deleteEmployee(id)),
		clearDeleteSuccess: () => dispatch(clearDeleteSuccess())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList)