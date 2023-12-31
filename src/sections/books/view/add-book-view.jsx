import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import Card from "@mui/material/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Label from "../../../components/label/label";
import { bookCreate } from "../../../services/book";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required(),
    author: yup.string().required(),
  })
  .required();

export default function AddBook({onBookListRefresh}) {
  const [open, setOpen] = React.useState(false);
  const [bookStatus, setBookStatus] = React.useState("available");

  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = (event) => {
    setBookStatus(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async(data) => {

    data.status = bookStatus;

    await bookCreate(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Book Added Successfully");
          setOpen(false);
          onBookListRefresh();
          setTimeout(() => {
            navigate("/books-list");
          }, 5000);
        } else {
          toast.error(res.resdata.response.data.message);
        }
      })
      .catch((err) => {
        toast.error(`Error in code ${err}`);
      });

  }

  return (
    <>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Book
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth="true"
          maxWidth="sm"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Add Book</DialogTitle>
            <DialogContent>
              <Card
                sx={{
                  p: 5,
                  width: 1,
                }}
              >
                <Stack sx={{ my: 3 }}>
                  <TextField
                    autoFocus
                    id="name"
                    label="Book Name"
                    type="text"
                    variant="outlined"
                    {...register("name")}
                  />

                  {errors.name?.message ? (
                    <Label color={"error"}>{errors.name?.message}</Label>
                  ) : (
                    ""
                  )}
                </Stack>
                <Stack sx={{ my: 3 }}>
                  <TextField
                    autoFocus
                    id="author"
                    label="Author"
                    type="text"
                    variant="outlined"
                    {...register("author")}
                  />

                  {errors.author?.message ? (
                    <Label color={"error"}>{errors.author?.message}</Label>
                  ) : (
                    ""
                  )}
                </Stack>
                <Stack sx={{ my: 3 }}>
                  <FormControl>
                    <InputLabel id="book-status-label">Status</InputLabel>

                    <Select
                      labelId="book-status-label"
                      id="status"
                      value={bookStatus}
                      label="Status"
                      onChange={handleChange}
                    >
                      <MenuItem value={"available"}>Available</MenuItem>
                      <MenuItem value={"booked"}>Booked</MenuItem>
                    </Select>

                    {errors.status?.message ? (
                      <Label color={"error"}>{errors.status?.message}</Label>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Stack>
              </Card>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="Submit">Save</Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    </>
  );
}
