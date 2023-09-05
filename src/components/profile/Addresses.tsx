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
import { useFieldArray, useForm } from 'react-hook-form';
import { updateMe } from '../../api/calls/customers/update/updateMe';
import { CustomDialog } from '../register/DialogModule';
import { RegisterSchema } from '../../helpers/yup/Yup';
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
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
  });

  const dispatch = useAppDispatch();

  const ProfileDataId = localStorage.getItem('EPERFUME_CUSTOMER_ID');

  const ProfileDataObj = useCustomer();

  const [titleAddress, setTitleAddress] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [streetChange, setStreetChange] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [cityChange, setCityChange] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [codeChange, setCodeChange] = useState<string>('');
  const [country, setCountry] = useState('US');
  const [countryChange, setCountryChange] = useState('US');
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [isDefaultShipping, setIsDefaultShipping] = useState<boolean>(false);
  const [isDefaultBilling, setIsDefaultBilling] = useState<boolean>(false);
  const [isAddressShipping, setIsAddressShipping] = useState<boolean>(false);
  const [isAddressBilling, setIsAddressBilling] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [saveId, setSaveId] = useState('');

  useEffect((): void => {
    setStreetChange(street);
  }, [street]);

  useEffect((): void => {
    setCityChange(city);
  }, [city]);

  useEffect((): void => {
    setCodeChange(code);
  }, [code]);

  useEffect((): void => {
    setCountryChange(country);
  }, [country]);

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

  const handleToggleEditSave = async (id: string): Promise<void> => {
    if (ProfileDataId !== null) {
      updateMe({
        id: JSON.parse(ProfileDataId),
        changeAddress: {
          addressId: id,
          address: {
            country: countryChange,
            city,
            streetName: street,
            postalCode: code,
          },
        },
        setDefaultShippingAddress: {
          addressId: id,
        },
      })
        .then((res) => {
          dispatch(setCustomer(res.body));
          openDialog('Successfully', 'Address changed');
        })
        .catch((err) => {
          openDialog('Error', err.toString());
        });
    }
  };

  const toggleHandleEditSave = (id: string): void => {
    setOpenModal2(false);
    handleToggleEditSave(id).catch((error) => {
      console.error('Error handling save click:', error);
    });
  };

  const handleAddAddress = async (): Promise<void> => {
    setOpenModalAdd(false);
    if (ProfileDataId !== null) {
      updateMe({
        id: JSON.parse(ProfileDataId),
        addAddress: {
          address: {
            country: countryChange,
            city,
            streetName: street,
            postalCode: code,
          },
        },
      })
        .then((res) => {
          console.log(res);
          const idAddress =
            res.body.addresses !== undefined
              ? res.body.addresses[res.body.addresses.length - 1].id
              : '';
          if (isDefaultShipping || isDefaultBilling) {
            updateMe({
              id: res.body.id,
              setDefaultShippingAddress: {
                addressId: isDefaultShipping ? idAddress : undefined,
              },
              setDefaultBillingAddress: {
                addressId: isDefaultBilling ? idAddress : undefined,
              },
            })
              .then((resp) => {
                dispatch(setCustomer(resp.body));
                openDialog('Successfully', 'Address created');
              })
              .catch((err) => {
                openDialog('Error', err.toString());
              });
          } else if (isAddressShipping && isAddressBilling) {
            updateMe({
              id: res.body.id,
              addShippingAddressId: {
                addressId: isAddressShipping ? idAddress : undefined,
              },
              addBillingAddressId: {
                addressId: isAddressBilling ? idAddress : undefined,
              },
            })
              .then((resp) => {
                dispatch(setCustomer(resp.body));
                openDialog('Successfully', 'Address created');
              })
              .catch((err) => {
                openDialog('Error', err.toString());
              });
          } else if (isAddressShipping) {
            updateMe({
              id: res.body.id,
              addShippingAddressId: {
                addressId: isAddressShipping ? idAddress : undefined,
              },
            })
              .then((resp) => {
                dispatch(setCustomer(resp.body));
                openDialog('Successfully', 'Address created');
              })
              .catch((err) => {
                openDialog('Error', err.toString());
              });
          } else if (isAddressBilling) {
            updateMe({
              id: res.body.id,
              addBillingAddressId: {
                addressId: isAddressBilling ? idAddress : undefined,
              },
            })
              .then((resp) => {
                dispatch(setCustomer(resp.body));
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
          setOpenModalAdd(true);
          setCountryChange('US');
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
          defaultTitle = 'Default Sipping and Default Billing';
        } else if (address.id === ProfileDataObj.defaultBillingAddressId) {
          defaultTitle = 'Default Billing';
        } else if (address.id === ProfileDataObj.defaultShippingAddressId) {
          defaultTitle = 'Default Sipping';
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
                setStreet(
                  address.streetName !== undefined ? address.streetName : '',
                );
                setCity(address.city !== undefined ? address.city : '');
                setCode(
                  address.postalCode !== undefined ? address.postalCode : '',
                );
                setCountry(address.country);
                setIsDefault(defaultTitle !== '');
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
          setCountry('');
          setIsDefault(false);
          clearErrors('city1');
          clearErrors('post1');
          clearErrors('street1');
        }}
      >
        <Box sx={style} textAlign={'center'}>
          <form>
            <Typography variant="subtitle1">Change your</Typography>
            <Typography variant="h2" fontSize={'30px'}>
              {titleAddress}
            </Typography>
            <TextField
              value={streetChange}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                setStreet(e.target.value);
              }}
              fullWidth
              label="Street"
              style={{ margin: '16px 0' }}
              error={!(errors.street1 == null) && !openModal2}
              helperText={
                errors.street1 != null ? errors.street1.message?.toString() : ''
              }
              {...register('street1')}
            />
            <TextField
              value={cityChange}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                setCity(e.target.value);
              }}
              fullWidth
              label="City"
              style={{ margin: '16px 0' }}
              error={!(errors.city1 == null)}
              helperText={
                errors.city1 != null ? errors.city1.message?.toString() : ''
              }
              {...register('city1')}
            />
            <TextField
              value={codeChange}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                setCode(e.target.value);
              }}
              fullWidth
              label="Code"
              style={{ margin: '16px 0' }}
              error={!(errors.post1 == null)}
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
                value={countryChange}
                onChange={(e: SelectChangeEvent) => {
                  setCountryChange(e.target.value);
                }}
              >
                <MenuItem value={'US'}>USA</MenuItem>
                <MenuItem value={'FR'}>France</MenuItem>
              </Select>
            </FormControl>
            <Button
              startIcon={<Save />}
              onClick={() => {
                toggleHandleEditSave(saveId);
              }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openModalAdd}
        onClose={() => {
          setOpenModalAdd(false);
          setStreet('');
          setCity('');
          setCode('');
          clearErrors('city1');
          clearErrors('post1');
          clearErrors('street1');
          setIsAddressBilling(false);
          setIsAddressShipping(false);
          setIsDefaultBilling(false);
          setIsDefaultShipping(false);
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
            <Button
              startIcon={<Save />}
              type="submit"
              onClick={() => {
                if (
                  errors.city1 == null &&
                  errors.post1 == null &&
                  errors.street1 == null
                ) {
                  console.log(city, street, countryChange, code);
                }
                // void handleAddAddress();
                // toggleHandleEditSave(saveId);
              }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
export default Addresses;
