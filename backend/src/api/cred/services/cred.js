'use strict';

/**
 * cred service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cred.cred');
