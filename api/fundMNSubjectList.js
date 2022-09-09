const fundMNSubjectList = require('../src/module/fundMNSubjectList.js');

module.exports = async function handler(request, response) {
  const data = await fundMNSubjectList(request.query);
  response.status(200).json(data);
};
