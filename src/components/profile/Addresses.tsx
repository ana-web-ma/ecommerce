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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Addresses(): ReactElement {
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
  });

  const dispatch = useAppDispatch();

  const ProfileDataId = localStorage.getItem('EPERFUME_CUSTOMER_ID');

  const ProfileDataObj = useCustomer();

  const [shippingId, setShippingId] = useState<string>('');
  const [billingId, setBillingId] = useState<string>('');
  const [shippingStreet, setShippingStreet] = useState<string | undefined>('');
  const [shippingCity, setShippingCity] = useState<string | undefined>('');
  const [shippingCode, setShippingCode] = useState<string | undefined>('');
  const [shippingCountry, setShippingCountry] = useState('FR');
  const [isDefaultShipping, setIsDefaultShipping] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBilling, setIsEditingBilling] = useState(false);

  const [titleAddress, setTitleAddress] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [streetChange, setStreetChange] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [cityChange, setCityChange] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [codeChange, setCodeChange] = useState<string>('');
  const [country, setCountry] = useState('');
  const [countryChange, setCountryChange] = useState('');
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
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
          addressId: shippingId,
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
    handleToggleEditSave(id).catch((error) => {
      console.error('Error handling save click:', error);
    });
  };
  // const handleToggleEditSaveBilling = async (): Promise<void> => {
  //   if (ProfileDataId !== null && isEditingBilling && isDefaultBilling) {
  //     updateMe({
  //       id: JSON.parse(ProfileDataId),
  //       changeAddress: {
  //         addressId: billingId,
  //         address: {
  //           country: typeof billingCountry === 'string' ? billingCountry : '',
  //           city: billingCity,
  //           streetName: billingStreet,
  //           postalCode: billingCode,
  //         },
  //       },
  //       setDefaultBillingAddress: {
  //         addressId: billingId,
  //       },
  //     })
  //       .then((res) => {
  //         dispatch(setCustomer(res.body));
  //         openDialog('Successfully', 'Address changed');
  //       })
  //       .catch((err) => {
  //         openDialog('Error', err.toString());
  //       });
  //   } else if (
  //     ProfileDataId !== null &&
  //     isEditingBilling &&
  //     !isDefaultBilling
  //   ) {
  //     updateMe({
  //       id: JSON.parse(ProfileDataId),
  //       changeAddress: {
  //         addressId: billingId,
  //         address: {
  //           country: typeof billingCountry === 'string' ? billingCountry : '',
  //           city: billingCity,
  //           streetName: billingStreet,
  //           postalCode: billingCode,
  //         },
  //       },
  //       setDefaultBillingAddress: {
  //         addressId: undefined,
  //       },
  //     })
  //       .then((res) => {
  //         dispatch(setCustomer(res.body));
  //         openDialog('Successfully', 'Address changed');
  //       })
  //       .catch((err) => {
  //         openDialog('Error', err.toString());
  //       });
  //   }
  //   setIsEditingBilling(!isEditingBilling);
  // };
  // const toggleHandleEditSaveBilling = (): void => {
  //   handleToggleEditSaveBilling().catch((error) => {
  //     console.error('Error handling save click:', error);
  //   });
  // };
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

  const handleDeleteClickBilling = (): void => {
    // logic
  };
  return (
    <div style={{ minHeight: '800px' }}>
      {ProfileDataObj?.addresses.map((address, ind) => {
        let title = 'Address';
        let defaultTitle = '';
        if (
          address.id === ProfileDataObj.defaultBillingAddressId ||
          address.id === ProfileDataObj.defaultShippingAddressId
        ) {
          defaultTitle = 'Default';
        }
        if (
          address.id !== undefined &&
          ProfileDataObj.shippingAddressIds !== undefined &&
          ProfileDataObj.billingAddressIds !== undefined
        ) {
          if (ProfileDataObj.shippingAddressIds.includes(address.id)) {
            title = 'Shipping address';
          } else if (ProfileDataObj.billingAddressIds.includes(address.id)) {
            title = 'Billing address';
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
          <FormControl fullWidth variant="filled" style={{ margin: '16px 0' }}>
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
              // handleSave(deleteId);
            }}
          >
            Save
          </Button>
        </Box>
      </Modal>
      <FormControl fullWidth variant="filled" style={{ margin: '16px 0' }}>
        <InputLabel>Country</InputLabel>
        <Select
          label="Country"
          value={countryChange}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            setCountry(e.target.value);
          }}
        >
          <MenuItem value={'US'}>USA</MenuItem>
          <MenuItem value={'FR'}>France</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
export default Addresses;
