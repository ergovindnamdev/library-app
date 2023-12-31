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
import { createTrans } from "../../../services/library_trans";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    user: yup.string().required(),
    book: yup.string().required(),
    due_date: yup.string().required(),
  })
  .required();

export default function AddTrans({onBookListRefresh}) {
  const [open, setOpen] = React.useState(false);

const [transType, setTransType] = React.useState("available");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = (event) => {
    setTransType(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async(data) => {

    data.status = transType;

    await createTrans(data)
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
          Add Transaction
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth="true"
          maxWidth="sm"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Add Transaction</DialogTitle>
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
                    id="book"
                    label="Book Name"
                    type="text"
                    variant="outlined"
                    {...register("book")}
                  />

                  {errors.book?.message ? (
                    <Label color={"error"}>{errors.book?.message}</Label>
                  ) : (
                    ""
                  )}
                </Stack>
                <Stack sx={{ my: 3 }}>
                  <TextField
                    autoFocus
                    id="user"
                    label="User"
                    type="text"
                    variant="outlined"
                    {...register("user")}
                  />

                  {errors.user?.message ? (
                    <Label color={"error"}>{errors.user?.message}</Label>
                  ) : (
                    ""
                  )}
                </Stack>
                <Stack sx={{ my: 3 }}>
                  <TextField
                    autoFocus
                    id="due_date"
                    label="Due Date"
                    type="text"
                    variant="outlined"
                    {...register("due_date")}
                  />

                  {errors.due_date?.message ? (
                    <Label color={"error"}>{errors.due_date?.message}</Label>
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
                      value={transType}
                      label="Status"
                      onChange={handleChange}
                    >
                      <MenuItem value={"available"}>Available</MenuItem>
                      <MenuItem value={"booked"}>Booked</MenuItem>
                    </Select>
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
