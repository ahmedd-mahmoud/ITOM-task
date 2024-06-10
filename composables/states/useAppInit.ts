export const useAppInit = () => {
  const { fetchDevices } = useDevices();
  const { fetchAlerts } = useAlerts();
  const { fetchTickets } = useTickets();

  const initApp = async () => {
    await fetchDevices();
    await fetchAlerts();
    await fetchTickets();
  };

  return initApp;
};
