const titleVal = title => title && title.length > 10;
const textVal = text => text && text.length > 20;

const statVal = status => status && ['published', 'in progress', 'all done'].includes(status);

const photoVal = photo => photo ? photo.size && photo.mimetype.includes('image') : true;

const emailVal = email => {
  const emailPatt = new RegExp(/^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z]{1,6}))$/i);
  return emailPatt.test(email);
};

module.exports = {
  titleVal, textVal, statVal, photoVal, emailVal,
};
