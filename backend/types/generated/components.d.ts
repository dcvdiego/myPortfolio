import type { Schema, Struct } from '@strapi/strapi';

export interface DataCertifications extends Struct.ComponentSchema {
  collectionName: 'components_data_certifications';
  info: {
    description: '';
    displayName: 'Certification';
    icon: 'award';
  };
  attributes: {
    awardingBody: Schema.Attribute.String & Schema.Attribute.Required;
    date: Schema.Attribute.Date;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    shape: Schema.Attribute.Enumeration<['Hexagon', 'Circle', 'Plane']> &
      Schema.Attribute.Required;
    threedid: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['Consulting', 'Technical']> &
      Schema.Attribute.Required;
  };
}

export interface DataCred extends Struct.ComponentSchema {
  collectionName: 'components_data_creds';
  info: {
    displayName: 'Cred';
    icon: 'code';
  };
  attributes: {
    contribution: Schema.Attribute.Text;
    link: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface DataProject extends Struct.ComponentSchema {
  collectionName: 'components_data_projects';
  info: {
    description: '';
    displayName: 'Project';
    icon: 'campground';
  };
  attributes: {
    clientName: Schema.Attribute.String;
    clientSize: Schema.Attribute.Integer;
    description: Schema.Attribute.Text;
    endDate: Schema.Attribute.Date;
    infrastructure: Schema.Attribute.JSON;
    link: Schema.Attribute.String;
    name: Schema.Attribute.String;
    preview: Schema.Attribute.Media<'images' | 'videos'>;
    projectSize: Schema.Attribute.Integer;
    repo: Schema.Attribute.String;
    slug: Schema.Attribute.String;
    startDate: Schema.Attribute.Date;
  };
}

export interface DataTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_testimonial_testimonials';
  info: {
    description: '';
    displayName: 'Testimonial';
    icon: 'check';
  };
  attributes: {
    Content: Schema.Attribute.Text;
    From: Schema.Attribute.String;
    Project: Schema.Attribute.String;
    Title: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'data.certifications': DataCertifications;
      'data.cred': DataCred;
      'data.project': DataProject;
      'data.testimonial': DataTestimonial;
    }
  }
}
