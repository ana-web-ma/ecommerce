import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Divider,
  Box,
  Modal,
  Grid,
} from '@mui/material';
import type { ReactElement, ChangeEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { Edit, Save, Delete } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { updateMe } from '../../api/calls/customers/update/updateMe';
import { CustomDialog } from '../register/DialogModule';
import { AddressSchema, RegisterSchema } from '../../helpers/yup/Yup';
import { useAppDispatch, useCustomer } from '../../helpers/hooks/Hooks';
import { getMe } from '../../api/calls/getMe';
import { setCustomer } from '../../store/reducers/CustomerSlice';
import { onPromise } from './Password';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '370px', md: '600px' },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Addresses(): ReactElement {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(AddressSchema),
  });

  const dispatch = useAppDispatch();

  const ProfileDataId = localStorage.getItem('EPERFUME_CUSTOMER_ID');

  const ProfileDataObj = useCustomer();

  const [titleAddress, setTitleAddress] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [country, setCountry] = useState('US');
  const [isDefaultShipping, setIsDefaultShipping] = useState<boolean>(false);
  const [isDefaultBilling, setIsDefaultBilling] = useState<boolean>(false);
  const [isAddressShipping, setIsAddressShipping] = useState<boolean>(false);
  const [isAddressBilling, setIsAddressBilling] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [saveId, setSaveId] = useState('');

  useEffect(() => {
    if (ProfileDataId !== null) {
      getMe({ id: JSON.parse(ProfileDataId) })
        .then((data) => {
          dispatch(setCustomer(data.body));
        })
        .catch(console.error);
    }
  }, []);

  // Dialog window
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const openDialog = (title: string, content: React.ReactNode): void => {
    setDialogTitle(title);
    setDialogContent(content);
    setDialogOpen(true);
  };

  // Edit Address

  const handleToggleEditSave = async (): Promise<void> => {
    if (ProfileDataId !== null) {
      updateMe({
        id: JSON.parse(ProfileDataId),
        changeAddress: {
          addressId: saveId,
          address: {
            country,
            city,
            streetName: street,
            postalCode: code,
          },
        },
        setDefaultShippingAddress: {
          addressId: isDefaultShipping ? saveId : undefined,
        },
        setDefaultBillingAddress: {
          addressId: isDefaultBilling ? saveId : undefined,
        },
      })
        .then((res) => {
          if (isAddressBilling && isAddressShipping) {
            updateMe({
              id: res.body.id,
              addShippingAddressId: {
                addressId: saveId,
              },
              addBillingAddressId: {
                addressId: saveId,
              },
            })
              .then((response) => {
                dispatch(setCustomer(response.body));
                openDialog('Successfully', 'Address changed');
              })
              .catch((err) => {
                openDialog('Error', err.toString());
              });
          } else if (isAddressBilling) {
            updateMe({
              id: res.body.id,
              addBillingAddressId: {
                addressId: saveId,
              },
              setDefaultShippingAddress: {
                addressId: isDefaultShipping ? saveId : undefined,
              },
            })
              .then((response) => {
                dispatch(setCustomer(response.body));
                openDialog('Successfully', 'Address changed');
              })
              .catch((err) => {
                openDialog('Error', err.toString());
              });
          } else if (isAddressShipping) {
            updateMe({
              id: res.body.id,
              addShippingAddressId: {
                addressId: saveId,
              },
              setDefaultBillingAddress: {
                addressId: isDefaultBilling ? saveId : undefined,
              },
            })
              .then((response) => {
                dispatch(setCustomer(response.body));
                openDialog('Successfully', 'Address changed');
              })
              .catch((err) => {
                openDialog('Error', err.toString());
              });
          } else {
            dispatch(setCustomer(res.body));
            openDialog('Successfully', 'Address changed');
          }
        })
        .catch((err) => {
          openDialog('Error', err.toString());
        });
    }
  };

  const toggleHandleEditSave = (): void => {
    setOpenModal2(false);
    handleToggleEditSave().catch((error) => {
      console.error('Error handling save click:', error);
    });
  };

  // ====== Add address ===========

  const handleAddAddress = async (): Promise<void> => {
    setOpenModalAdd(false);
    if (ProfileDataId !== null) {
      updateMe({
        id: JSON.parse(ProfileDataId),
        addAddress: {
          address: {
            country,
            city,
            streetName: street,
            postalCode: code,
          },
        },
      })
        .then((res) => {
          const idAddress =
            res.body.addresses !== undefined
              ? res.body.addresses[res.body.addresses.length - 1].id
              : '';
          if (isAddressBilling && isAddressShipping) {
            updateMe({
              id: res.body.id,
              addShippingAddressId: {
                addressId: idAddress,
              },
              addBillingAddressId: {
                addressId: idAddress,
              },
            })
              .then((response) => {
                dispatch(setCustomer(response.body));
                openDialog('Successfully', 'Address created');
              })
              .catch((err) => {
                openDialog('Error', err.toString());
              });
          } else if (isAddressBilling) {
            updateMe({
              id: res.body.id,
              addBillingAddressId: {
                addressId: idAddress,
              },
              setDefaultShippingAddress: {
                addressId: isDefaultShipping ? idAddress : undefined,
              },
            })
              .then((response) => {
                dispatch(setCustomer(response.body));
                openDialog('Successfully', 'Address created');
              })
              .catch((err) => {
                openDialog('Error', err.toString());
              });
          } else if (isAddressShipping) {
            updateMe({
              id: res.body.id,
              addShippingAddressId: {
                addressId: idAddress,
              },
              setDefaultBillingAddress: {
                addressId: isDefaultBilling ? idAddress : undefined,
              },
            })
              .then((response) => {
                dispatch(setCustomer(response.body));
                openDialog('Successfully', 'Address created');
              })
              .catch((err) => {
                openDialog('Error', err.toString());
              });
          } else if (isDefaultShipping || isDefaultBilling) {
            updateMe({
              id: res.body.id,
              setDefaultShippingAddress: {
                addressId: isDefaultShipping ? idAddress : undefined,
              },
              setDefaultBillingAddress: {
                addressId: isDefaultBilling ? idAddress : undefined,
              },
            })
              .then((response) => {
                dispatch(setCustomer(response.body));
                openDialog('Successfully', 'Address created');
              })
              .catch((err) => {
                openDialog('Error', err.toString());
              });
          } else {
            dispatch(setCustomer(res.body));
            openDialog('Successfully', 'Address created');
          }
        })
        .catch((err) => {
          openDialog('Error', err.toString());
        });
    }
  };

  // ====== Delete address ===========

  const handleDeleteClick = async (id: string): Promise<void> => {
    if (ProfileDataId !== null) {
      updateMe({
        id: JSON.parse(ProfileDataId),
        removeAddress: {
          addressId: id,
        },
      })
        .then((res) => {
          dispatch(setCustomer(res.body));
          openDialog('Successfully', 'Address removed!');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleClickDelete = (id: string): void => {
    setOpenModal(false);
    handleDeleteClick(id).catch((error) => {
      console.error('Error handling save click:', error);
    });
  };

  return (
    <div style={{ minHeight: '800px' }}>
      <Button
        sx={{ margin: '20px 0' }}
        variant={'outlined'}
        onClick={() => {
          setStreet('');
          setCity('');
          setCode('');
          setCountry('US');
          setValue('city1', '');
          setValue('post1', '');
          setValue('street1', '');
          setIsAddressBilling(false);
          setIsAddressShipping(false);
          setIsDefaultBilling(false);
          setIsDefaultShipping(false);
          setOpenModalAdd(true);
        }}
      >
        Add new address
      </Button>
      {ProfileDataObj?.addresses.map((address, ind) => {
        let title = 'Address';
        let defaultTitle = '';
        if (
          address.id === ProfileDataObj.defaultBillingAddressId &&
          address.id === ProfileDataObj.defaultShippingAddressId
        ) {
          defaultTitle = 'Default Shipping and Default Billing';
        } else if (address.id === ProfileDataObj.defaultBillingAddressId) {
          defaultTitle = 'Default Billing';
        } else if (address.id === ProfileDataObj.defaultShippingAddressId) {
          defaultTitle = 'Default Shipping';
        }
        if (
          address.id !== undefined &&
          ProfileDataObj.shippingAddressIds !== undefined &&
          ProfileDataObj.billingAddressIds !== undefined
        ) {
          if (defaultTitle === '') {
            if (
              ProfileDataObj.shippingAddressIds.includes(address.id) &&
              ProfileDataObj.billingAddressIds.includes(address.id)
            ) {
              title = 'Shipping and Billing address';
            } else if (ProfileDataObj.shippingAddressIds.includes(address.id)) {
              title = 'Shipping address';
            } else if (ProfileDataObj.billingAddressIds.includes(address.id)) {
              title = 'Billing address';
            }
          } else if (defaultTitle === 'Default Billing') {
            if (ProfileDataObj.shippingAddressIds.includes(address.id)) {
              title = 'and Shipping address';
            }
          } else if (defaultTitle === 'Default Shipping') {
            if (ProfileDataObj.billingAddressIds.includes(address.id)) {
              title = 'and Billing address';
            }
          }
        }
        return (
          <Box key={`box-${ind}`}>
            <Typography
              key={`title-adress${ind}`}
              variant="h3"
              textAlign={'center'}
              style={{ margin: '20px 0' }}
            >
              {`${defaultTitle} ${title}`}
            </Typography>
            <TextField
              key={`streetName${ind}`}
              value={address.streetName}
              fullWidth
              label="Street"
              disabled
              style={{ marginBottom: '16px' }}
            />
            <TextField
              key={`city${ind}`}
              value={address.city}
              fullWidth
              label="City"
              disabled
              style={{ marginBottom: '16px' }}
            />
            <TextField
              key={`postalCode${ind}`}
              value={address.postalCode}
              fullWidth
              label="Code"
              disabled
              style={{ marginBottom: '16px' }}
            />
            <TextField
              key={`country${ind}`}
              value={address.country}
              fullWidth
              label="Country"
              disabled
              style={{ marginBottom: '16px' }}
            />
            <Button
              sx={{ margin: '20px 0' }}
              key={`Button1${ind}`}
              startIcon={<Edit />}
              onClick={() => {
                setTitleAddress(`${defaultTitle} ${title}`);
                if (address.streetName !== undefined) {
                  setStreet(address.streetName);
                  setValue('street1', address.streetName);
                }
                if (address.city !== undefined) {
                  setCity(address.city);
                  setValue('city1', address.city);
                }
                if (address.postalCode !== undefined) {
                  setCode(address.postalCode);
                  setValue('post1', address.postalCode);
                }
                setCountry(address.country);
                setSaveId(address.id !== undefined ? address.id : '');
                setOpenModal2(true);
              }}
            >
              Edit
            </Button>
            <Button
              startIcon={<Delete />}
              key={`Button2${ind}`}
              onClick={() => {
                if (address.id !== undefined) {
                  setDeleteId(address.id);
                  setOpenModal(true);
                }
              }}
            >
              Delete
            </Button>
            <Divider />
          </Box>
        );
      })}
      <CustomDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        title={dialogTitle}
        content={dialogContent}
      />

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} textAlign={'center'}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure?
          </Typography>
          <Button
            startIcon={<Delete />}
            onClick={() => {
              handleClickDelete(deleteId);
            }}
          >
            Delete
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openModal2}
        onClose={() => {
          setOpenModal2(false);
          setStreet('');
          setCity('');
          setCode('');
          clearErrors();
        }}
      >
        <Box sx={style} textAlign={'center'}>
          <form onSubmit={onPromise(handleSubmit(toggleHandleEditSave))}>
            <Typography variant="subtitle1">Change your</Typography>
            <Typography variant="h2" fontSize={'30px'}>
              {titleAddress}
            </Typography>
            <TextField
              value={street}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                setStreet(e.target.value);
              }}
              fullWidth
              label="Street"
              style={{ margin: '16px 0' }}
              error={!(errors.street1 == null) && openModal2}
              helperText={
                errors.street1 != null ? errors.street1.message?.toString() : ''
              }
              {...register('street1')}
            />
            <TextField
              value={city}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                setCity(e.target.value);
              }}
              fullWidth
              label="City"
              style={{ margin: '16px 0' }}
              error={!(errors.city1 == null) && openModal2}
              helperText={
                errors.city1 != null ? errors.city1.message?.toString() : ''
              }
              {...register('city1')}
            />
            <TextField
              value={code}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                setCode(e.target.value);
              }}
              fullWidth
              label="Code"
              style={{ margin: '16px 0' }}
              error={!(errors.post1 == null) && openModal2}
              helperText={
                errors.post1 != null ? errors.post1.message?.toString() : ''
              }
              {...register('post1')}
            />
            <FormControl
              fullWidth
              variant="filled"
              style={{ margin: '16px 0' }}
            >
              <InputLabel>Country</InputLabel>
              <Select
                label="Country"
                value={country}
                onChange={(e: SelectChangeEvent) => {
                  setCountry(e.target.value);
                }}
              >
                <MenuItem value={'US'}>USA</MenuItem>
                <MenuItem value={'FR'}>France</MenuItem>
              </Select>
            </FormControl>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="inherit"
                  sx={{ marginTop: { sm: '13px' }, textAlign: { sm: 'start' } }}
                >
                  <Checkbox
                    size="small"
                    sx={{
                      top: '-1px',
                    }}
                    checked={isDefaultShipping}
                    onChange={(event) => {
                      setIsDefaultShipping(event.target.checked);
                    }}
                  />
                  Set as Default Shipping
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="inherit"
                  sx={{ marginTop: { sm: '13px' }, textAlign: { sm: 'end' } }}
                >
                  <Checkbox
                    size="small"
                    sx={{
                      top: '-1px',
                    }}
                    checked={isDefaultBilling}
                    onChange={(event) => {
                      setIsDefaultBilling(event.target.checked);
                    }}
                  />
                  Set as Default Billing
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="inherit"
                  sx={{ marginTop: { sm: '13px' }, textAlign: { sm: 'start' } }}
                >
                  <Checkbox
                    size="small"
                    sx={{
                      top: '-1px',
                    }}
                    disabled={isDefaultShipping}
                    checked={isAddressShipping}
                    onChange={(event) => {
                      setIsAddressShipping(event.target.checked);
                    }}
                  />
                  Set as Shipping
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="inherit"
                  sx={{ marginTop: { sm: '13px' }, textAlign: { sm: 'end' } }}
                >
                  <Checkbox
                    size="small"
                    sx={{
                      top: '-1px',
                    }}
                    disabled={isDefaultBilling}
                    checked={isAddressBilling}
                    onChange={(event) => {
                      setIsAddressBilling(event.target.checked);
                    }}
                  />
                  Set as Billing
                </Typography>
              </Grid>
            </Grid>
            <Button startIcon={<Save />} type="submit">
              Save
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openModalAdd}
        onClose={() => {
          setOpenModalAdd(false);
          setIsAddressBilling(false);
          setIsAddressShipping(false);
          setIsDefaultBilling(false);
          setIsDefaultShipping(false);
          clearErrors();
        }}
      >
        <Box sx={style} textAlign={'center'}>
          <form onSubmit={onPromise(handleSubmit(handleAddAddress))}>
            <Typography variant="subtitle1">Add address</Typography>
            <TextField
              value={street}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                setStreet(e.target.value);
              }}
              fullWidth
              label="Street"
              style={{ margin: '16px 0' }}
              error={!(errors.street1 == null) && openModalAdd}
              helperText={
                errors.street1 != null ? errors.street1.message?.toString() : ''
              }
              {...register('street1')}
            />
            <TextField
              value={city}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                setCity(e.target.value);
              }}
              fullWidth
              label="City"
              style={{ margin: '16px 0' }}
              error={!(errors.city1 == null) && openModalAdd}
              helperText={
                errors.city1 != null ? errors.city1.message?.toString() : ''
              }
              {...register('city1')}
            />
            <TextField
              value={code}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                setCode(e.target.value);
              }}
              fullWidth
              label="Code"
              style={{ margin: '16px 0' }}
              error={!(errors.post1 == null) && openModalAdd}
              helperText={
                errors.post1 != null ? errors.post1.message?.toString() : ''
              }
              {...register('post1')}
            />
            <FormControl
              fullWidth
              variant="filled"
              style={{ margin: '16px 0' }}
            >
              <InputLabel>Country</InputLabel>
              <Select
                label="Country"
                value={country}
                onChange={(e: SelectChangeEvent) => {
                  setCountry(e.target.value);
                }}
              >
                <MenuItem value={'US'}>USA</MenuItem>
                <MenuItem value={'FR'}>France</MenuItem>
              </Select>
            </FormControl>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="inherit"
                  sx={{ marginTop: { sm: '13px' }, textAlign: { sm: 'start' } }}
                >
                  <Checkbox
                    size="small"
                    sx={{
                      top: '-1px',
                    }}
                    checked={isDefaultShipping}
                    onChange={(event) => {
                      setIsDefaultShipping(event.target.checked);
                    }}
                  />
                  Set as Default Shipping
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="inherit"
                  sx={{ marginTop: { sm: '13px' }, textAlign: { sm: 'end' } }}
                >
                  <Checkbox
                    size="small"
                    sx={{
                      top: '-1px',
                    }}
                    checked={isDefaultBilling}
                    onChange={(event) => {
                      setIsDefaultBilling(event.target.checked);
                    }}
                  />
                  Set as Default Billing
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="inherit"
                  sx={{ marginTop: { sm: '13px' }, textAlign: { sm: 'start' } }}
                >
                  <Checkbox
                    size="small"
                    sx={{
                      top: '-1px',
                    }}
                    disabled={isDefaultShipping}
                    checked={isAddressShipping}
                    onChange={(event) => {
                      setIsAddressShipping(event.target.checked);
                    }}
                  />
                  Set as Shipping
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="inherit"
                  sx={{ marginTop: { sm: '13px' }, textAlign: { sm: 'end' } }}
                >
                  <Checkbox
                    size="small"
                    sx={{
                      top: '-1px',
                    }}
                    disabled={isDefaultBilling}
                    checked={isAddressBilling}
                    onChange={(event) => {
                      setIsAddressBilling(event.target.checked);
                    }}
                  />
                  Set as Billing
                </Typography>
              </Grid>
            </Grid>
            <Button startIcon={<Save />} type="submit">
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
export default Addresses;
