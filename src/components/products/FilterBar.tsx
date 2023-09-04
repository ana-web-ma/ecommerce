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
} from '../../store/reducers/ProductsSlice';
import { useAppDispatch } from '../../helpers/hooks/Hooks';

interface SelectedPrice {
  from: number;
  to: number;
}

function valuetext(value: number): string {
  return `${value}°C`;
}

export default function FilterBar(props: {
  selectedPrice: SelectedPrice;
  setSelectedPrice: React.Dispatch<React.SetStateAction<SelectedPrice>>;
  selectedAttribute: 'none' | 'floral' | 'woody' | 'citrus' | 'amber';
  setSelectedAttribute: React.Dispatch<
    React.SetStateAction<'none' | 'floral' | 'woody' | 'citrus' | 'amber'>
  >;
  selectedSummerCollection: boolean;
  setSelectedSummerCollection: React.Dispatch<React.SetStateAction<boolean>>;
  selectedWeddingCollection: boolean;
  setSelectedWeddingCollection: React.Dispatch<React.SetStateAction<boolean>>;
  updateCatalog: () => void;
}): React.ReactElement {
  const dispatch = useAppDispatch();
  const [priceValue, setPriceValue] = React.useState<number[]>([0, 2500]);
  const [attributeValue, setAttributeValue] = React.useState('none');
  const [summerCollectionChecked, setSummerCollectionChecked] =
    React.useState(false);
  const [weddingCollectionChecked, setWeddingCollectionChecked] =
    React.useState(false);

  const handlePriceChange = (
    event: Event,
    newPriceValue: number | number[],
  ): void => {
    setPriceValue(newPriceValue as number[]);
    props.setSelectedPrice({ from: priceValue[0], to: priceValue[1] });
  };

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setAttributeValue(event.target.value);
    props.setSelectedAttribute(
      event.target.value as 'floral' | 'woody' | 'citrus' | 'amber',
    );
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    switch (event.target.value) {
      case 'summer':
        props.setSelectedSummerCollection(!summerCollectionChecked);
        setSummerCollectionChecked(!summerCollectionChecked);
        break;
      case 'wedding':
        props.setSelectedWeddingCollection(!weddingCollectionChecked);
        setWeddingCollectionChecked(!weddingCollectionChecked);
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
          defaultValue="none"
          name="Olfactory family"
          value={attributeValue}
          onChange={handleRadioChange}
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
        </Stack>
      </Box>
      <Button variant="contained" onClick={props.updateCatalog}>
        Apply
      </Button>
    </Stack>
  );
}
