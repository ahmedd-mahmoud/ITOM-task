import type { DeviceResponse } from "~/types/api";
import { useMessage } from "naive-ui";
import usePocketBase from "~/composables/server/usePocketbase";
import { DeviceAvailabilityOptions } from "~/types/enums";

export default function () {
  const client = usePocketBase();
  const message = useMessage();

  const devices = useState<DeviceResponse[]>("devices", () => []);

  // Create a new device
  const createDevice = async (name: string, maintenanceTime: string = "") => {
    try {
      await client.collection("devices").create({
        name,
        maintenanceTime,
        availability: DeviceAvailabilityOptions.ONLINE,
      });

      message.success("Device created successfully");
    } catch (error) {
      message.error("Failed to create device");
    }
  };

  // Fetch all devices
  const fetchDevices = async () => {
    try {
      const res = await client
        .collection("devices")
        .getFullList<DeviceResponse>(50, {
          expand: "alerts_via_device",
        });
      devices.value = res;
    } catch (error) {
      console.error("Failed to get devices");
    }
  };

  // Update a device
  const updateDevice = async (deviceId: string, data: Object) => {
    try {
      await client.collection("devices").update<DeviceResponse>(deviceId, data);

      message.success("Device updated successfully");
    } catch (error) {
      message.error("Failed to update device");
    }
  };

  // listen to changes in devices
  const subscribeDevice = async () => {
    try {
      await client.collection("devices").subscribe("*", ({ record }) => {
        const index = devices.value.findIndex((d) => d.id === record.id);
        if (index !== -1) {
          devices.value[index] = record as DeviceResponse;
        }
      });
    } catch (error) {
      message.error("Failed to subscribe to devices");
    }
  };

  const unsubscribeDevice = async () => {
    try {
      await client.collection("devices").unsubscribe("*");
    } catch (error) {
      message.error("Failed to unsubscribe to devices");
    }
  };

  return {
    devices,
    createDevice,
    fetchDevices,
    updateDevice,
    subscribeDevice,
    unsubscribeDevice,
  };
}
