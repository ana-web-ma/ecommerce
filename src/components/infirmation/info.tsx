import { Stack, Tab, Tabs } from '@mui/material';
import { type ReactElement, useState } from 'react';

function Info(): ReactElement {
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number,
  ): void => {
    setTabValue(newValue);
  };
  return (
    <Stack mt={3} justifyContent="center" alignItems="center">
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Anastasia" />
        <Tab label="Vitaly" />
        <Tab label="Igor" />
      </Tabs>
      {tabValue === 0 && <div>Настя</div>}
      {tabValue === 1 && <div>Виталик</div>}
      {tabValue === 2 && <div>Игорь</div>}
    </Stack>
  );
}
export default Info;
