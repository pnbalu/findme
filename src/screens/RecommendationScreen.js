import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import Container from '../components/Container';
import Empty from '../components/Empty';
import RecommendationItem from '../components/RecommendationItem';
import useRecommendations from '../hooks/useRecommendations';
import ListHeader from '../components/ListHeader';
import ScreenLoader from '../components/ScreenLoader';

const RecommendationScreen = () => {
  const [recommendations, fetching] = useRecommendations();

  if (fetching) {
    return <ScreenLoader />;
  }

  return (
    <Container>
      <SafeAreaView style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          {recommendations.length > 0 && (
            <ListHeader header={`${recommendations.length} Recommendations`} />
          )}
          <FlatList
            data={recommendations}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item, index }) => (
              <RecommendationItem recommendation={item} index={index} />
            )}
            ListEmptyComponent={
              <Empty message="No recommendations available now." />
            }
          />
        </View>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    margin: 10,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
});

export default RecommendationScreen;
