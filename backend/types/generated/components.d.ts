import type { Attribute, Schema } from '@strapi/strapi';

export interface DataCertifications extends Schema.Component {
  collectionName: 'components_data_certifications';
  info: {
    description: '';
    displayName: 'Certification';
    icon: 'award';
  };
  attributes: {
    awardingBody: Attribute.String & Attribute.Required;
    date: Attribute.Date;
    description: Attribute.Text & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    shape: Attribute.Enumeration<['Hexagon', 'Circle', 'Plane']> &
      Attribute.Required;
    threedid: Attribute.String & Attribute.Required;
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
    contribution: Attribute.Text;
    link: Attribute.String;
    name: Attribute.String;
  };
}

export interface DataProject extends Schema.Component {
  collectionName: 'components_data_projects';
  info: {
    description: '';
    displayName: 'Project';
    icon: 'campground';
  };
  attributes: {
    clientName: Attribute.String;
    clientSize: Attribute.Integer;
    description: Attribute.Text;
    endDate: Attribute.Date;
    infrastructure: Attribute.JSON;
    link: Attribute.String;
    name: Attribute.String;
    preview: Attribute.Media<'images' | 'videos'>;
    projectSize: Attribute.Integer;
    repo: Attribute.String;
    slug: Attribute.String;
    startDate: Attribute.Date;
  };
}

export interface DataTestimonial extends Schema.Component {
  collectionName: 'components_testimonial_testimonials';
  info: {
    description: '';
    displayName: 'Testimonial';
    icon: 'check';
  };
  attributes: {
    Content: Attribute.Text;
    From: Attribute.String;
    Project: Attribute.String;
    Title: Attribute.Text;
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
