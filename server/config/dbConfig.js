const { connect } = require('mongoose');

const DBConfig = () => {
  try {
    connect(process.env.BASEURI);
  } catch (error) {
    console.log('databse not connected');
  }
};

module.exports = DBConfig;
