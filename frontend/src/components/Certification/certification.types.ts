export type shapeName = 'Circle' | 'Plane' | 'Hexagon';
export type TypeName = 'Consulting' | 'Technical';
export interface ICertificationObject {
  threedid: string;
  name: string;
  awardingBody: string;
  description: string;
  date: string;
  type: TypeName;
  shape: shapeName;
}
