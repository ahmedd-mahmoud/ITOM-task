import type { AlertResponse } from "~/types/api";
import { useMessage } from "naive-ui";
import usePocketBase from "~/composables/server/usePocketbase";
import { AlertStatusOptions, AlertSeverityOptions } from "~/types/enums";

export default function () {
  const client = usePocketBase();
  const message = useMessage();

  const alerts = useState<AlertResponse[]>("alerts", () => []);

  // Create a new device
  const createAlert = async (data: Object) => {
    try {
      const res = await client.collection("alerts").create(data);

      message.success("Alert created successfully");
      return res;
    } catch (error) {
      message.error("Failed to create alert");
    }
  };

  // Fetch all alerts
  const fetchAlerts = async () => {
    try {
      const res = await client
        .collection("alerts")
        .getFullList<AlertResponse>(50, {
          expand: "device",
          sort: "-created",
        });
      alerts.value = res;
    } catch (error) {
      console.error("Failed to get alerts");
    }
  };

  // Update a device
  const updateAlert = async (alertId: string, data: Object) => {
    try {
      const res = await client
        .collection("alerts")
        .update<AlertResponse>(alertId, data);

      message.success("Alert updated successfully");
      return res;
    } catch (error) {
      message.error("Failed to update alert");
    }
  };

  // listen to changes in alerts
  const subscribeAlert = async () => {
    try {
      await client.collection("alerts").subscribe("*", ({ record }) => {
        const index = alerts.value.findIndex((d) => d.id === record.id);
        if (index !== -1) {
          alerts.value[index] = record as AlertResponse;
        }
      });
    } catch (error) {
      message.error("Failed to subscribe to alerts");
    }
  };

  const unsubscribeAlert = async () => {
    try {
      await client.collection("alerts").unsubscribe("*");
    } catch (error) {
      message.error("Failed to unsubscribe to alerts");
    }
  };

  return {
    alerts,
    createAlert,
    fetchAlerts,
    updateAlert,
    subscribeAlert,
    unsubscribeAlert,
  };
}
