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

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/iconify';

import TableNoData from '../../../utils/table-no-data';
import BookTableRow from '../book-table-row';
import BookTableHead from '../book-table-head';
import TableEmptyRows from '../../../utils/table-empty-rows';
import TableToolbar from '../../../utils/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../../../utils/utils';
import AddBook from './add-book-view';
import { deleteBookById, getAllBooks } from '../../../services/book';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// ----------------------------------------------------------------------

export default function BooksView() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [books, setBooks] = useState([]);

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedBookID, setselectedBookID] = useState();

  const handleDeleteClickOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteSelectedBook = (event, id) => {
    handleDeleteClickOpen();
    setselectedBookID(id)
  }

  const handleDeletClickClose = () => {
    setOpenDelete(false); 
  };
  const handleDeletClickAgree = () => {
    deleteSeletedBookById();
    setOpenDelete(false); 
  }

  const deleteSeletedBookById = async() => { 
    await deleteBookById({id:selectedBookID}).then((res) => {
      if(res.status === 200) {
        handleBookListRefresh();
        toast.success(`Book deleted!!`);
      }
    }).catch((err) => {
      toast.error(`Error in code ${err}`);
    });  
  }

  const loadAllBooks = async() => {
    await getAllBooks().then((res) => {
      if(res.status === 200) {
        setBooks(res.resdata)
      }
    }).catch((err) => {
      toast.error(`Error in code ${err}`);
    });  
  }
  
  useEffect( () => {
    loadAllBooks();
  },[])

  const handleBookListRefresh = () => {
    loadAllBooks();
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
      const newSelecteds = books.map((n) => n.name);
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
    inputData: books,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Books</Typography>
        <AddBook onBookListRefresh={handleBookListRefresh}/>
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
              <BookTableHead
                order={order}
                orderBy={orderBy}
                rowCount={books.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'author', label: 'Author' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <BookTableRow
                      key={row.id}
                      name={row.name}
                      status={row.status}
                      author={row.author}
                     selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleDeleteSelectedBook={(event)=>handleDeleteSelectedBook(event, row._id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, books.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={books.length}
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