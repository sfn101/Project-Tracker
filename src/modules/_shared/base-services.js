async function fetchAll(model, { query, filter = {} }) {
  const { page, limit } = query;
  const resources = await model
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  const total = await model.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  return {
    data: resources,
    pagination: {
      total,
      totalPages,
      page,
      limit,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
}

async function fetchById(model, { id }) {
  const resource = await model.findById(id);

  if (!resource) {
    throw new Error("Resource not found");
  }

  return resource;
}

async function deleteById(model, { id }) {
  const resource = await model.findByIdAndDelete(id);

  if (!resource) {
    throw new Error("Resource not found");
  }

  return resource;
}

async function updateById(model, { id, payload }) {
  const updatedResource = await model.findByIdAndUpdate(
    id,
    payload,
    { new: true }
  );

  if (!updatedResource) {
    throw new Error("Resource not found");
  }

  return updatedResource;
}

async function createOne(model, { payload }) {
  const resource = await model.create(payload);

  return resource;
}

function wrapWithModel(model, fn) {
  return (...args) => {
    return fn(model, ...args);
  };
}

export default function baseServicesFactory(model) {
  return {
    fetchAll: wrapWithModel(model, fetchAll),
    fetchById: wrapWithModel(model, fetchById),
    deleteById: wrapWithModel(model, deleteById),
    updateById: wrapWithModel(model, updateById),
    createOne: wrapWithModel(model, createOne),
  };
}
