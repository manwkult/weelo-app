import { Property } from "../models/Property";
import { PropertyImage } from "../models/PropertyImage";
import { PropertyTrace } from "../models/PropertyTrace";

export const property = {
  id: 0,
  name: '',
  address: '',
  price: 0,
  internalCode: 'INT',
  year: 2021,
  ownerId: 0,
  propertyImages: [] as PropertyImage[],
  propertyTraces: [] as PropertyTrace[]
} as Property;

export const owner = {
  id: 0,
  name: '',
  address: '',
  photo: '',
  birthday: ''
};