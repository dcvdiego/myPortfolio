'use strict';

/**
 * data-component router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::data-component.data-component');
