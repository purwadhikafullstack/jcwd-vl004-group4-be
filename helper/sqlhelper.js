
// function to create or update a row database
module.exports = {
  createOrUpdate: async function (newItem, where, model) {
    const foundItem = await model.findOne({ where });
    if (!foundItem) {
      // Item not found, create a new one
      const item = await model.create(newItem);
      return { item, created: true };
    }
    // Found an item, update it
    const item = await model.update(newItem, { where });
    return { item, created: false };
  },
};
