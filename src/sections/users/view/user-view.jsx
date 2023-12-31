import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from '../../../components/iconify';

import TableNoData from '../../../utils/table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../../../utils/table-empty-rows';
import TableToolbar from '../../../utils/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../../../utils/utils';
import { deleteUserById, getAllUsers } from '../../../services/user';
import { toast } from 'react-toastify';
import AddUser from './add-user-view';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// ----------------------------------------------------------------------

export default function UsersView() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setusers] = useState([]);

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUserID, setselectedUserID] = useState();

  const handleDeleteClickOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteSelectedUser = (event, id) => {
    handleDeleteClickOpen();
    setselectedUserID(id)
  }

  const handleDeletClickClose = () => {
    setOpenDelete(false); 
  };
  const handleDeletClickAgree = () => {
    deleteSeletedUserById();
    setOpenDelete(false); 
  }

  const deleteSeletedUserById = async() => { 
    await deleteUserById({id:selectedUserID}).then((res) => {
      if(res.status === 200) {
        handleUserListRefresh();
        toast.success(`User deleted!!`);
      }
    }).catch((err) => {
      toast.error(`Error in code ${err}`);
    });  
  }

  const loadAllUsers = async() => {
    await getAllUsers().then((res) => {
      if(res.status === 200) {
        setusers(res.resdata)
      }
    }).catch((err) => {
      toast.error(`Error in code ${err}`);
    });  
  }
  
  useEffect( () => {
    loadAllUsers();
  },[])

  const handleUserListRefresh = () => {
    loadAllUsers();
  };
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  
  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <AddUser onUserListRefresh={handleUserListRefresh} />
      </Stack>

      <Card>
        <TableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users?.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'username', label: 'username' },
                  { id: 'role', label: 'Role' },
                  { id: 'contact', label: 'Contact' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row._id}
                      name={row.name}
                      email={row.email}
                      role={row.role}
                      username={row.username}
                      contact={row.contact}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleDeleteSelectedUser={(event)=>handleDeleteSelectedUser(event, row._id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>


     <Dialog
        open={openDelete}
        onClose={handleDeletClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you want to sure to delete this!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you want to sure!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeletClickClose}>Disagree</Button>
          <Button onClick={handleDeletClickAgree} autoFocus>
            Agree 
          </Button>
        </DialogActions>
      </Dialog>
      </>
  );
}
