const validateFields = {
  checkIfEmpty: async (value, field) => {
    if (!value || value.trim().length === 0) {
      throw new Error(`${field} field is empty`);
    }
  },

  checkIfString: async (value, field) => {
    const stringFormat = /^[A-Za-z ]+$/;
    if (!String(value).match(stringFormat)) {
      throw new Error(`invalid ${field} format`);
    }
  },

  checkIfNumber: async (value, field) => {
    const stringFormat = /^[0-9]*$/;
    if (!String(value).match(stringFormat)) {
      throw new Error(`invalid ${field} format`);
    }
  },

  checkEmailFormat: async (email) => {
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!String(email).match(emailformat)) {
      throw new Error('invalid email format');
    }
  },
};

module.exports = {
  validateFields,
};
