import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {useError} from '../../../context/ErrorProvider';
import {getDataOnYourMind} from '../../../store/home/homeSlice';

export const useGetCategorizedFoodtype = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(true);
  const [foodType, setFoodType] = useState();

  const getOnYourMindData = async () => {
    try {
      const res = await dispatch(getDataOnYourMind()).unwrap();
      if (res) {
        setFoodType(res);
        setLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getOnYourMindData();
    });
  }, [navigation]);

  return {
    foodType,
    loading,
  };
};
