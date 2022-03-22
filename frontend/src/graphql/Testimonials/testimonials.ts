import { gql } from '@apollo/client';

const TESTIMONIALS_QUERY = gql`
  query AllTestimonials {
    dataComponents {
      data {
        attributes {
          Testimonial {
            From
            Title
            Project
            Content
          }
        }
      }
    }
  }
`;

export default TESTIMONIALS_QUERY;
