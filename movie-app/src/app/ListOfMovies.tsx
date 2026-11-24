import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { Link } from 'expo-router';

const ListOfMovies = () => {

  const startingDataSource = [
    { "title": "Elf", "releaseYear": "2003" },
    { "title": "The Grinch", "releaseYear": "1966" },
    { "title": "Die Hard", "releaseYear": "1988" },
    { "title": "Home Alone", "releaseYear": "1990" },
    { "title": "A Christmas Story", "releaseYear": "1983" }
  ];

  const [movies, setMovies] = useState(startingDataSource);

  function getMoviesFromApi() {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setMovies(previousMovies => [...previousMovies, ...json.movies]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
          <Link
            href={{
              pathname: "/MovieDetails",
              params: {
                movie: JSON.stringify(item)
              }
            }}
            style={[styles.item, styles.border]}
          >
            {item.title}
          </Link>
        }
      />

      <Button title="Load More" onPress={() => getMoviesFromApi()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 54,
  },
  border: {
    borderWidth: 1,
    borderColor: "gray",
  }
});

export default ListOfMovies;