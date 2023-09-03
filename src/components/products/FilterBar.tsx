import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  categoryChecked,
  attributeKey,
  setOpenFilterBar,
  setPriceValue,
} from '../../store/reducers/ProductsSlice';
import {
  useAppDispatch,
  useAttributeKey,
  usePriceValue,
} from '../../helpers/hooks/Hooks';

interface SelectedPrice {
  from: number;
  to: number;
}

function valuetext(value: number): string {
  return `${value}`;
}

export default function FilterBar(): React.ReactElement {
  const dispatch = useAppDispatch();
  const priceValue = usePriceValue();
  const attributeValue = useAttributeKey();
  const [summerCollectionChecked, setSummerCollectionChecked] =
    React.useState(false);
  const [weddingCollectionChecked, setWeddingCollectionChecked] =
    React.useState(false);
  const [newCollectionChecked, setNewCollectionChecked] = React.useState(false);

  const handlePriceChange = (
    event: Event,
    newPriceValue: number | number[],
  ): void => {
    dispatch(setPriceValue(newPriceValue as number[]));
  };

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    dispatch(
      attributeKey(
        event.target.value as 'floral' | 'woody' | 'citrus' | 'amber' | 'none',
      ),
    );
  };

  const saveFilterProps = (): void => {
    dispatch(attributeKey(attributeValue));
    dispatch(setPriceValue(priceValue));
    const TempArray: string[] = [];
    if (summerCollectionChecked)
      TempArray.push('8c4a5815-b067-4f86-b565-9409d38672d3');
    if (weddingCollectionChecked)
      TempArray.push('93fee5ed-79af-4985-a5b5-5fc0a6e141aa');
    if (newCollectionChecked)
      TempArray.push('ce1f8f50-574d-4dd4-b912-7608b2017328');
    dispatch(categoryChecked(TempArray));
    dispatch(setOpenFilterBar(false));
  };

  const resetFilterProps = (): void => {
    dispatch(attributeKey('none'));
    dispatch(setPriceValue([0, 2500]));
    setSummerCollectionChecked(false);
    setNewCollectionChecked(false);
    setWeddingCollectionChecked(false);
    dispatch(categoryChecked([]));
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    switch (event.target.value) {
      case 'summer':
        setSummerCollectionChecked(!summerCollectionChecked);
        break;
      case 'wedding':
        setWeddingCollectionChecked(!weddingCollectionChecked);
        break;
      case 'new':
        setNewCollectionChecked(!newCollectionChecked);
        break;
      default:
        break;
    }
  };

  return (
    <Stack rowGap={2} p={3}>
      <Box>
        <Typography variant="h3">Price</Typography>
        <Box sx={{ width: 200 }}>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={priceValue}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            size="small"
            min={0}
            max={2500}
          />
        </Box>{' '}
      </Box>
      <Box>
        <Typography pt={1} variant="h3">
          Olfactory family
        </Typography>
        <RadioGroup
          aria-labelledby="olfactory-family-radio-buttons-group-label"
          name="Olfactory family"
          value={attributeValue}
          onChange={handleRadioChange}
          defaultValue="none"
        >
          <FormControlLabel value="none" control={<Radio />} label="none" />
          <FormControlLabel value="floral" control={<Radio />} label="floral" />
          <FormControlLabel value="woody" control={<Radio />} label="woody" />
          <FormControlLabel value="citrus" control={<Radio />} label="citrus" />
          <FormControlLabel value="amber" control={<Radio />} label="amber" />
        </RadioGroup>
      </Box>
      <Box>
        <Typography pt={1} variant="h3">
          Collection
        </Typography>
        <Stack gridRow={0}>
          <FormControlLabel
            value="summer"
            control={
              <Checkbox
                checked={summerCollectionChecked}
                onChange={handleCheckboxChange}
                inputProps={{ 'aria-label': 'olfactory checkbox' }}
              />
            }
            label="Summer"
          />
          <FormControlLabel
            value="wedding"
            control={
              <Checkbox
                checked={weddingCollectionChecked}
                onChange={handleCheckboxChange}
                inputProps={{ 'aria-label': 'olfactory checkbox' }}
              />
            }
            label="Wedding"
          />
          <FormControlLabel
            value="new"
            control={
              <Checkbox
                checked={newCollectionChecked}
                onChange={handleCheckboxChange}
                inputProps={{ 'aria-label': 'olfactory checkbox' }}
              />
            }
            label="New"
          />
        </Stack>
      </Box>
      <Button variant="contained" onClick={saveFilterProps}>
        Apply
      </Button>
      <Button variant="outlined" onClick={resetFilterProps}>
        Reset filters
      </Button>
    </Stack>
  );
}
