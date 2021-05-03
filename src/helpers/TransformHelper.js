import moment from 'moment';

export const groupByDays = messages => {
  return messages.reduce((acc, item) => {
    const messageDay = moment(item.createdOn).format('YYYY-MM-DD');
    if (acc[messageDay]) {
      return { ...acc, [messageDay]: acc[messageDay].concat([item]) };
    }
    return { ...acc, [messageDay]: [item] };
  }, {});
};

export const generateMessages = messages => {
  const days = groupByDays(messages);
  const sortedDays = Object.keys(days).sort(
    (x, y) => moment(y, 'YYYY-MM-DD').unix() - moment(x, 'YYYY-MM-DD').unix()
  );
  const items = sortedDays.reduce((acc, date) => {
    const sortedMessages = days[date].sort(
      (x, y) => new Date(y.createdOn) - new Date(x.createdOn)
    );
    return acc.concat([...sortedMessages, { type: 'day', date, id: date }]);
  }, []);
  return items;
};

export const groupBySpeciality = doctors => {
  return doctors.reduce((acc, item) => {
    const speciality = item.speciality;
    if (acc[speciality]) {
      return { ...acc, [speciality]: acc[speciality].concat([item]) };
    }
    return { ...acc, [speciality]: [item] };
  }, {});
};

export const getRiskPoint = (questionnaire, answer) => {
  const options = questionnaire.options.split(',').map(item => item.trim());
  const optionPoints = questionnaire.optionsPoints
    .split(',')
    .map(item => item.trim());
  const optionIndex = options.findIndex(item => item === answer);
  return optionPoints[optionIndex] ?? 0;
};

export const isPickerOption = options => {
  return options.split(',').map(item => item.trim()).length > 2;
};

export const getOptions = options => {
  const items = [];
  options.split(',').map(item =>
    items.push({
      label: item.trim(),
      value: item.trim(),
    })
  );
  return items;
};

export const getFileName = uri => uri.substring(uri.lastIndexOf('/') + 1);
