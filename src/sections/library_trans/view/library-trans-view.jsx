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
import LibraryTableRow from '../library-trans-table-row';
import LibraryTableHead from '../library-trans-table-head';
import TableEmptyRows from '../../../utils/table-empty-rows';
import TableToolbar from '../../../utils/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../../../utils/utils';
import { deleteTransById, getAllTrans } from '../../../services/library_trans';
import { toast } from 'react-toastify';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddTrans from './add-library-trans-view';

// ----------------------------------------------------------------------

export default function LibraryTransView() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [library_trans, setLibraryTrans] = useState([]);

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedTransID, setselectedTransID] = useState();

  const handleDeleteClickOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteSelectedTrans = (event, id) => {
    handleDeleteClickOpen();
    setselectedTransID(id)
  }

  const handleDeletClickClose = () => {
    setOpenDelete(false); 
  };
  const handleDeletClickAgree = () => {
    deleteSeletedTransById();
    setOpenDelete(false); 
  }

  const deleteSeletedTransById = async() => { 
    await deleteTransById({id:selectedTransID}).then((res) => {
      if(res.status === 200) {
        handleTransListRefresh();
        toast.success(`Library Transaction deleted!!`);
      }
    }).catch((err) => {
      toast.error(`Error in code ${err}`);
    });  
  }

  const loadAllTrans = async() => {
    await getAllTrans().then((res) => {
      if(res.status === 200) {
        setLibraryTrans(res.resdata)
      }
    }).catch((err) => {
      toast.error(`Error in code ${err}`);
    });  
  }
  
  useEffect( () => {
    loadAllTrans();
  },[])

  const handleTransListRefresh = () => {
    loadAllTrans();
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
      const newSelecteds = library_trans.map((n) => n.name);
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
    inputData: library_trans,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">LibraryTrans</Typography>
        <AddTrans onTransListRefresh={handleTransListRefresh} />
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
              <LibraryTableHead
                order={order}
                orderBy={orderBy}
                rowCount={library_trans.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'User' },
                  { id: 'book', label: 'Book' },
                  { id: 'due_date', label: 'Due Date' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <LibraryTableRow
                      key={row.id}
                      name={row.name}
                      book={row.book}
                      due_date={row.due_date}
                      status={row.status}
                     selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleDeleteSelectedTrans={(event)=>handleDeleteSelectedTrans(event, row._id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, library_trans.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={library_trans.length}
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