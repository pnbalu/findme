import { useEffect, useState } from 'react';
import api from '../helpers/AxiosHelper';

export default () => {
  const [doctors, setDoctors] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchDoctors = async () => {
    try {
      setFetching(true);
      const response = await api.get('/external/my-doctors');
      setDoctors(response.data);
      setFetching(false);
    } catch (error) {
      setErrorMessage('Error fetching doctors. Try after sometime.');
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return [doctors, fetching, errorMessage];
};
