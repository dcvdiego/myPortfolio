import { gql } from '@apollo/client';

const TESTIMONIAL_WORD_QUERY = gql`
  query TestimonialWord($word: String) {
    dataComponents {
      Testimonial(filters: { Content: { containsi: $word } }) {
        From
        Title
        Project
        Content
      }
    }
  }
`;

export default TESTIMONIAL_WORD_QUERY;
