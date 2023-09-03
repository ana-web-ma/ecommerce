import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from '@mui/material';
import type { ReactElement, ChangeEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { Edit, Save, Delete } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { updateMe } from '../../api/calls/customers/update/updateMe';
import { CustomDialog } from '../register/DialogModule';
import { RegisterSchema } from '../../helpers/yup/Yup';

function Addresses(): ReactElement {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
  });
  const ProfileData = localStorage.getItem('EPERFUME_CUSTOMER_DATA');
  let ProfileDataObj = null;
  if (ProfileData !== null) {
    ProfileDataObj = JSON.parse(ProfileData);
  }
  const { id } = ProfileDataObj;

  const shippingId = ProfileDataObj.shippingAddressIds[0];
  let shippingIndex = 0;
  if (ProfileDataObj.addresses[0].id === shippingId) {
    shippingIndex = 0;
  } else if (ProfileDataObj.addresses[1].id === shippingId) {
    shippingIndex = 1;
  }
  const [shippingStreet, setShippingStreet] = useState(
    ProfileDataObj.addresses[shippingIndex].streetName,
  );
  const [shippingCity, setShippingCity] = useState(
    ProfileDataObj.addresses[shippingIndex].city,
  );
  const [shippingCode, setShippingCode] = useState(
    ProfileDataObj.addresses[shippingIndex].postalCode,
  );
  const [shippingCountry, setShippingCountry] = useState(
    ProfileDataObj.addresses[shippingIndex].country,
  );
  const [isDefaultShipping, setIsDefaultShipping] = useState(
    ProfileDataObj.shippingAddressIds[0] ===
      ProfileDataObj.defaultShippingAddressId,
  );

  const billingId = ProfileDataObj.billingAddressIds[0];
  let billingIndex = 0;
  if (ProfileDataObj.addresses[0].id === billingId) {
    billingIndex = 0;
  } else if (ProfileDataObj.addresses[1].id === billingId) {
    billingIndex = 1;
  }
  const [billingStreet, setBillingStreet] = useState(
    ProfileDataObj.addresses[billingIndex].streetName,
  );
  const [billingCity, setBillingCity] = useState(
    ProfileDataObj.addresses[billingIndex].city,
  );
  const [billingCode, setBillingCode] = useState(
    ProfileDataObj.addresses[billingIndex].postalCode,
  );
  const [billingCountry, setBillingCountry] = useState(
    ProfileDataObj.addresses[billingIndex].country,
  );
  const [isDefaultBilling, setIsDefaultBilling] = useState(
    ProfileDataObj.billingAddressIds[0] ===
      ProfileDataObj.defaultBillingAddressId,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBilling, setIsEditingBilling] = useState(false);

  const handleChangeShippingStreet = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setShippingStreet(event.target.value);
  };
  const handleChangeShippingCity = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setShippingCity(event.target.value);
  };
  const handleChangeShippingCode = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setShippingCode(event.target.value);
  };
  const handleChangeShippingCountry = (
    event: SelectChangeEvent<HTMLInputElement>,
  ): void => {
    setShippingCountry(event.target.value);
  };

  const handleChangeBillingStreet = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setBillingStreet(event.target.value);
  };
  const handleChangeBillingCity = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setBillingCity(event.target.value);
  };
  const handleChangeBillingCode = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setBillingCode(event.target.value);
  };
  const handleChangeBillingCountry = (
    event: SelectChangeEvent<HTMLInputElement>,
  ): void => {
    setBillingCountry(event.target.value);
  };

  // Dialog window
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const openDialog = (title: string, content: React.ReactNode): void => {
    setDialogTitle(title);
    setDialogContent(content);
    setDialogOpen(true);
  };

  const handleToggleEditSave = async (): Promise<void> => {
    if (isEditing && isDefaultShipping) {
      updateMe({
        id,
        changeAddress: {
          addressId: shippingId,
          address: {
            country: shippingCountry,
            city: shippingCity,
            streetName: shippingStreet,
            postalCode: shippingCode,
          },
        },
        setDefaultShippingAddress: {
          addressId: shippingId,
        },
      })
        .then((res) => {
          localStorage.setItem(
            'EPERFUME_CUSTOMER_DATA',
            JSON.stringify(res.body),
          );
          openDialog('Successfully', 'Address changed');
        })
        .catch((err) => {
          openDialog('Error', err.toString());
        });
    } else if (isEditing && !isDefaultShipping) {
      updateMe({
        id,
        changeAddress: {
          addressId: shippingId,
          address: {
            country: shippingCountry,
            city: shippingCity,
            streetName: shippingStreet,
            postalCode: shippingCode,
          },
        },
        setDefaultShippingAddress: {
          addressId: undefined,
        },
      })
        .then((res) => {
          localStorage.setItem(
            'EPERFUME_CUSTOMER_DATA',
            JSON.stringify(res.body),
          );
          openDialog('Successfully', 'Address changed');
        })
        .catch((err) => {
          openDialog('Error', err.toString());
        });
    }
    setIsEditing(!isEditing);
  };
  const toggleHandleEditSave = (): void => {
    handleToggleEditSave().catch((error) => {
      console.error('Error handling save click:', error);
    });
  };
  const handleToggleEditSaveBilling = async (): Promise<void> => {
    if (isEditingBilling && isDefaultBilling) {
      updateMe({
        id,
        changeAddress: {
          addressId: billingId,
          address: {
            country: billingCountry,
            city: billingCity,
            streetName: billingStreet,
            postalCode: billingCode,
          },
        },
        setDefaultBillingAddress: {
          addressId: billingId,
        },
      })
        .then((res) => {
          localStorage.setItem(
            'EPERFUME_CUSTOMER_DATA',
            JSON.stringify(res.body),
          );
          openDialog('Successfully', 'Address changed');
        })
        .catch((err) => {
          openDialog('Error', err.toString());
        });
    } else if (isEditingBilling && !isDefaultBilling) {
      updateMe({
        id,
        changeAddress: {
          addressId: billingId,
          address: {
            country: billingCountry,
            city: billingCity,
            streetName: billingStreet,
            postalCode: billingCode,
          },
        },
        setDefaultBillingAddress: {
          addressId: undefined,
        },
      })
        .then((res) => {
          localStorage.setItem(
            'EPERFUME_CUSTOMER_DATA',
            JSON.stringify(res.body),
          );
          openDialog('Successfully', 'Address changed');
        })
        .catch((err) => {
          openDialog('Error', err.toString());
        });
    }
    setIsEditingBilling(!isEditingBilling);
  };
  const toggleHandleEditSaveBilling = (): void => {
    handleToggleEditSaveBilling().catch((error) => {
      console.error('Error handling save click:', error);
    });
  };
  const handleDeleteClick = async (): Promise<void> => {
    // updateMe({
    //   id,
    //   removeAddress: {
    //     addressId: shippingId,
    //   },
    // })
    //   .then((res) => {
    //     localStorage.setItem(
    //       'EPERFUME_CUSTOMER_DATA',
    //       JSON.stringify(res.body),
    //     );
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const handleClickDelete = (): void => {
    handleDeleteClick().catch((error) => {
      console.error('Error handling save click:', error);
    });
  };

  const handleDeleteClickBilling = (): void => {
    // logic
  };
  return (
    <div style={{ minHeight: '800px' }}>
      <Typography
        variant="h3"
        textAlign={'center'}
        style={{ marginTop: '30px' }}
      >
        Shipping address
      </Typography>
      <TextField
        value={shippingStreet}
        onInput={handleChangeShippingStreet}
        fullWidth
        label="Street"
        disabled={!isEditing}
        style={{ marginBottom: '16px' }}
        error={!(errors.street1 == null)}
        helperText={
          errors.street1 != null ? errors.street1.message?.toString() : ''
        }
        {...register('street1')}
      />
      <TextField
        value={shippingCity}
        onInput={handleChangeShippingCity}
        fullWidth
        label="City"
        disabled={!isEditing}
        style={{ marginBottom: '16px' }}
        error={!(errors.city1 == null)}
        helperText={
          errors.city1 != null ? errors.city1.message?.toString() : ''
        }
        {...register('city1')}
      />
      <TextField
        value={shippingCode}
        onInput={handleChangeShippingCode}
        fullWidth
        label="Code"
        disabled={!isEditing}
        style={{ marginBottom: '16px' }}
        error={!(errors.post1 == null)}
        helperText={
          errors.post1 != null ? errors.post1.message?.toString() : ''
        }
        {...register('post1')}
      />
      <FormControl fullWidth variant="filled">
        <InputLabel>Country</InputLabel>
        <Select
          label="Country"
          value={shippingCountry}
          onChange={handleChangeShippingCountry}
          disabled={!isEditing}
        >
          <MenuItem value={'US'}>USA</MenuItem>
          <MenuItem value={'FR'}>France</MenuItem>
        </Select>
      </FormControl>
      <Typography
        variant="inherit"
        sx={{ marginTop: { sm: '13px' }, textAlign: { sm: 'end' } }}
      >
        <Checkbox
          size="small"
          sx={{
            top: '-1px',
          }}
          disabled={!isEditing}
          checked={isDefaultShipping}
          onChange={(event) => {
            if (event.target.checked) setIsDefaultShipping(true);
            else setIsDefaultShipping(false);
          }}
        />
        Set as default
      </Typography>
      <Button
        startIcon={isEditing ? <Save /> : <Edit />}
        onClick={toggleHandleEditSave}
        disabled={
          errors.street1 != null || errors.city1 != null || errors.post1 != null
        }
      >
        {isEditing ? 'Save' : 'Edit'}
      </Button>
      <Button startIcon={<Delete />} onClick={handleClickDelete}>
        Delete
      </Button>
      <Typography
        variant="h3"
        textAlign={'center'}
        style={{ marginTop: '30px' }}
      >
        Billing address
      </Typography>
      <TextField
        value={billingStreet}
        onInput={handleChangeBillingStreet}
        fullWidth
        label="Street"
        disabled={!isEditingBilling}
        style={{ marginBottom: '16px' }}
        error={!(errors.street2 == null)}
        helperText={
          errors.street2 != null ? errors.street2.message?.toString() : ''
        }
        {...register('street2')}
      />
      <TextField
        value={billingCity}
        onInput={handleChangeBillingCity}
        fullWidth
        label="City"
        disabled={!isEditingBilling}
        style={{ marginBottom: '16px' }}
        error={!(errors.city2 == null)}
        helperText={
          errors.city2 != null ? errors.city2.message?.toString() : ''
        }
        {...register('city2')}
      />
      <TextField
        value={billingCode}
        onInput={handleChangeBillingCode}
        fullWidth
        label="Code"
        disabled={!isEditingBilling}
        style={{ marginBottom: '16px' }}
        error={!(errors.post2 == null)}
        helperText={
          errors.post2 != null ? errors.post2.message?.toString() : ''
        }
        {...register('post2')}
      />
      <FormControl fullWidth variant="filled">
        <InputLabel>Country</InputLabel>
        <Select
          label="Country"
          value={billingCountry}
          onChange={handleChangeBillingCountry}
          disabled={!isEditingBilling}
        >
          <MenuItem value={'US'}>USA</MenuItem>
          <MenuItem value={'FR'}>France</MenuItem>
        </Select>
      </FormControl>
      <Typography
        variant="inherit"
        sx={{ marginTop: { sm: '13px' }, textAlign: { sm: 'end' } }}
      >
        <Checkbox
          size="small"
          sx={{
            top: '-1px',
          }}
          disabled={!isEditingBilling}
          checked={isDefaultBilling}
          onChange={(event) => {
            if (event.target.checked) setIsDefaultBilling(true);
            else setIsDefaultBilling(false);
          }}
        />
        Set as default
      </Typography>
      <Button
        startIcon={isEditingBilling ? <Save /> : <Edit />}
        onClick={toggleHandleEditSaveBilling}
        disabled={
          errors.street2 != null || errors.city2 != null || errors.post2 != null
        }
      >
        {isEditingBilling ? 'Save' : 'Edit'}
      </Button>
      <Button startIcon={<Delete />} onClick={handleDeleteClickBilling}>
        Delete
      </Button>
      <CustomDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        title={dialogTitle}
        content={dialogContent}
      />
    </div>
  );
}
export default Addresses;
