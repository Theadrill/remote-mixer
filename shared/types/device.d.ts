import { ApiChangeMessage, ApiMetersMessage } from './api'

export type DeviceChangeMessage = ApiChangeMessage
export type DeviceMetersMessage = ApiMetersMessage
export type DeviceMessage = DeviceChangeMessage | DeviceMetersMessage

export type DeviceMessageListener = (message: DeviceMessage) => void

export interface DeviceConfigurationCategory {
  key: string
  label: string
  count: number
  namePrefix?: string
  meters?: boolean
  faderProperties?: string[]
}

export interface DeviceConfiguration {
  categories: DeviceConfigurationCategory[]
}

export interface DeviceController {
  deviceConfig: DeviceConfiguration
  change(category: string, id: string, property: string, value: any): void
}

export interface DeviceControllerConstructor {
  new (listener: DeviceMessageListener, options?: any): DeviceController
}
