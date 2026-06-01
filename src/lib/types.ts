export interface NotificationSettings {
  vetVisit: boolean;
  vaccination: boolean;
  medication: boolean;
  grooming: boolean;
  event: boolean;
  channels: {
    email: boolean;
    telegram: boolean;
  };
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  telegramUsername: string;
  telegramConnected: boolean;
  avatarUrl: string;
  notifications: NotificationSettings;
}

export type PetType = 'cat' | 'dog' | 'bird' | 'rabbit' | 'other';
export type PetGender = 'male' | 'female';

export interface WeightEntry {
  date: string;
  value: number;
}

export interface Pet {
  id: number;
  name: string;
  type: PetType;
  breed: string;
  gender: PetGender;
  birthDate: string;
  color: string;
  chipNumber: string;
  avatarUrl: string;
  weight: number;
  weightHistory: WeightEntry[];
  notes: string;
}

export type EventType = 'vet' | 'vaccination' | 'medication' | 'grooming' | 'purchase' | 'note';
export type EventStatus = 'planned' | 'done';

export interface EventPhoto {
  id: number;
  url: string;
}

export interface BaseEvent {
  id: number;
  petId: number;
  petName: string;
  type: EventType;
  status: EventStatus;
  date: string;
  cost?: number;
  notes: string;
  photos: EventPhoto[];
}

export interface VetEvent extends BaseEvent {
  type: 'vet';
  clinic: string;
  doctor: string;
  diagnosis: string;
  nextVisitDate?: string;
}

export interface VaccinationEvent extends BaseEvent {
  type: 'vaccination';
  vaccineName: string;
  nextDate?: string;
}

export interface MedicationEvent extends BaseEvent {
  type: 'medication';
  medicationName: string;
  quantity: number;
  remaining: number;
  periodDays: number;
}

export interface GroomingEvent extends BaseEvent {
  type: 'grooming';
  salon: string;
}

export interface PurchaseEvent extends BaseEvent {
  type: 'purchase';
  category: 'food' | 'toy' | 'accessory' | 'other';
  itemName: string;
}

export interface NoteEvent extends BaseEvent {
  type: 'note';
}

export type PetEvent =
  | VetEvent
  | VaccinationEvent
  | MedicationEvent
  | GroomingEvent
  | PurchaseEvent
  | NoteEvent;
