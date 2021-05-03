import { useEffect, useState } from 'react';
import api from '../helpers/AxiosHelper';

export default () => {
  const [recommendations, setRecommendations] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchRecommendations = async () => {
    try {
      setFetching(true);
      const response = await api.get('/external/my-recommendations');
      setRecommendations(response.data);
      setFetching(false);
    } catch (error) {
      setErrorMessage('Error fetching recommendations. Try after sometime.');
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return [recommendations, fetching, errorMessage];
};
