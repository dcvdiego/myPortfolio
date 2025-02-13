import type { Schema, Attribute } from '@strapi/strapi';

export interface DataCertifications extends Schema.Component {
  collectionName: 'components_data_certifications';
  info: {
    displayName: 'Certification';
    icon: 'award';
    description: '';
  };
  attributes: {
    threedid: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    awardingBody: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    date: Attribute.Date;
    shape: Attribute.Enumeration<['Hexagon', 'Circle', 'Plane']> &
      Attribute.Required;
    type: Attribute.Enumeration<['Consulting', 'Technical']> &
      Attribute.Required;
  };
}

export interface DataCred extends Schema.Component {
  collectionName: 'components_data_creds';
  info: {
    displayName: 'Cred';
    icon: 'code';
  };
  attributes: {
    name: Attribute.String;
    contribution: Attribute.Text;
    link: Attribute.String;
  };
}

export interface DataProject extends Schema.Component {
  collectionName: 'components_data_projects';
  info: {
    displayName: 'Project';
    icon: 'campground';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    slug: Attribute.String;
    infrastructure: Attribute.JSON;
    clientSize: Attribute.Integer;
    projectSize: Attribute.Integer;
    startDate: Attribute.Date;
    endDate: Attribute.Date;
    link: Attribute.String;
    repo: Attribute.String;
    clientName: Attribute.String;
    description: Attribute.Text;
    preview: Attribute.Media;
  };
}

export interface DataTestimonial extends Schema.Component {
  collectionName: 'components_testimonial_testimonials';
  info: {
    displayName: 'Testimonial';
    icon: 'check';
    description: '';
  };
  attributes: {
    From: Attribute.String;
    Title: Attribute.Text;
    Project: Attribute.String;
    Content: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'data.certifications': DataCertifications;
      'data.cred': DataCred;
      'data.project': DataProject;
      'data.testimonial': DataTestimonial;
    }
  }
}
