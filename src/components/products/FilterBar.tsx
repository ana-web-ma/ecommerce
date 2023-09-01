import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

interface SelectedPrice {
  price: {
    from: number;
    to: number;
  };
}

function valuetext(value: number): string {
  return `${value}°C`;
}

export default function FilterBar(props: {
  selectedPrice: SelectedPrice;
  setSelectedPrice: React.Dispatch<React.SetStateAction<SelectedPrice>>;
  selectedFloralAttr: boolean;
  setSelectedFloralAttr: React.Dispatch<React.SetStateAction<boolean>>;
  selectedWoodyAttr: boolean;
  setSelectedWoodyAttr: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCitrusAttr: boolean;
  setSelectedCitrusAttr: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAmberAttr: boolean;
  setSelectedAmberAttr: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSummerCollection: boolean;
  setSelectedSummerCollection: React.Dispatch<React.SetStateAction<boolean>>;
  selectedWeddingCollection: boolean;
  setSelectedWeddingCollection: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement {
  const [priceValue, setPriceValue] = React.useState<number[]>([0, 2500]);
  const [floralAttrChecked, setFloralAttrChecked] = React.useState(false);
  const [woodyAttrChecked, setWoodyAttrChecked] = React.useState(false);
  const [citrusAttrChecked, setCitrusAttrChecked] = React.useState(false);
  const [amberAttrChecked, setAmberAttrChecked] = React.useState(false);
  const [summerCollectionChecked, setSummerCollectionChecked] =
    React.useState(false);
  const [weddingCollectionChecked, setWeddingCollectionChecked] =
    React.useState(false);

  const handlePriceChange = (
    event: Event,
    newPriceValue: number | number[],
  ): void => {
    setPriceValue(newPriceValue as number[]);
    props.setSelectedPrice({
      price: { from: priceValue[0], to: priceValue[1] },
    });
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    switch (event.target.value) {
      case 'floral':
        props.setSelectedFloralAttr(!floralAttrChecked);
        setFloralAttrChecked(!floralAttrChecked);
        break;
      case 'woody':
        props.setSelectedWoodyAttr(!woodyAttrChecked);
        setWoodyAttrChecked(!woodyAttrChecked);
        break;
      case 'citrus':
        props.setSelectedCitrusAttr(!citrusAttrChecked);
        setCitrusAttrChecked(!citrusAttrChecked);
        break;
      case 'amber':
        props.setSelectedAmberAttr(!amberAttrChecked);
        setAmberAttrChecked(!amberAttrChecked);
        break;
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
    // console.log({
    //   selectedFloralAttr: props.selectedFloralAttr,
    //   selectedWoodyAttr: props.selectedWoodyAttr,
    //   selectedCitrusAttr: props.selectedCitrusAttr,
    //   selectedAmberAttr: props.selectedAmberAttr,
    //   selectedSummerCollection: props.selectedSummerCollection,
    //   selectedWeddingCollection: props.selectedWeddingCollection,
    // });
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
        <Stack gridRow={0}>
          <FormControlLabel
            value="floral"
            control={
              <Checkbox
                checked={floralAttrChecked}
                onChange={handleCheckboxChange}
                inputProps={{ 'aria-label': 'olfactory checkbox' }}
              />
            }
            label="Floral"
          />
          <FormControlLabel
            value="woody"
            control={
              <Checkbox
                checked={woodyAttrChecked}
                onChange={handleCheckboxChange}
                inputProps={{ 'aria-label': 'olfactory checkbox' }}
              />
            }
            label="Woody"
          />
          <FormControlLabel
            value="citrus"
            control={
              <Checkbox
                checked={citrusAttrChecked}
                onChange={handleCheckboxChange}
                inputProps={{ 'aria-label': 'olfactory checkbox' }}
              />
            }
            label="Citrus"
          />
          <FormControlLabel
            value="amber"
            control={
              <Checkbox
                checked={amberAttrChecked}
                onChange={handleCheckboxChange}
                inputProps={{ 'aria-label': 'olfactory checkbox' }}
              />
            }
            label="Amber"
          />
        </Stack>
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
      <Button variant="contained">Apply</Button>
    </Stack>
  );
}
