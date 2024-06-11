import {
  DeviceAvailabilityOptions,
  AlertSeverityOptions,
  AlertStatusOptions,
  TicketPriorityOptions,
  TicketActivityStatusOptions,
  TicketStatusOptions,
  DeviceTypeOptions,
} from "./enums";

export enum Collections {
  USERS = "users",
  DEVICES = "devices",
  ALERTS = "alerts",
  TICKETS = "tickets",
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;

// System fields
export type BaseSystemFields<E> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections | string;
  expand?: E;
};

export type AuthSystemFields = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields;

// Record types for each collection
export type UserRecord = {
  name?: string;
  avatar?: string;
};

export type DeviceRecord = {
  name: RecordIdString;
  availability: DeviceAvailabilityOptions;
  maintenanceTime: string;
  type: DeviceTypeOptions;
};

export type AlertRecord = {
  device: RecordIdString;
  details: string;
  severity: AlertSeverityOptions;
  status: AlertStatusOptions;
};

export type TicketRecord = {
  title: string;
  priority: TicketPriorityOptions;
  activityStatus: TicketActivityStatusOptions;
  status: TicketStatusOptions;
  assignedTechnician: string;
  dueDate: IsoDateString;
};

export type DeviceExpand = {
  alerts_via_device: AlertResponse[];
};

export type AlertExpand = {
  device: DeviceResponse;
};

// Response types include system fields and match responses from the PocketBase API
export type DeviceResponse = DeviceRecord & BaseSystemFields<DeviceExpand>;

export type AlertResponse = AlertRecord & BaseSystemFields<AlertExpand>;

export type TicketResponse<E = DefaultExpand> = TicketRecord &
  BaseSystemFields<E>;

export type UsersResponse<E = DefaultExpand> = UserRecord & AuthSystemFields<E>;

export type CollectionRecords = {
  users: UserRecord;
  devices: DeviceRecord;
  alerts: AlertRecord;
  tickets: TicketRecord;
};
