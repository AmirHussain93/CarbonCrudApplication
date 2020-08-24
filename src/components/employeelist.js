import React from 'react';
import { connect } from 'react-redux';
import { DataTable, Button, Modal, Pagination } from 'carbon-components-react';

import getEmployees from '../store/actions/getEmployees';
import deleteEmployee from '../store/actions/deleteEmployee';
import { clearDeleteSuccess } from '../store/actions/clearState';

import '../app.scss';

function EmployeeList(props) {
    const { getEmployees, list, deleteEmployee, deleteSuccess, clearDeleteSuccess } = props;
	const [tableBody, setTableBody] = React.useState([]);
	const [showModal, setShowModal] = React.useState(false);
	const [deleteItem, setDeleteItem] = React.useState({});
	const [firstRowIndex, setFirstRowIndex] = React.useState(0);
    const [currentPageSize, setCurrentPageSize] = React.useState(5);
      
    const renderProp = ({ rows, headers, getHeaderProps, onInputChange }) => (
		<>
		<DataTable.TableContainer title="Employee List">
			<DataTable.TableToolbar>
				<DataTable.TableToolbarContent>
					<DataTable.TableToolbarSearch onChange={onInputChange} />
					<Button onClick={() => props.history.push('employee/new')} size="small" kind="primary" className="add-employee-btn" data-test="addNew">
						Add Employee
			  		</Button>
				</DataTable.TableToolbarContent>
			</DataTable.TableToolbar>
			{
				tableBody && tableBody.length > 0 && <DataTable.Table>
				<DataTable.TableHead>
					<DataTable.TableRow>
						{headers.map((header) => (
							<DataTable.TableHeader key={header.key} {...getHeaderProps({ header })}>
								{header.header}
							</DataTable.TableHeader>
						))}
					</DataTable.TableRow>
				</DataTable.TableHead>
				<DataTable.TableBody>
					{rows.map((row) => (
						<DataTable.TableRow key={row.id}>
							{row.cells.map((cell) => (
								<DataTable.TableCell key={cell.id}>{cell.value}</DataTable.TableCell>
							))}
						</DataTable.TableRow>
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
				return { ...li, id: li.id.toString(), ctc: Number(li.ctc).toLocaleString(), action: <div><Button size="small" className="edit-employee" onClick={() => handleEdit(li)} data-test="editEmployee">Edit</Button><Button className="delete-employee" size="small" onClick={() => handleDelete(li)}>Delete</Button></div> }
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
							header: 'Action',
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
					size={null}
					sortRow={function noRefCheck() { }}
					translateWithId={function noRefCheck() { }}
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