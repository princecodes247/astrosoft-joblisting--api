const CRUD = require("../crud.factory");
const HistoryModel = require("./history.model");

class HistoryService extends CRUD {
  async getHistory(userId, page = 1, limit = 10) {
    const result = await this._paginatedQuery(
      { limit, page },
      { user: userId }
    );

    return result;
  }
  async getRecentHistorys(userId, page = 1, limit = 10) {}
}

module.exports = new HistoryService(HistoryModel, "History");
