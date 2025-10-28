import model from "#@/modules/user/model/index.js";

import baseServicesFactory from "#@/modules/_shared/base-services.js";

export default {
  ...baseServicesFactory(model),
};
