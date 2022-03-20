'use strict';

/**
 * data-component service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::data-component.data-component');
