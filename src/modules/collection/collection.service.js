const CRUD = require("../crud.factory");
const CollectionModel = require("./collection.model");

class CollectionService extends CRUD {
  async getAllByUser(poster, { limit, page }) {
    console.log("nack", poster);
    return this._paginatedQuery({ limit, page }, { poster });
  }

  async getAll({ limit, page, sort, search, nftType }, options = {}) {
    const queryObj = { $text: { $search: search } };

    if ((search && search.trim() == "null") || search.trim().length === 0)
      delete queryObj.$text;

    if (nftType && nftType?.trim() != "null" && nftType?.trim().length !== 0)
      queryObj.nftType = nftType?.trim();
    // queryObj.datePosted = datePosted
    // queryObj.location = location
    let _sort = { createdAt: -1 };
    if (
      sort &&
      sort.trim() != "null" &&
      sort.trim().length !== 0 &&
      sort.trim() == "oldest"
    ) {
      _sort = { createdAt: 1 };
    }
    return this._paginatedQuery({ limit, page, sort: _sort }, queryObj);
  }

  async getMeta() {
    const result = await this._model.aggregate([
      {
        $group: {
          _id: "$nftType",
          count: { $sum: 1 },
        },
      },
    ]);
    return result;
  }
}

module.exports = new CollectionService(CollectionModel, "Job");
