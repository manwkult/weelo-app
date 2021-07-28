import { Owner } from "./Owner";
import { PropertyImage } from "./PropertyImage";
import { PropertyTrace } from "./PropertyTrace";

export class Property {
  id: number;
  name: string;
  address: string;
  price: number;
  internalCode: string;
  year: number;
  ownerId: number;
  owner: Owner
  propertyImages: PropertyImage[];
  propertyTraces: PropertyTrace[];
}